import { useEffect, useMemo, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contrasena-maestra-play.css";

/**
 * Contraseña Maestra – Play
 * - Confeti canvas
 * - Texto con efecto “tragamonedas”
 * - Fondo con imagen inyectada
 * - Logo en header (fade + slide)
 * - Footer decorativo con parallax suave en desktop y variante móvil
 */

import bgPlay from "../../../assets/img/bg-contrasena-play.png";
import cipoLogo from "../../../assets/img/cipo-logo-contrasena.png";
import footerImg from "../../../assets/img/contrasena-footer.png";
import footerImgMobile from "../../../assets/img/contrasena-footer-movil.png";

const GAME_SECONDS = 60;
const MAX_STRIKES = 3;

const DICT = [
  "password","qwerty","abc123","letmein","admin","welcome","iloveyou","dragon",
  "monkey","football","baseball","starwars","princess","master","pass","shadow",
  "superman","pokemon","ninja","asdfgh","123456","111111","000000","12345678",
  "987654","123123","2024","2025","1990","1999","colombia","bogota","angie"
];
const SEQS = ["123456789", "abcdefghijklmnopqrstuvwxyz", "qwertyuiop", "asdfghjkl", "zxcvbnm"];
const SYMBOLS = "!@#$%^&*()_+{}[]<>?~-=";

// =========================== Puntaje global ===========================
function awardPoints(points) {
  try {
    const key = "gameHub:score";
    const current = parseInt(localStorage.getItem(key) || "0", 10) || 0;
    const updated = current + points;
    localStorage.setItem(key, String(updated));
    window.dispatchEvent(new CustomEvent("globalScore:add", { detail: { delta: points, total: updated }}));
    if (typeof window.__dispatchScore === "function") window.__dispatchScore(points);
  } catch {}
}

// =========================== Utils contraseñas ===========================
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
function pick(arr) { return arr[randomInt(0, arr.length - 1)]; }
function randomLetters(len, { upper = true, lower = true } = {}) {
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; const a = "abcdefghijklmnopqrstuvwxyz";
  let pool = ""; if (upper) pool += A; if (lower) pool += a;
  return Array.from({ length: len }, () => pool[randomInt(0, pool.length - 1)]).join("");
}
function randomDigits(len) { const d = "0123456789"; return Array.from({ length: len }, () => d[randomInt(0, d.length - 1)]).join(""); }
function randomSymbols(len) { return Array.from({ length: len }, () => SYMBOLS[randomInt(0, SYMBOLS.length - 1)]).join(""); }

function genWeak() {
  const type = pick(["short", "dict", "repeat", "seq", "name+123"]);
  switch (type) {
    case "short": return randomLetters(randomInt(4, 7), { upper: false, lower: true });
    case "dict":  return pick(DICT) + (Math.random() < 0.5 ? randomInt(1, 99) : "");
    case "repeat": { const ch = pick(["a","b","c","1","2","3"]); return ch.repeat(randomInt(5, 8)); }
    case "seq": { const base = pick(SEQS); const len = randomInt(5, 8); return base.slice(0, len); }
    case "name+123": { const part = pick(["angie","juan","maria","carlos","luna","sol","moya"]); return part + "123"; }
    default: return "123456";
  }
}
function genStrong() {
  const len = randomInt(12, 16);
  const must = [pick("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), pick("abcdefghijklmnopqrstuvwxyz"), pick("0123456789"), pick(SYMBOLS)];
  let pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + SYMBOLS;
  let rest = Array.from({ length: len - must.length }, () => pool[randomInt(0, pool.length - 1)]);
  let draft = [...must, ...rest].sort(() => Math.random() - 0.5).join("");
  if (Math.random() < 0.25) {
    const words = [randomLetters(4), randomLetters(4), randomLetters(4), String(randomInt(10, 99)), pick(["!", "#", "$"])];
    draft = words.join(pick(["-", "_", "."])); if (draft.length < 12) draft += randomSymbols(2);
  }
  return draft;
}
function analyzePassword(pw) {
  const length = pw.length, upper = /[A-Z]/.test(pw), lower = /[a-z]/.test(pw), digits = /\d/.test(pw), symbols = /[^A-Za-z0-9]/.test(pw);
  const lowerPw = pw.toLowerCase();
  const inDict = DICT.some(w => lowerPw.includes(w));
  const hasSeq = SEQS.some(seq => seq.includes(lowerPw) || lowerPw.includes(seq));
  let score = 0;
  if (length >= 12) score += 2;
  if (length >= 16) score += 1;
  if (upper) score += 1; if (lower) score += 1; if (digits) score += 1; if (symbols) score += 1;
  if (inDict) score -= 2; if (hasSeq) score -= 1;
  const strong = score >= 5 && length >= 12 && (upper + lower + digits + symbols >= 3);
  return { length, upper, lower, digits, symbols, inDict, hasSeq, strong, score };
}
function makeCandidate() {
  const isStrong = Math.random() < 0.55;
  const text = isStrong ? genStrong() : genWeak();
  const analysis = analyzePassword(text);
  return { text, analysis, strong: isStrong };
}

// =========================== CONFETI (canvas) ===========================
const ConfettiCanvas = forwardRef(function ConfettiCanvas(_, ref) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const partsRef = useRef([]);
  const ctxRef = useRef(null);
  const DPR = useRef(Math.max(1, window.devicePixelRatio || 1));
  const colors = ["#06d6a0","#3a86ff","#ffbe0b","#ef476f","#7cc9ff","#8affd3"];

  useEffect(() => {
    function resize() {
      const c = canvasRef.current; if (!c) return;
      const dpr = DPR.current;
      c.width = Math.floor(window.innerWidth * dpr);
      c.height = Math.floor(window.innerHeight * dpr);
      c.style.width = window.innerWidth + "px";
      c.style.height = window.innerHeight + "px";
      const ctx = c.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxRef.current = ctx;
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    let last = 0;
    function tick(ts) {
      const ctx = ctxRef.current;
      if (!ctx) { rafRef.current = requestAnimationFrame(tick); return; }
      const dt = Math.min(32, ts - last || 16);
      last = ts;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const gravity = 0.18, air = 0.995, tilt = 0.002;

      partsRef.current = partsRef.current.filter(p => p.life > 0);
      for (const p of partsRef.current) {
        p.vx *= air; p.vy = p.vy * air + gravity;
        p.x += p.vx; p.y += p.vy;
        p.r += p.spin;
        p.life -= dt * 0.06;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r + Math.sin(p.y * tilt));
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 100));
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.size*0.6, -p.size*0.35, p.size*1.2, p.size*0.7);
        } else {
          ctx.beginPath(); ctx.arc(0,0,p.size*0.5,0,Math.PI*2); ctx.fill();
        }
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useImperativeHandle(ref, () => ({
    burst({ x, y, count = 120, power = 8 }) {
      if (partsRef.current.length > 600) partsRef.current.splice(0, 200);
      for (let i = 0; i < count; i++) {
        const angle = (-90 + (Math.random() * 60 - 30)) * (Math.PI/180);
        const speed = (Math.random() * 0.6 + 0.7) * power;
        partsRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random()*Math.PI, spin: (Math.random()*0.2 - 0.1),
          life: 100 + Math.random()*40,
          size: 6 + Math.random()*8,
          color: colors[Math.floor(Math.random()*colors.length)],
          shape: Math.random() < 0.65 ? "rect" : "dot",
        });
      }
    }
  }));

  return <canvas className="cm-confetti" ref={canvasRef} />;
});

// =========================== Efecto “tragamonedas” ===========================
const DIGITS = "0123456789";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const POOL_ALL = UPPER + LOWER + DIGITS + SYMBOLS;

function likePoolOf(ch) {
  if (/\d/.test(ch)) return DIGITS;
  if (/[A-Z]/.test(ch)) return UPPER;
  if (/[a-z]/.test(ch)) return LOWER;
  if (/\s/.test(ch)) return " ";
  return SYMBOLS;
}
function randomFrom(pool) { return pool[Math.floor(Math.random() * pool.length)] || " "; }

function ReelText({ text, playKey, duration = 900, stagger = 55 }) {
  const chars = useMemo(() => text.split(""), [text]);
  return (
    <h2 key={playKey} className="cm-reel">
      {chars.map((finalChar, i) => (
        <ReelChar
          key={`${playKey}-${i}-${finalChar}`}
          finalChar={finalChar}
          index={i}
          duration={duration}
          stagger={stagger}
        />
      ))}
    </h2>
  );
}
function ReelChar({ finalChar, index, duration, stagger }) {
  const [ch, setCh] = useState(() => (/\s/.test(finalChar) ? " " : randomFrom(POOL_ALL)));
  const [state, setState] = useState("spin"); // 'spin' | 'lock'
  useEffect(() => {
    let raf, start, lastTick = 0;
    const delay = index * stagger;
    function step(ts) {
      if (!start) start = ts;
      const t = ts - start;
      if (t < delay) { raf = requestAnimationFrame(step); return; }
      const p = Math.min(1, (t - delay) / duration);
      const interval = 28 + (p * 120);
      if (!lastTick || (ts - lastTick) > interval) {
        if (p < 1) {
          const pool = likePoolOf(finalChar);
          setCh(randomFrom(pool));
          setState("spin");
        } else {
          setCh(finalChar);
          setState("lock");
        }
        lastTick = ts;
      }
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [finalChar, index, duration, stagger]);

  return <span className={`cm-reel-char ${state}`}>{ch}</span>;
}

// =========================== Componente principal ===========================
export default function ContrasenaMaestraPlay() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [ended, setEnded] = useState(false);

  const [candidate, setCandidate] = useState(makeCandidate());
  const [anim, setAnim] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [playKey, setPlayKey] = useState(0);

  const [corrects, setCorrects] = useState(0);
  const [wrongs, setWrongs] = useState(0);

  const tickRef = useRef(null);
  const lockRef = useRef(false);
  const cardRef = useRef(null);
  const footerWrapRef = useRef(null);

  const confettiRef = useRef(null);

  // Timer
  useEffect(() => {
    if (ended) return;
    tickRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(tickRef.current); endGame(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, [ended]);

  // Keyboard
  useEffect(() => {
    function onKey(e) {
      if (ended || lockRef.current) return;
      if (e.key === "ArrowLeft") handleClassify("reject");
      else if (e.key === "ArrowRight" || e.key === " ") handleClassify("approve");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ended]);

  // Parallax suave del footer en desktop (wrapper para que funcione con <picture>)
  useEffect(() => {
    const el = footerWrapRef.current;
    if (!el) return;
    let ticking = false;

    function apply() {
      ticking = false;
      const w = window.innerWidth;
      if (w < 900) {
        el.style.transform = "translate(-50%, 0)"; // sin parallax en móviles
        return;
      }
      const y = window.scrollY || 0;
      const offset = Math.max(-20, Math.min(20, -(y * 0.03))); // rango [-20,20]px
      el.style.transform = `translate(-50%, ${offset}px)`;
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    }
    function onResize() { onScroll(); }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function nextCandidate(delay = 260) {
    setTimeout(() => {
      setAnim(""); setFeedback(null);
      setCandidate(makeCandidate());
      setPlayKey((k) => k + 1);
      lockRef.current = false;
    }, delay);
  }

  function endGame() {
    setEnded(true);
    clearInterval(tickRef.current);
    awardPoints(score);
  }

  function confettiBurst(mult = 1) {
    const rect = cardRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height * 0.30 + window.scrollY : window.innerHeight * 0.35;
    const count = Math.min(160, Math.floor(70 + combo * 10));
    const power = 7 + Math.min(6, combo * 0.5);
    confettiRef.current?.burst({ x, y, count: Math.floor(count * mult), power });
  }

  function handleClassify(action) {
    if (ended || lockRef.current) return;
    lockRef.current = true;

    const isStrong = candidate.strong;
    const correct = (action === "approve" && isStrong) || (action === "reject" && !isStrong);

    if (correct) {
      const base = 10;
      const newCombo = combo + 1;
      const comboBonus = Math.min(newCombo * 2, 20);
      const add = base + comboBonus;
      setScore((s) => s + add);
      setCombo(newCombo);
      setBestCombo((b) => Math.max(b, newCombo));
      setCorrects((c) => c + 1);

      setFeedback("ok");
      setAnim(action === "approve" ? "slide-right" : "slide-left");
      confettiBurst(1);
      if (newCombo % 5 === 0) confettiBurst(1.2);
    } else {
      setStrikes((st) => {
        const nextSt = st + 1;
        if (nextSt >= MAX_STRIKES) {
          setFeedback("bad");
          setAnim("shake");
          setWrongs((w) => w + 1);
          setTimeout(() => endGame(), 400);
        }
        return nextSt;
      });
      setCombo(0);
      setWrongs((w) => w + 1);
      setFeedback("bad");
      setAnim("shake");
    }

    nextCandidate(260);
  }

  function resetGame() {
    clearInterval(tickRef.current);
    setTimeLeft(GAME_SECONDS);
    setScore(0);
    setStrikes(0);
    setCombo(0);
    setBestCombo(0);
    setEnded(false);
    setCorrects(0);
    setWrongs(0);
    setCandidate(makeCandidate());
    setAnim("");
    setFeedback(null);
    setPlayKey((k) => k + 1);
    lockRef.current = false;
  }

  const timePct = Math.max(0, Math.min(100, (timeLeft / GAME_SECONDS) * 100));
  const a = candidate.analysis;
  const bars = [
    { key: "length", label: "Longitud", ok: a.length >= 12, value: Math.min(1, a.length / 16) },
    { key: "upper", label: "Mayúsculas", ok: a.upper, value: a.upper ? 1 : 0.2 },
    { key: "lower", label: "Minúsculas", ok: a.lower, value: a.lower ? 1 : 0.2 },
    { key: "digits", label: "Números", ok: a.digits, value: a.digits ? 1 : 0.2 },
    { key: "symbols", label: "Símbolos", ok: a.symbols, value: a.symbols ? 1 : 0.2 },
  ];

  const strengthLabel = a.strong
    ? (a.length >= 16 && a.symbols ? "Excelente" : "Fuerte")
    : (a.inDict || a.hasSeq || a.length < 8 ? "Muy débil" : "Débil");

  return (
    <div
      className="cm-play-wrap"
      style={{ "--cm-bg-url": `url(${bgPlay})` }}
    >
      {/* Confeti overlay */}
      <ConfettiCanvas ref={confettiRef} />

      {/* HUD superior */}
      <header className="cm-hud">
        <div className="cm-hud-left">
          <button className="cm-ghost-btn" onClick={() => navigate("/selector")} type="button">⬅ Volver</button>
          <img className="cm-brand" src={cipoLogo} alt="Cipo — Contraseña Maestra" />
        </div>

        <div className="cm-hud-center">
          <TimerCircle percent={timePct} timeLeft={timeLeft} />
          <div className="cm-score">
            <span className="cm-score-label">Puntos</span>
            <span className="cm-score-value">{score}</span>
          </div>
          <div className="cm-combo">
            <span className={`cm-chip ${combo >= 3 ? "glow" : ""}`}>🔥 Combo x{Math.max(1, combo)}</span>
            <span className="cm-subchip">Mejor: x{bestCombo}</span>
          </div>
        </div>

        <div className="cm-hud-right">
          <Strikes strikes={strikes} max={MAX_STRIKES} />
        </div>
      </header>

      {/* Tarjeta principal */}
      <main className="cm-stage">
        <div className={`cm-card ${anim}`} ref={cardRef}>
          <div className="cm-card-top">
            <ReelText key={playKey} text={candidate.text} playKey={playKey} />
            {/* Etiqueta de fuerza oculta por CSS para no dar pistas */}
            <span className={`cm-strength ${a.strong ? "ok" : "bad"}`}>{strengthLabel}</span>
          </div>

          {/* Barras de métricas */}
          <div className="cm-bars">
            {bars.map(b => (
              <div key={b.key} className="cm-bar">
                <div className="cm-bar-head">
                  <span>{b.label}</span>
                  <span className={`cm-dot ${b.ok ? "ok" : "bad"}`} />
                </div>
                <div className="cm-bar-track">
                  <div className="cm-bar-fill" style={{ transform: `scaleX(${b.value})` }} />
                </div>
              </div>
            ))}

            <div className="cm-flags">
              <Flag ok={!a.inDict} label="Diccionario" />
              <Flag ok={!a.hasSeq} label="Secuencias" />
            </div>
          </div>

          {/* Acciones */}
          <div className="cm-actions-row">
            <button className="cm-btn cm-btn-reject" onClick={() => handleClassify("reject")}>RECHAZAR</button>
            <button className="cm-btn cm-btn-approve" onClick={() => handleClassify("approve")}>APROBAR</button>
          </div>

          {/* Feedback stamp */}
          {feedback && <div className={`cm-stamp ${feedback}`} />}
        </div>

        <p className="cm-hint">
          Usa ← para RECHAZAR y →/Espacio para APROBAR. Evita fechas, nombres y secuencias. Prefiere 12+ caracteres con variedad 🔤 #️⃣ 🔣.
        </p>
      </main>

      {/* Modal fin */}
      {ended && (
        <div className="cm-modal-wrap">
          <div className="cm-modal">
            <h3>¡Fin del juego!</h3>
            <div className="cm-results">
              <div><strong>Puntaje:</strong> {score}</div>
              <div><strong>Aciertos:</strong> {corrects}</div>
              <div><strong>Errores:</strong> {wrongs}</div>
              <div><strong>Mejor combo:</strong> x{bestCombo}</div>
            </div>
            <div className="cm-modal-actions">
              <button className="cm-btn cm-btn-approve" onClick={resetGame}>Reintentar</button>
              <button className="cm-btn cm-btn-reject" onClick={() => navigate("/selector")}>Salir</button>
            </div>
            <p className="cm-save-hint">Tu puntaje ya se envió al total global. ¡Sigue sumando en otros juegos!</p>
          </div>
        </div>
      )}

      {/* Footer gráfico con parallax suave (usa una imagen distinta en móviles) */}
      <div
        ref={footerWrapRef}
        className="cm-footer-wrap"
        aria-hidden="true"
      >
        <picture>
          <source media="(max-width: 720px)" srcSet={footerImgMobile} />
          <img className="cm-footer-img" src={footerImg} alt="" />
        </picture>
      </div>
    </div>
  );
}

// =========================== UI Pieces ===========================
function TimerCircle({ percent, timeLeft }) {
  const R = 26, CIRC = 2 * Math.PI * R, dash = (percent / 100) * CIRC;
  return (
    <div className="cm-timer">
      <svg viewBox="0 0 64 64" className="cm-timer-svg" aria-hidden="true">
        <circle className="cm-timer-bg" cx="32" cy="32" r={R} />
        <circle className={`cm-timer-fg ${timeLeft <= 10 ? "urgent" : ""}`} cx="32" cy="32" r={R} strokeDasharray={`${dash} ${CIRC - dash}`} />
      </svg>
      <span className="cm-timer-text">{timeLeft}s</span>
    </div>
  );
}
function Strikes({ strikes, max }) {
  const arr = new Array(max).fill(0).map((_, i) => i < strikes);
  return <div className="cm-strikes">{arr.map((hit, i) => <span key={i} className={`cm-heart ${hit ? "hit" : ""}`}>❤</span>)}</div>;
}
function Flag({ ok, label }) { return <span className={`cm-flag ${ok ? "ok" : "bad"}`}>{ok ? "✔" : "✖"} {label}</span>; }
