import { useEffect, useRef, useState } from "react"

import Wheel from "./Wheel/Wheel"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchSlices } from "./Redux"

import ProfileCard from './ProfileCard'

import '../Ruleta/App.css'

import logo from '../../assets/img/ciberseguridad-logo.png'; // Importa la imagen del logo



const Ruleta = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const slices = useSelector( state => state.ruleta.slices)
    const status = useSelector(state => state.ruleta.status)
    const avatar = useSelector( state => state.ruleta.avatar)
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
        if(status === 'idle') {
            dispatch(fetchSlices())
        }
    }, [status, dispatch])

    return (
        <div>

            { status === 'loading' && (
                <div>
                    Cargando
                </div>
            )}

            <div className="cont-logo">
                <img src={logo} alt="Logo Ciberseguridad Porvenir" />
            </div>

            <div>
                <ProfileCard name={"testing"} character={avatar} />
            </div>

            <div ref={wheelRef}>
                
                <Wheel 
                    width={width * 0.4}
                    friction={0.4}
                    slices={slices} 
                    onSelectedWinnerSlice={ index => {
                        navigate(`/ruleta/preguntas?slice=${index}`)
                    }} />

            </div>

            
        </div>
    )
}

export default Ruleta