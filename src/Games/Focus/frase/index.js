import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Logo from '../../../assets/img/ciberseguridad-logo-porvenir-blanco.png'
import LogoGrande from '../../../assets/img/focus/focus-game-logo-grande.png'

import './styles.css'

const FocusFrase = () => {

    const navigate = useNavigate()

    useEffect( () => {
        setTimeout( () => {
            navigate('/focus')
        }, 4000)
    }, [navigate])

    return (
        <div className='container_focus'>
            <header className="header_focus">
                <img src={Logo} alt="focus-game-banboger" />
            </header>
            <section className="frase">
                <div className='frase-guia-juego-focus'>
                    <p className='texto-frase-focus'>Encuentra las</p><p className='texto-frase-focus'>parejas en el menor tiempo posible</p>
                </div>
            </section>
            <div className="loader"></div>
            <footer className="footer_focus">
                <img src={LogoGrande} alt="logo-banco" />
            </footer>
        </div>
    )
}

export default FocusFrase