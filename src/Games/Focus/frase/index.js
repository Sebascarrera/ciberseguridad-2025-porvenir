import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Logo from '../../../assets/img/focus/focus-game-logo.png'
import Frase from '../../../assets/img/focus/frase-juego-focus-porvenir.png'
import LogoGrande from '../../../assets/img/focus/focus-game-logo-grande.png'

import './styles.css'

const FocusFrase = () => {

    const navigate = useNavigate()

    useEffect( () => {
        setTimeout( () => {
            navigate('/focus')
        }, 3000)
    }, [navigate])

    return (
        <div className='container_focus'>
            <header className="header_focus">
                <img src={Logo} alt="focus-game-banboger" />
            </header>
            <section className="frase">
                <img src={Frase} alt="" />
            </section>
            <div className="loader"></div>
            <footer className="footer_focus">
                <img src={LogoGrande} alt="logo-banco" />
            </footer>
        </div>
    )
}

export default FocusFrase