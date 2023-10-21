import { useSelector } from 'react-redux'

import Logo from '../../../assets/img/ciberseguridad-logo.png'
import LogoRuleta from '../../../assets/img/logo_ruleta.png'

import './styles.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PuntajeScreen = () => {

    const avatar = useSelector( state => state.ruleta.avatar )
    const puntaje = useSelector( state => state.ruleta.puntaje )

    const navigate = useNavigate()

    useEffect( () => {

        // Todo: salvar puntaje, mostrar loader mientras guarda, y cuando success redirija al inicio

        setTimeout( () => {
            navigate('/selector')
        }, 4000)

    }, [])

    return (
        <div className='container_screen_ruleta_puntaje'>

            <header className='container_logo'>
                <img src={Logo} alt="logo" />
            </header>

            <main>
                { avatar && avatar.image && (
                    <div>
                        <img src={avatar.image} alt="avatar" />
                    </div>
                )}

                <div className='container_ruleta_puntaje'>
                    <p>Felicitaciones</p>
                    <p>Tu puntaje es { puntaje } </p>
                </div>
            </main>

            <footer className='container_logo_ruleta'>
                <img src={LogoRuleta} alt="logo ruleta" />
            </footer>
            
        </div>
    )
}

export default PuntajeScreen