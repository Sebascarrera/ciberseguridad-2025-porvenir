import { useEffect, useRef, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchSlices } from "./Redux"

import ProfileCard from './Components/ProfileCard'

import './styles.css'

import Logo from '../../assets/img/ciberseguridad-logo.png'
import LogoRuleta from '../../assets/img/logo_ruleta.png'

const Ruleta = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const slices = useSelector( state => state.ruleta.slices)
    const status = useSelector(state => state.ruleta.status)
    const avatar = useSelector( state => state.ruleta.avatar)
    const user = useSelector( state => state.user.user )
    const [width, setWidth] = useState(0)

    const wheelRef = useRef(null)

    useEffect(() => {
        setWidth(wheelRef.current.offsetWidth)
      }, [wheelRef]);

    useEffect(() => {
        function handleResize() {
          if (wheelRef.current) {
            setWidth(wheelRef.current.offsetWidth)
          }
        }
        window.addEventListener('resize', handleResize)
      })

    useEffect( () => {
        dispatch(fetchSlices())
    }, [dispatch])


    return (
        <div className="container-screen-ruleta">

            { status === 'loading' && (
                <div>
                    Cargando
                </div>
            )}

            <header className="cont-logo">
                <img src={Logo} alt="Logo Ciberseguridad Porvenir" />
            </header>



            <div className='titulo-gira-ruleta'>
				<p className="titulo-gira-ruleta">Haz click sostenido y gira la Ruleta</p>
            </div>

            <div className="cont-wheel" >
                <div className="center-wheel" ref={wheelRef}>
                    {/* <Wheel 
                        width={width * 0.8} 
                        friction={0.4}
                        slices={slices} 
                        onSelectedWinnerSlice={ index => {
                            navigate(`/ruleta/preguntas?slice=${index}`)
                        }} /> */}
                </div>
            </div>
{/* 
            <footer className="cont-logo-ruleta">
				<img src={LogoRuleta} alt="Logo ruleta" />
			</footer> */}
            
        </div>
    )
}

export default Ruleta