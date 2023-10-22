import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Logo from '../../../assets/img/ciberseguridad-logo-porvenir-blanco.png'
import Flechas from '../../../assets/img/ninja/flechas-cipo-guia.png'

import './styles.css'

const IntroNinja = () => {

    const navigate = useNavigate()

    useEffect( () => {
        setTimeout( () => {
            navigate('/ninja')
        }, 4000)
    }, [navigate])

    return (
        <div className='container_intro_ninja'>
            <header>
                <img src={Logo} alt="Logo" />
            </header>

            <main className='descripcion'>
                <div>
                    <p className='texto-indicaciones-inicio-ninja'>Ayuda a CiPo a luchar</p>
                    <p className='texto-indicaciones-inicio-ninja'>contra el crimen cibernético</p>
                </div>
                <div>
                    <img src={Flechas} alt="Flechas" />
                </div>
                <div>
                    <p className='texto-indicaciones-inicio-ninja'>Muévelo de lado a lado y atrápa</p>
                    <p className='texto-indicaciones-inicio-ninja'>a Troyano y sus ciber secuases</p>
                </div>
            </main>
        </div>
    )
}

export default IntroNinja