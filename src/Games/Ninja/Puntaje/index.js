import { useEffect } from 'react'
import Logo from '../../../assets/img/ciberseguridad-logo-porvenir-blanco.png'

import { useNavigate } from 'react-router-dom'

import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentScore, saveScore } from '../../../Redux/scores'

const NinjaPuntaje = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const score = useSelector( state => state.scores.current )

    useEffect( () => {

        dispatch(saveScore('ninja'))

        setTimeout( () => {
            dispatch(clearCurrentScore())
            navigate("/selector")
        }, 4000)

    }, [navigate])
    
    return (
        <div className="container_ninja">
            <header className="cont-logo">
                <img src={Logo} alt="focus-game-banboger" />
            </header>
            <section className="container_ninja_puntaje">
                <div>
                    <p className='texto-felicitaciones-ninja'>Tu puntaje ha sido: </p>
                    <p>{score}</p>
                </div>
            </section>
        </div>
    )
}

export default NinjaPuntaje