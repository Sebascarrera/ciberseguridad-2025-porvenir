import { useEffect } from 'react'
import Logo from '../../../assets/img/ciberseguridad-logo-porvenir-blanco.png'
import LogoGrande from '../../../assets/img/focus/focus-game-logo-grande.png'

import { useNavigate } from 'react-router-dom'

import { saveScore, clearCurrentScore } from '../../../Redux/scores'

import './styles.css'
import { useDispatch, useSelector } from 'react-redux'

const FocusPuntaje = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const puntaje = useSelector( state => state.scores.current )
    const startTime = useSelector(state => state.scores.start_time)
    const endTime = useSelector(state => state.scores.end_time)

    useEffect( () => {

        dispatch(saveScore('focus'))

        setTimeout( () => {
            dispatch(clearCurrentScore())
            navigate("/selector")
        }, 4000)

    }, [navigate])
    const tiempo = Math.abs(endTime - startTime)
    const minutes = Math.floor(tiempo / 1000 / 60);
    const remainingSeconds = tiempo % 60;

    return (
        <div className="container_focus">

            <header className="header_focus">
                <img src={Logo} alt="focus-game-banboger" />
            </header>
            <section className="container_focus_puntaje">
                <div>
                    <p className='texto-puntaje-focus'>Tu puntaje ha sido: </p>
                    <p>{puntaje}</p>
                </div>

                <div>
                    <p>Tu tiempo ha sido: </p>
                    <p>{String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}</p>
                </div>
                
                
                
            </section>
            <footer className="footer_focus">
                <img src={LogoGrande} alt="logo-banco" />
            </footer>
        </div>
    )
}

export default FocusPuntaje