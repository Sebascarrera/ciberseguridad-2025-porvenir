import { useEffect, useRef, useState } from "react"

import Wheel from "./Wheel/Wheel"

import { useDispatch, useSelector } from "react-redux"

import { fetchSlices } from "./Redux/slice"

import '../Ruleta/App.css'

import logo from '/Users/mac/Documents/porvenir/repo-web-ciberseguridad/ciberseguridad-porvenir-web/src/assets/img/ciberseguridad-logo.png'; // Importa la imagen del logo



const Ruleta = () => {

    const dispatch = useDispatch()
    const slices = useSelector( state => state.ruleta_slices.slices)
    const status = useSelector(state => state.ruleta_slices.status)
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

            <div ref={wheelRef}>
                <div className="cont-logo">
                <img src={logo} alt="Logo Ciberseguridad Porvenir" /> {/* Agrega el logo aquí */}
                </div>
            <Wheel 
                width={width * 0.4}
                friction={0.4}
                slices={slices} 
                onSelectedWinnerSlice={ index => {
                    console.log(index)
                }} />

            </div>

            
        </div>
    )
}

export default Ruleta