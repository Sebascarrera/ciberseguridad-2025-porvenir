import { useDispatch, useSelector } from 'react-redux'

import Logo from '../../../assets/img/ciberseguridad-logo.png'
import LogoRuleta from '../../../assets/img/logo_ruleta.png'

import './styles.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { saveScore, clearCurrentScore } from '../../../Redux/scores'

const PuntajeScreen = () => {

    const avatar = useSelector( state => state.ruleta.avatar )
    const puntaje = useSelector( state => state.scores.current )
    const status = useSelector(state => state.scores.status)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect( () => {
        setTimeout( () => {
            dispatch(clearCurrentScore())
            navigate('/selector')
        }, 4000)
    }, [status])

    useEffect( () => {
        dispatch(saveScore('jackpot'))
    }, [dispatch])

    return (
        <div className='container_screen_ruleta_puntaje'>

            <header className='container_logo'>
                <img src={Logo} alt="logo" />
            </header>

            <main>
                { avatar && avatar.image && (
                    <div className='container-personaje-felicitaciones'>
                        <img src={avatar.image} alt="avatar" />
                    </div>
                )}

                <div className='container_ruleta_puntaje'>
                    <p className='texto-felicitaciones-ruleta'>Felicitaciones</p>
                    <p className='texto-felicitaciones-ruleta'>Tu puntaje es { puntaje } </p>
                </div>
            </main>

            <footer className='container_logo_ruleta'>
                <img src={LogoRuleta} alt="logo ruleta" />
            </footer>
            
        </div>
    )
}

export default PuntajeScreen