import { useState } from 'react'

import { Carousel } from 'react-responsive-carousel'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { selectAvatar } from './Redux'

import characterMan1 from '../../assets/img/avatars/avatar-6.png'
import characterMan2 from '../../assets/img/avatars/avatar-2.png'
import characterMan3 from '../../assets/img/avatars/avatar-3.png'
import characterMan4 from '../../assets/img/avatars/avatar-8.png'

import characterWoman1 from '../../assets/img/avatars/avatar-4.png'
import characterWoman2 from '../../assets/img/avatars/avatar-5.png'
import characterWoman3 from '../../assets/img/avatars/avatar-1.png'
import characterWoman4 from '../../assets/img/avatars/avatar-7.png'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

const PersonajeScreen = () => {

    const dispatch = useDispatch()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const navigate = useNavigate()

    const characters  = [
        { image: characterWoman1 },
        { image: characterWoman2 },
        { image: characterWoman3 },
        { image: characterWoman4 },
        { image: characterMan1 },
        { image: characterMan2 },
        { image: characterMan3 },
        { image: characterMan4 },
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
                      <img src={character.image} />
                    </div>
                  ))
                }
              </Carousel>
            </div>
        </div>
    )
}

export default PersonajeScreen