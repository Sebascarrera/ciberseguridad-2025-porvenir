// src/Games/firewall/pages/PlayRadial.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FirewallPlayRadial.css";

import bg from "../../../assets/img/bg-firewall-play-game.png";
import a1 from "../../../assets/img/amenaza1.png";
import a2 from "../../../assets/img/amenaza2.png";
import a3 from "../../../assets/img/amenaza3.png";
import a4 from "../../../assets/img/amenaza4.png";
import a5 from "../../../assets/img/amenaza5.png";
import a6 from "../../../assets/img/amenaza6.png";
import serverImg from "../../../assets/img/servidor.png";
import shieldImg from "../../../assets/img/cipo-escudo.png";

const SPRITES = [a1, a2, a3, a4, a5, a6];

// Parámetros del juego
const GAME_SECONDS = 60;
const MAX_LIVES = 3;
const POINTS_PER_BLOCK = 10;
const SERVER_RADIUS = 44; // px (si llega aquí, pierdes vida)
const MAX_ON_STAGE = 70;  // tope opcional de amenazas en pantalla

// Curva de dificultad
const DIFF = {
  minSpeed: 120,
  maxSpeed: 340,
  speedPow: 1.25,
  startSpawnMs: 950,
  endSpawnMs: 260,
  spawnPow: 1.15,
  extraSpawn1: 0.33, // ~20s
  extraSpawn2: 0.66, // ~40s
  shieldStart: 80,
  shieldEnd: 60,
};

// Oleadas (cada ciertos segundos)
const WAVES = {
  periodSec: 9,      // cada 9s inicia una oleada
  durationSec: 3,    // dura 3s
  burstMin: 5,       // ráfaga al inicio (escala con progreso)
  burstMax: 11,
  bonusPerTick: 2,   // spawns adicionales por tick mientras dure
};

export default function PlayRadial() {
  const navigate = useNavigate();

  // HUD
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [ended, setEnded] = useState(false);

  // Audio
  const [muted, setMuted] = useState(false);
  const [audioArmed, setAudioArmed] = useState(false);
  const sfx = useRef({
    place: null, block: null, hit: null, win: null, lose: null, tick: null,
  });

  // Stage y centro
  const stageRef = useRef(null);
  const [stageSize, setStageSize] = useState({ w: 900, h: 520 });
  const center = useMemo(
    () => ({ x: stageSize.w / 2, y: stageSize.h / 2 }),
    [stageSize]
  );

  // Amenazas
  const [threats, setThreats] = useState([]); // {id,x,y,vx,vy,speed,sprite}
  const nextId = useRef(1);

  // ---- CONTROL DEL ESCUDO (sigue al puntero con suavizado) ----
  const [shieldPos, setShieldPos] = useState(center);
  const [targetPos, setTargetPos] = useState(center);
  const shieldPosRef = useRef(shieldPos);
  const targetPosRef = useRef(targetPos);

  // Recentrar escudo si el stage cambia
  useEffect(() => {
    setShieldPos(center);
    setTargetPos(center);
    shieldPosRef.current = center;
    targetPosRef.current = center;
  }, [center.x, center.y]);

  // === SFX: carga y helpers =================================================
  useEffect(() => {
    const loadSfx = (name, vol = 0.6) => {
      const a = new Audio(`/sfx/${name}.wav`);
      a.preload = "auto";
      a.volume = vol;
      a.addEventListener("error", () => {
        a.src = `/sfx/${name}.mp3`;
        a.load();
      });
      return a;
    };
    sfx.current.place = loadSfx("place", 0.5);
    sfx.current.block = loadSfx("block", 0.6);
    sfx.current.hit   = loadSfx("hit", 0.65);
    sfx.current.win   = loadSfx("win", 0.7);
    sfx.current.lose  = loadSfx("lose", 0.7);
    sfx.current.tick  = loadSfx("tick", 0.45);
  }, []);

  const playSfx = (name) => {
    if (muted) return;
    const a = sfx.current[name];
    if (!a) return;
    try { a.currentTime = 0; a.play(); } catch {}
  };

  // ===== DIFICULTAD DINÁMICA =================================================
  const progress = useMemo(() => Math.min(1, Math.max(0, (GAME_SECONDS - timeLeft) / GAME_SECONDS)), [timeLeft]);
  const baseSpeed = useMemo(() =>
    DIFF.minSpeed + (DIFF.maxSpeed - DIFF.minSpeed) * Math.pow(progress, DIFF.speedPow)
  , [progress]);
  const spawnMs = useMemo(() => {
    const v = DIFF.startSpawnMs - (DIFF.startSpawnMs - DIFF.endSpawnMs) * Math.pow(progress, DIFF.spawnPow);
    return Math.max(DIFF.endSpawnMs, Math.round(v));
  }, [progress]);
  const shieldRadius = useMemo(() =>
    DIFF.shieldStart - (DIFF.shieldStart - DIFF.shieldEnd) * progress
  , [progress]);

  // ===== OLEADAS =============================================================
  const elapsed = useMemo(() => GAME_SECONDS - timeLeft, [timeLeft]); // seg jugados
  const waveActive = useMemo(() => {
    if (elapsed <= 0) return false;
    const mod = elapsed % WAVES.periodSec;
    return mod < WAVES.durationSec;
  }, [elapsed]);
  const prevWaveRef = useRef(false);

  // Ráfaga al inicio de cada oleada
  useEffect(() => {
    if (!waveActive || prevWaveRef.current) { prevWaveRef.current = waveActive; return; }
    const burstCount = Math.round(WAVES.burstMin + (WAVES.burstMax - WAVES.burstMin) * progress);
    setThreats((prev) => {
      const batch = Array.from({ length: burstCount }, () =>
        spawnThreat(stageSize, center, baseSpeed)
      );
      const next = [...prev, ...batch];
      return MAX_ON_STAGE ? next.slice(-MAX_ON_STAGE) : next;
    });
    playSfx("place"); // beep de inicio de oleada
    prevWaveRef.current = true;
  }, [waveActive, progress, stageSize, center, baseSpeed]); // eslint-disable-line react-hooks/exhaustive-deps

  // Helpers
  const rand = (min, max) => Math.random() * (max - min) + min;

  // Crear amenaza en un borde hacia el centro (servidor)
  const spawnThreat = (stageSize, center, baseSpeed) => {
    const { w, h } = stageSize;
    const margin = 24;

    const side = Math.floor(Math.random() * 4); // 0 top,1 right,2 bottom,3 left
    let x, y;
    if (side === 0) { x = rand(margin, w - margin); y = -margin; }
    else if (side === 1) { x = w + margin; y = rand(margin, h - margin); }
    else if (side === 2) { x = rand(margin, w - margin); y = h + margin; }
    else { x = -margin; y = rand(margin, h - margin); }

    const dx = center.x - x;
    const dy = center.y - y;
    const mag = Math.hypot(dx, dy) || 1;
    const vx = dx / mag;
    const vy = dy / mag;

    const speed = baseSpeed * (0.9 + Math.random() * 0.35);
    const sprite = SPRITES[Math.floor(Math.random() * SPRITES.length)];

    return { id: nextId.current++, x, y, vx, vy, speed, sprite };
  };

  // Medir stage y responsive
  useEffect(() => {
    const resize = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setStageSize({
        w: Math.max(520, rect.width),
        h: Math.max(420, rect.height),
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Temporizador + “tick” en últimos 10s
  useEffect(() => {
    if (ended) return;
    if (timeLeft <= 0) { setEnded(true); return; }
    const t = setTimeout(() => {
      setTimeLeft((prev) => {
        const n = prev - 1;
        if (n <= 10 && n > 0) playSfx("tick");
        return n;
      });
    }, 1000);
    return () => clearTimeout(t);
  }, [timeLeft, ended]);

  // Spawner de amenazas (con extra por progreso y oleada)
  useEffect(() => {
    if (ended) return;
    const h = setInterval(() => {
      const extraProgress =
        (progress > DIFF.extraSpawn1 ? 1 : 0) +
        (progress > DIFF.extraSpawn2 ? 1 : 0);
      const waveBonus = waveActive ? WAVES.bonusPerTick : 0;
      const count = 1 + extraProgress + waveBonus;

      setThreats((prev) => {
        const batch = Array.from({ length: count }, () =>
          spawnThreat(stageSize, center, baseSpeed)
        );
        const next = [...prev, ...batch];
        return MAX_ON_STAGE ? next.slice(-MAX_ON_STAGE) : next;
      });
    }, spawnMs);
    return () => clearInterval(h);
  }, [spawnMs, ended, stageSize, center, baseSpeed, progress, waveActive]);

  // Loop (60fps): mover escudo (lerp) + amenazas + colisiones
  useEffect(() => {
    if (ended) return;

    let rafId;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // Suavizado del escudo (lerp hacia target)
      {
        const sp = shieldPosRef.current;
        const tp = targetPosRef.current;
        const follow = 10;
        const alpha = Math.min(1, follow * dt);
        const nx = sp.x + (tp.x - sp.x) * alpha;
        const ny = sp.y + (tp.y - sp.y) * alpha;
        if (Math.abs(nx - sp.x) > 0.1 || Math.abs(ny - sp.y) > 0.1) {
          const np = { x: nx, y: ny };
          shieldPosRef.current = np;
          setShieldPos(np);
        }
      }

      // Amenazas y colisiones
      setThreats((prev) => {
        const next = [];
        let lifeLoss = 0;
        let blockedThisFrame = 0;

        for (const t of prev) {
          const nx = t.x + t.vx * t.speed * dt;
          const ny = t.y + t.vy * t.speed * dt;

          // Distancia al escudo (móvil, radio dinámico)
          const dsx = shieldPosRef.current.x - nx;
          const dsy = shieldPosRef.current.y - ny;
          const dShield = Math.hypot(dsx, dsy);
          if (dShield <= shieldRadius) {
            blockedThisFrame += 1;
            continue; // bloqueada
          }

          // Distancia al servidor (fijo en el centro)
          const dcx = center.x - nx;
          const dcy = center.y - ny;
          const dServer = Math.hypot(dcx, dcy);
          if (dServer <= SERVER_RADIUS) {
            lifeLoss += 1; // entró
            continue;
          }

          next.push({ ...t, x: nx, y: ny });
        }

        if (blockedThisFrame > 0) {
          setScore((s) => s + blockedThisFrame * POINTS_PER_BLOCK);
          playSfx("block");
        }
        if (lifeLoss > 0) {
          playSfx("hit");
          setLives((l) => {
            const u = l - lifeLoss;
            if (u <= 0) setEnded(true);
            return u;
          });
        }
        return next;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [center, ended, shieldRadius]);

  // Sonido de fin (win/lose)
  useEffect(() => {
    if (!ended && timeLeft > 0) return;
    const didWin = !ended && timeLeft <= 0 && lives > 0;
    const didLose = ended && lives <= 0;
    if (didWin) playSfx("win");
    if (didLose) playSfx("lose");
  }, [ended, timeLeft, lives]); // eslint-disable-line react-hooks/exhaustive-deps

  // Target del escudo desde puntero (y “prime” del audio)
  const updateTargetFromEvent = (e) => {
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clampedX = Math.max(0, Math.min(stageSize.w, x));
    const clampedY = Math.max(0, Math.min(stageSize.h, y));
    const p = { x: clampedX, y: clampedY };
    setTargetPos(p);
    targetPosRef.current = p;

    if (!audioArmed) {
      setAudioArmed(true);
      playSfx("place");
    }
  };

  const gameOver = ended || timeLeft <= 0;
  const win = !ended && timeLeft <= 0 && lives > 0;
  const lose = ended && lives <= 0;

  return (
    <div className="rad-wrap">
      {/* HUD */}
      <div className="rad-hud">
        <div className="rad-badge">⏱ {timeLeft}s</div>
        <div className="rad-badge">❤️ {lives}/{MAX_LIVES}</div>
        <div className="rad-badge">⭐ {score} pts</div>
        {waveActive && (
          <div className="rad-badge" style={{ background: "rgba(255,80,80,.35)", borderColor: "rgba(255,120,120,.6)" }}>
            🌊 Oleada
          </div>
        )}
        <button
          className={"rad-mute" + (muted ? " is-muted" : "")}
          onClick={() => setMuted(m => !m)}
          aria-pressed={muted}
          title={muted ? "Activar sonido" : "Silenciar sonido"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* Stage (mueve el escudo con el puntero) */}
      <div
        ref={stageRef}
        className="rad-stage"
        style={{ backgroundImage: `url(${bg})` }}
        onPointerMove={updateTargetFromEvent}
        onPointerDown={updateTargetFromEvent}
        onPointerEnter={updateTargetFromEvent}
      >
        {/* Centro: servidor */}
        <img
          src={serverImg}
          alt="Servidor"
          className="rad-server"
          style={{ left: center.x, top: center.y }}
          draggable={false}
        />

        {/* Escudo (sigue puntero) */}
        <img
          src={shieldImg}
          alt="Escudo"
          className="rad-shield"
          style={{ left: shieldPos.x, top: shieldPos.y }}
          draggable={false}
        />

        {/* Anillos guía (escudo dinámico + servidor) */}
        <div
          className="rad-ring rad-ring--shield"
          style={{ left: shieldPos.x, top: shieldPos.y, width: shieldRadius * 2, height: shieldRadius * 2 }}
        />
        <div
          className="rad-ring rad-ring--server"
          style={{ left: center.x, top: center.y, width: SERVER_RADIUS * 2, height: SERVER_RADIUS * 2 }}
        />

        {/* Amenazas */}
        {threats.map((t) => (
          <img
            key={t.id}
            src={t.sprite}
            alt="Amenaza"
            className="rad-threat"
            style={{ left: t.x, top: t.y }}
            draggable={false}
          />
        ))}
      </div>

      {/* Overlay final */}
      {gameOver && (
        <div className="rad-overlay">
          <div className="rad-card">
            <h2 className="rad-card-title">
              {win ? "✅ Protegiste el sistema" : lose ? "⚠️ El ataque fue exitoso" : "⏱ Tiempo agotado"}
            </h2>
            <p className="rad-card-sub">
              Puntuación: <b>{score} pts</b> • Amenazas que entraron: <b>{MAX_LIVES - lives}</b>
            </p>
            <div className="rad-card-actions">
              <button className="boton-enlace-juegos" onClick={() => window.location.reload()}>Reintentar</button>
              <button className="boton-enlace-juegos" onClick={() => navigate("/selector")}>Salir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
