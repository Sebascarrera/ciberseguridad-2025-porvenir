import { useEffect } from 'react'
import Logo from '../../../assets/img/ciberseguridad-logo-porvenir-blanco.png'
import LogoGrande from '../../../assets/img/focus/focus-game-logo-grande.png'

import { useNavigate } from 'react-router-dom'

import './styles.css'

const FocusPuntaje = () => {

    const navigate = useNavigate()

    useEffect( () => {

        setTimeout( () => {
            navigate("/selector")
        }, 4000)

    }, [navigate])
    return (
        <div className="container_focus">

            <header className="header_focus">
                <img src={Logo} alt="focus-game-banboger" />
            </header>
            <section className="container_focus_puntaje">
                <p>Tu puntaje ha sido: </p>
                <p>Tu tiempo ha sido: </p>
            </section>
            <footer className="footer_focus">
                <img src={LogoGrande} alt="logo-banco" />
            </footer>
        </div>
    )
}

export default FocusPuntaje