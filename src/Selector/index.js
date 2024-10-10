import logo from '../assets/img/logo-ciberseguridad.jpg'
import tituloJuegos from '../assets/img/titulo-juegos.png'
import ruletaImg from '../assets/img/ruleta-img.png'
import focusImg from '../assets/img/focus-img.png'
import ninjaImg from '../assets/img/ninja-img.png'
import liveImg from '../assets/img/live-imagen.png'

import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearUser, getUser } from '../Redux/user'
import { useEffect } from 'react'

const Selector = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isCompleted = useSelector( state => state.user.user.completed)
    const result = useSelector( state => state.user.user.result)

    useEffect( () => {
        dispatch(getUser())
    }, [dispatch])

    const onExit = () => {
        dispatch( { type: 'user/clear' } )
    }
    return (
        <div>
            <div className='selector-header'>
                <div className='boton-salir'>
                    <div onClick={ onExit } className="boton-enlace-juegos">
                        Salir
                    </div>
                </div>
                <div className="logo-ciberseguridad">
                    <img src={logo} alt="Logo Ciberseguridad Porvenir" />
                </div>
            </div>
            <section className="cont-select">

                { isCompleted ? (
                    <section className='container_gracias'>
                        <p>
                            Gracias por participar
                        </p>
                        <p>
                            Tu puntaje total es de <span style={{ color: '#FF7C00'}}>{result} Pts</span>
                        </p>
                        <p>
                            Te invitamos a seguir las transmisiones en vivo
                        </p>
                    </section>
                ) : (
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
                )}
                <section className="cont-sel-options">
                    
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