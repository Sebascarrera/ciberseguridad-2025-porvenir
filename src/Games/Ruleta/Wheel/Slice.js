import { useEffect, useRef } from 'react'
import { Wedge, Group, Layer, Stage, Image, Text } from 'react-konva'
import PropTypes from 'prop-types'
import Konva from 'konva'
import useImage from 'use-image'

const Slice = ({ image, radius, rotation, angle, color, scale }) => {

  const wedgeRef = useRef()

  const iconImageSize = 95

  const fixedScale = scale > 1 ? 1 : scale
  const imageOffsetX = 50 * fixedScale
  const imageOffsetY = 93 * fixedScale

  const radiusCenter = radius / 2
  const iconImageX = radiusCenter + imageOffsetX
  const iconImageY = radiusCenter - imageOffsetY

  const [imageElement] = useImage(image)

  useEffect( () => {
    if (wedgeRef) {
      wedgeRef.current.startRotation = wedgeRef.current.getRotation()
    }
  }, [wedgeRef])


  return (
    <Group
      rotation={ rotation }>

      <Wedge
        ref={ wedgeRef }
        radius={ radius }
        angle={ angle }
        fill={ color } />


      { imageElement && (
        <Image
          width = { iconImageSize * fixedScale }
          height = { iconImageSize * fixedScale }
          x={iconImageX}
          y={iconImageY}
          rotation={ (Math.PI + angle ) / 2}
          image={ imageElement } />
      )}
      
    </Group>
  )

}

export default Slice
