import logo from '../assets/img/logo-ciberseguridad-2025.png'
import tituloJuegos from '../assets/img/titulo-juegos.png'
import pacmanImg from '../assets/img/firewall-img.png'
import focusImg from '../assets/img/contrasena-img.png'
import ninjaImg from '../assets/img/malware-img.png'
import liveImg from '../assets/img/live-img.png'
import videoDesktop from '../assets/img/lia-avatar-landscape-3.mp4'   // landscape (desktop)
import videoMobile  from '../assets/img/lia-avatar-portrait-3.mp4'    // portrait (móvil)
import liaImgLandscape from'../assets/img/liaImgLandscape.png'
import liaImgPortrait from'../assets/img/liaImgPortrait.png'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import React, { useRef, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { getUser } from '../Redux/user'

    const Selector = () => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
      
        const isCompleted = useSelector( state => state.user.user.completed)
        const result = useSelector( state => state.user.user.result)

        // Refs de los dos videos de fondo
        const desktopRef = useRef(null);
        const mobileRef  = useRef(null);
        const [audioOn, setAudioOn] = useState(false);
        const [hasStarted, setHasStarted] = useState(false);
      
        const onExit = () => {
          dispatch( { type: 'user/clear' } )
          navigate('/'); // o deja vacío si prefieres
        };

        // Habilitar audio tras interacción del usuario (requisito de navegadores)
        const enableAudio = async () => {
            const isMobile = window.matchMedia('(max-width: 768px), (orientation: portrait)').matches;
            const active   = isMobile ? mobileRef.current : desktopRef.current;
            const inactive = isMobile ? desktopRef.current : mobileRef.current;

            try {
            if (inactive) inactive.pause(); // pausa el no visible
            if (active) {
                active.muted = false;         // enciende audio
                active.volume = 1.0;
                await active.play();          // permitido por el clic
                setAudioOn(true);
            }
            } catch (err) {
            console.error('No se pudo habilitar el audio:', err);
            // Si falla, el navegador sigue bloqueando: deja el botón visible
            }
        };
        
         // Reproducir manualmente con audio desde el inicio
        const startVideo = async () => {
            const isMobile = window.matchMedia('(max-width: 768px), (orientation: portrait)').matches;
            const active   = isMobile ? mobileRef.current : desktopRef.current;
            const inactive = isMobile ? desktopRef.current : mobileRef.current;

            try {
            if (inactive) {
                inactive.pause();
                inactive.currentTime = 0;
            }
            if (active) {
                active.currentTime = 0;   // arranca desde el principio
                active.muted = false;     // con audio
                active.controls = true;   // muestra controles nativos (opcional)
                await active.play();      // permitido por la interacción del usuario
                setHasStarted(true);      // oculta el botón
            }
            } catch (err) {
            console.error('No se pudo reproducir el video:', err);
            }
        };

        useEffect(() => {
          dispatch(getUser());
        }, [dispatch]);

    return (
        <div>
            {/* Fondo en video: desktop (landscape) + mobile (portrait) */}
            <div className="video-bg" aria-hidden="true">
                <video
                ref={desktopRef}
                className="video desktop"
                playsInline
                preload="metadata"
                poster={liaImgLandscape}
                >
                <source src={videoDesktop} type="video/mp4" />
                {/* Agrega <source type="video/webm"> si tienes versión webm */}
                </video>

                <video
                ref={mobileRef}
                className="video mobile"
                playsInline
                preload="metadata"
                poster={liaImgPortrait}
                >
                <source src={videoMobile} type="video/mp4" />
                {/* Agrega <source type="video/webm"> si tienes versión webm */}
                </video>
            </div>

            {/* Botón flotante para reproducir manualmente con audio desde el inicio */}
            {!hasStarted && (
                <button
                onClick={startVideo}
                aria-label="Reproducir video"
                style={{
                    position: 'fixed',
                    left: '50%',
                    bottom: 24,
                    transform: 'translateX(-50%)',
                    zIndex: 3,
                    padding: '10px 16px',
                    borderRadius: 9999,
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,.4)',
                    fontFamily: 'Banda Regular, sans-serif',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)'
                }}
                >
                ▶️ Reproducir video
                </button>
            )}

<div className='selector-header'>
        <div className="logo-ciberseguridad-selector">
          <img src={logo} alt="Logo Ciberseguridad Porvenir" />
        </div>
        <div className='boton-salir'>
          <div onClick={ onExit } className="boton-enlace-juegos">
            Salir
          </div>
        </div>
      </div>

      <section className="cont-select">
        { isCompleted ? (
          <section className='container_gracias'>
            <p>Gracias por participar</p>
            <p>Tu puntaje total es de <span style={{ color: '#FF7C00'}}>{result} Pts</span></p>
            <p>Te invitamos a seguir las transmisiones en vivo</p>
          </section>
        ) : (
          <section className="cont-juegos">
            <div className="titulo-juegos">
              <img src={tituloJuegos} alt="" />
            </div>
            <div className="cont-escoge-juego">
              <div className="escoge-juego">
                <div className="cont-ruleta">
                  <img src={pacmanImg} alt="FirewallDefender" />
                  <div className="boton-ruleta">
                    <div onClick={() => navigate('/firewall/intro')} className="boton-enlace-juegos">
                      Firewall Defender
                    </div>
                  </div>
                </div>
                <div className="cont-focus">
                  <img src={focusImg} alt="ContrasenaMaestra" />
                  <div className="boton-focus">
                    <div onClick={() => navigate('/contrasena-maestra/intro')} className="boton-enlace-juegos">
                      Contraseña Maestra
                    </div>
                  </div>
                </div>
                <div className="cont-ninja">
                  <img src={ninjaImg} alt="Malware" />
                  <div className="boton-ninja">
                    <div onClick={() => navigate('/escapa-malware/intro')} className="boton-enlace-juegos">
                      Escapa del Malware
                    </div>
                  </div>
                </div>
                <div className="cont-ninja">
                  <img src={liveImg} alt="Señal en Vivo" />
                  <div className="boton-ninja">
                    <div onClick={() => navigate('/live')} className="boton-enlace-juegos">
                      Ver en vivo
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='cont-aplica-terminos'>
              <p className='aplica-terminos'>Aplica Términos y Condiciones</p>
            </div>
          </section>
        )}

        <section className="cont-sel-options">
          {/* (vacío, como lo dejaste) */}
        </section>
      </section>
    </div>
  )
}

export default Selector