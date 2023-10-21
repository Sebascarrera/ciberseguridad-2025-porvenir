import { useState, useEffect, useRef } from "react"

import { Stage, Layer, Circle, Image } from 'react-konva'

import { useRandomInterval } from './useRandomInterval'

import mainImage from '../../assets/img/ninja/Cipo-ninja.png'


import objectImage1 from '../../assets/img/ninja/troyano-1.png'
import objectImage2 from '../../assets/img/ninja/troyano-2.png'
import objectImage3 from '../../assets/img/ninja/troyano-3.png'
import objectImage4 from '../../assets/img/ninja/troyano-4.png'
import objectImage5 from '../../assets/img/ninja/troyano-5.png'
import objectImage6 from '../../assets/img/ninja/troyano-6.png'
import objectImage7 from '../../assets/img/ninja/troyano-7.png'
import objectImage8 from '../../assets/img/ninja/troyano.png'

import "./styles.css"

const Ninja = () => {

    const mainImageWidth = 100
    const mainImageHeight = 100

    const [mainObjectImage, setMainObjectImage] = useState(null)
    const [positionXMainObject, setPositionXMainObject] = useState(0)
    const animationFrameRef = useRef()

    const delay = [1000, 3000];

    const createImageForObject = (src) => {
        let image = new window.Image()
        image.src = src
        return image
    }

    const objects = [
        {
            image: createImageForObject(objectImage1),
            points: 10,
        }, 
        {
            image: createImageForObject(objectImage2),
            points: 10,
        },
        {
            image: createImageForObject(objectImage3),
            points: 10,
        },
        {
            image: createImageForObject(objectImage4),
            points: 10,
        },
        {
            image: createImageForObject(objectImage5),
            points: 10,
        },
        {
            image: createImageForObject(objectImage6),
            points: 10,
        },
        {
            image: createImageForObject(objectImage7),
            points: 10,
        },
        {
            image: createImageForObject(objectImage8),
            points: 20,
        }
    ]

    const [currentObjects, setCurrentObjects] = useState([])

    const currentObjectsRef = useRef(currentObjects);
    const positionXMainObjectRef = useRef(positionXMainObject);

    useEffect(() => {
        currentObjectsRef.current = currentObjects; // Update ref when state changes
    }, [currentObjects]);


    useEffect(() => {
        positionXMainObjectRef.current = positionXMainObject; // Update ref when state changes
    }, [positionXMainObject]);

    const randomInterval = useRandomInterval( () => {
        generateRandomCollideObjects()
    }, ...delay)

    const validateXAxisMainObject = (prev, newValue) => {
        return newValue >= 0 && newValue <= (window.innerWidth - mainImageWidth )? newValue : prev
    } 

    const generateUniqueId = () => {
        const timestamp = Date.now().toString(36); // Convert current time to base36 string
        const randomStr = Math.random().toString(36).substring(2, 8); // Generate random string

        return `${timestamp}-${randomStr}`;
    }

    const prepareGame = () => {

        console.log('preparing game')

        setTimeout( () => {
            startGame()
        }, 3000)

        setTimeout( () => {
            endGame()
        }, 60000)
    }

    const startGame = () => {
        console.log('starting game')
        randomInterval.start()

        // Start the animation loop
        animationFrameRef.current = requestAnimationFrame(updateObjectsPosition);

        // Clean up the animation frame when component unmounts
        return () => cancelAnimationFrame(animationFrameRef.current);
    }

    const endGame = () => {
        console.log('ending game')
        randomInterval.cancel()
        cancelAnimationFrame(animationFrameRef.current);
    }

    const generateRandomCollideObjects = () => {
        const randomObject = objects[Math.floor(Math.random()*objects.length)]
        const randomX = Math.floor(Math.random() * ((window.innerWidth - 20) + 1))
        const newObject = {
            id: generateUniqueId(),
            x: randomX,
            y: -20,
            data: randomObject
        }

        setCurrentObjects([...currentObjects, newObject])
    }

    const checkCollisions = () => {

        const currentObjects = currentObjectsRef.current;
        const positionXMainObject = positionXMainObjectRef.current;
        

        currentObjects.forEach(object => {
            const circleX = object.x;
            const circleY = object.y;
            const circleRadius = 20; // Assuming the radius of the circles is 20
        
            const imageX = positionXMainObject;
            const imageY = window.innerHeight - mainImageHeight;
            const imageWidth = mainImageWidth;
            const imageHeight = mainImageHeight;
        
            const distanceX = Math.abs(circleX - (imageX + imageWidth / 2));
            const distanceY = Math.abs(circleY - (imageY + imageHeight / 2));
        
            if (distanceX > (imageWidth / 2 + circleRadius)) return false;
            if (distanceY > (imageHeight / 2 + circleRadius)) return false;
        
            if (distanceX <= (imageWidth / 2) || distanceY <= (imageHeight / 2)) {
                removeDetectedObject(object)
            }
        })
    }

    const removeDetectedObject = (object) => {

        const currentObjects = currentObjectsRef.current;
        const newObjects = currentObjects.filter(obj => obj.id !== object.id);
        setCurrentObjects(newObjects)

    }

    const updateObjectsPosition = () => {
        
        setCurrentObjects(prevObjects => 
            prevObjects.map(object => ({ ...object, y: object.y + 5 }))
        );


        checkCollisions()

        animationFrameRef.current = requestAnimationFrame(updateObjectsPosition);
    };    

    useEffect(() => {
        const image = new window.Image()
        image.src= mainImage
        image.onload = () => {
            setPositionXMainObject((window.innerWidth/2) - (mainImageWidth / 2))
            setMainObjectImage(image)
        }

        prepareGame()
    }, [])

    useEffect(() => {
        const handleOrientation = (event) => {
            setPositionXMainObject( prev =>  validateXAxisMainObject(prev, prev + event.gamma) );
        };
    
        window.addEventListener('deviceorientation', handleOrientation);
    
        return () => {
          window.removeEventListener('deviceorientation', handleOrientation);
        };
      }, [mainImageWidth]);
    

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'ArrowLeft') {
            setPositionXMainObject(prev => validateXAxisMainObject(prev, prev - 10));
          } else if (event.key === 'ArrowRight') {
            setPositionXMainObject(prev => validateXAxisMainObject(prev, prev + 10));
          }
        };
      
        window.addEventListener('keydown', handleKeyDown);
      
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, [mainImageWidth]);

    return (
        <div>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    { mainObjectImage && (
                    <Image  
                        height={100}
                        width={100}
                        x={positionXMainObject}
                        y={window.innerHeight - mainImageHeight}
                        image={mainObjectImage}
                        />
                    )}

                    { currentObjects.map( (item, index) =>
                        <Image
                            height={55}
                            width={55}
                            key={index}
                            x={item.x}
                            y={item.y}
                            image={item.data.image} />
                    ) }

                </Layer>
            </Stage>
        </div>
    )
}

export default Ninja