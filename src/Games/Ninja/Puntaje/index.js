import { useEffect } from 'react'
import Logo from '../../../assets/img/ciberseguridad-logo-porvenir-blanco.png'

import { useNavigate } from 'react-router-dom'

import './styles.css'

const NinjaPuntaje = () => {

    const navigate = useNavigate()

    useEffect( () => {

        setTimeout( () => {
            navigate("/selector")
        }, 4000)

    }, [navigate])
    return (
        <div className="container_ninja">
            <header className="cont-logo">
                <img src={Logo} alt="focus-game-banboger" />
            </header>
            <section className="container_ninja_puntaje">
                <p className='texto-felicitaciones-ninja'>Tu puntaje ha sido: </p>
                <p className='texto-felicitaciones-ninja'>Tu tiempo ha sido: </p>
            </section>
        </div>
    )
}

export default NinjaPuntaje