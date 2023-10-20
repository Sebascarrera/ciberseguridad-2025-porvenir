import { useState } from 'react'

import { Carousel } from 'react-responsive-carousel'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { selectAvatar } from './Redux'

import characterMan1 from '../../assets/img/avatars/h1.png'
import characterMan2 from '../../assets/img/avatars/h2.png'
import characterMan3 from '../../assets/img/avatars/h3.png'

import characterWoman1 from '../../assets/img/avatars/m1.png'
import characterWoman2 from '../../assets/img/avatars/m2.png'
import characterWoman3 from '../../assets/img/avatars/m3.png'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

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

    return (
        <div>
            <div className="container-carousel">
              <Carousel
                selectedItem={ selectedIndex }
                onChange={ index =>  setSelectedIndex(index) }
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                emulateTouch
                centerMode>
                {
                  characters.map( (character, index) => (
                    <div 
                      key={index}
                      onClick={ () => {
                        dispatch(selectAvatar(characters[index]))
                        navigate('/ruleta')
                      }}>
                      <img style={{ maxWidth: 200 }} src={character.image} />
                    </div>
                  ))
                }
              </Carousel>
            </div>
        </div>
    )
}

export default PersonajeScreen