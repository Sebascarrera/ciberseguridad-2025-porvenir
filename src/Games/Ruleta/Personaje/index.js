import { useState } from 'react'

import { Carousel } from 'react-responsive-carousel'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { selectAvatar } from '../Redux'

import Logo from '../../../assets/img/ciberseguridad-logo.png'
import LogoRuleta from '../../../assets/img/logo_ruleta.png'


import characterMan1 from '../../../assets/img/avatars/h1.png'
import characterMan2 from '../../../assets/img/avatars/h2.png'
import characterMan3 from '../../../assets/img/avatars/h3.png'

import characterWoman1 from '../../../assets/img/avatars/m1.png'
import characterWoman2 from '../../../assets/img/avatars/m2.png'
import characterWoman3 from '../../../assets/img/avatars/m3.png'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

import './styles.css'

const PersonajeScreen = () => {

    const dispatch = useDispatch()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const navigate = useNavigate()

    const characters  = [
		{ image: characterWoman1 },
		{ image: characterWoman2 },
		{ image: characterWoman3 },
		{ image: characterMan1 },
		{ image: characterMan2 },
		{ image: characterMan3 },
	]

	const onNext = () => {
		dispatch(selectAvatar(characters[selectedIndex]))
		navigate('/ruleta')
	}

    return (
        <div className='container_personaje'>

			<header className='container_logo'>
				<img src={Logo} alt="logo" />
			</header>
            <div className='titulo-personaje'>
				<p>Escoge tu personaje</p>
            </div>
            <div className="container-carousel">
              <Carousel
                selectedItem={ selectedIndex }
                onChange={ index =>  setSelectedIndex(index) }
                showStatus={false}
                showIndicators={false}
                showThumbs={true}
                emulateTouch>
                {
                  characters.map( (character, index) => (
                    <div key={index}>
                      <img style={{ maxWidth: 200 }} src={character.image} />
                    </div>
                  ))
                }
              </Carousel>
            </div>

			<div className='container_siguiente'>
				<div className='boton-enlace' onClick={onNext}>
					Siguiente
				</div>
			</div>
			<footer className='container_logo_ruleta'>
				<img src={LogoRuleta} alt="Logo ruleta" />
			</footer>
        </div>
    )
}

export default PersonajeScreen