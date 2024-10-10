import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Logo from '../../../assets/img/ciberseguridad-logo-porvenir-blanco.png'
import Flechas from '../../../assets/img/ninja/flechas-cipo-guia.png'

import './styles.css'

const IntroNinja = () => {

    const navigate = useNavigate()

    return (
        <div className='container_intro_ninja'>
            <div className='header-intro-ninja'>
                <img src={Logo} alt="Logo" />
            </div>

            <main className='descripcion'>
                <div>
                    <p className='texto-indicaciones-inicio-ninja'>Ayuda a CiPo a luchar</p>
                    <p className='texto-indicaciones-inicio-ninja'>contra el crimen cibernético</p>
                </div>
                <div className='flechas-imagen'>
                    <img src={Flechas} alt="Flechas" />
                </div>
                <div>
                    <p className='texto-indicaciones-inicio-ninja'>Muévelo de lado a lado y atrápa</p>
                    <p className='texto-indicaciones-inicio-ninja'>a Troyano y sus ciber secuases</p>
                </div>

                <div>
                    <div className='container_focus_iniciar'>
                        <div style={{ maxWidth: 250 }} 
                            onClick={ () => navigate('/ninja') } 
                            className='boton-enlace'>
                            Iniciar Juego
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default IntroNinja