import logo from '../assets/img/logo-ciberseguridad.jpg'
import tituloJuegos from '../assets/img/titulo-juegos.png'
import ruletaImg from '../assets/img/ruleta-img.png'
import focusImg from '../assets/img/focus-img.png'
import ninjaImg from '../assets/img/ninja-img.png'
import liveImg from '../assets/img/live-imagen.png'

import '../App.css'
import { useNavigate } from 'react-router-dom'

const Selector = () => {

    const navigate = useNavigate()
    return (
        <div>
            <div className='selector-header'>
                <div className='boton-salir'>
                    <div onClick={ () => navigate('/ninja/intro')} className="boton-enlace-juegos">
                        Salir
                    </div>
                </div>
                <div className="logo-ciberseguridad">
                    <img src={logo} alt="Logo Ciberseguridad Porvenir" />
                </div>
            </div>
            <section className="cont-select">
                <section className="cont-sel-options">
                    <section className="cont-juegos">
                        <div className="titulo-juegos">
                            <img src={tituloJuegos} alt="" />
                        </div>
                        <div className="cont-escoge-juego">
                            <div className="escoge-juego">
                                <div className="cont-ruleta">
                                    <img src={ruletaImg} alt="Ruleta del Saber" />
                                    <div className="boton-ruleta">
                                        <div onClick={ () => navigate('/ruleta/personaje')} className="boton-enlace-juegos">
                                            Ruleta del Saber
                                        </div>
                                    </div>
                                </div>
                                <div className="cont-focus">
                                    <img src={focusImg} alt="Focus Game" />
                                    <div className="boton-focus">
                                        <div onClick={ () => navigate('/focus/frase')} className="boton-enlace-juegos">
                                            Focus Game
                                        </div>
                                    </div>
                                </div>
                                <div className="cont-ninja">
                                    <img src={ninjaImg} alt="CiPo Ninja" />
                                    <div className="boton-ninja">
                                        <div onClick={ () => navigate('/ninja/intro')} className="boton-enlace-juegos">
                                            Cipo Ninja
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="cont-transmision">
                        <div className="ver-en-vivo">
                            <div onClick={ () => navigate('/live')} id="boton-con-imagen">
                                <img src={liveImg} alt="Señal en Vivo" />
                            </div>                
                        </div>
                    </section>
                </section>
            </section>
        </div>
    )
}

export default Selector