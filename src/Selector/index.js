import logo from '../assets/img/logo-ciberseguridad.jpg'
import tituloJuegos from '../assets/img/titulo-juegos.png'
import ruletaImg from '../assets/img/ruleta-img.png'
import focusImg from '../assets/img/focus-img.png'
import ninjaImg from '../assets/img/ninja-img.png'
import liveImg from '../assets/img/live-imagen.png'

import '../App.css'

const Selector = () => {
    return (
        <div>
            <header>
                <div className="logo-ciberseguridad">
                    <img src={logo} alt="Logo Ciberseguridad Porvenir" />
                </div>
            </header>
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
                                        <a href="ruleta.html" className="boton-enlace-juegos">Ruleta del Saber</a>
                                    </div>
                                </div>
                                <div className="cont-focus">
                                    <img src={focusImg} alt="Focus Game" />
                                    <div className="boton-focus">
                                        <a href="focus.html" className="boton-enlace-juegos">Focus Game</a>
                                    </div>
                                </div>
                                <div className="cont-ninja">
                                    <img src={ninjaImg} alt="Cipo Ninja" />
                                    <div className="boton-ninja">
                                        <a href="ninja.html" className="boton-enlace-juegos">Cipo Ninja</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="cont-transmision">
                        <div className="ver-en-vivo">
                            <a href="#" id="boton-con-imagen">
                                <img src={liveImg} alt="Señal en Vivo" />
                            </a>                
                        </div>
                    </section>
                </section>
            </section>
        </div>
    )
}

export default Selector