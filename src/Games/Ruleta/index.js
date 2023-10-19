import { useEffect, useRef, useState } from "react"

import Wheel from "./Wheel/Wheel"

import { useDispatch, useSelector } from "react-redux"

import { fetchSlices } from "./Redux/slice"

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
            <Wheel 
                width={width * 0.6}
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