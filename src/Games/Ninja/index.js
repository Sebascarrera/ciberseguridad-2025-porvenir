import { useState, useEffect, useRef } from "react"

import { Stage, Layer, Circle, Image } from 'react-konva'

import { useRandomInterval } from './useRandomInterval'

import mainImage from '../../assets/img/ninja/main.png'



const Ninja = () => {

    const [mainObjectImage, setMainObjectImage] = useState(null)
    const [mainImageHeight, setMainImageHeight] = useState(0)
    const [mainImageWidth, setMainImageWidth] = useState(0)
    const [positionXMainObject, setPositionXMainObject] = useState(0)
    const animationFrameRef = useRef()

    const delay = [1000, 3000];

    const objects = ['red', 'green', 'blue', 'yellow',  'purple']

    const [currentObjects, setCurrentObjects] = useState([])

    const currentObjectsRef = useRef(currentObjects);
    const positionXMainObjectRef = useRef(positionXMainObject);
    const mainImageWidthRef = useRef(mainImageWidth);
    const mainImageHeightRef = useRef(mainImageHeight);

    useEffect(() => {
        currentObjectsRef.current = currentObjects; // Update ref when state changes
    }, [currentObjects]);


    useEffect(() => {
        positionXMainObjectRef.current = positionXMainObject; // Update ref when state changes
    }, [positionXMainObject]);

    useEffect(() => {
        mainImageWidthRef.current = mainImageWidth; // Update ref when state changes
    }, [mainImageWidth]);


    useEffect(() => {
        mainImageHeightRef.current = mainImageHeight; // Update ref when state changes
    }, [mainImageHeight]);

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
        const mainImageWidth = mainImageWidthRef.current;
        const mainImageHeight = mainImageHeightRef.current;

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
            setMainImageHeight(image.height)
            setMainImageWidth(image.width)
            setPositionXMainObject((window.innerWidth/2) - (image.width / 2))
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
                        x={positionXMainObject}
                        y={window.innerHeight - mainImageHeight}
                        image={mainObjectImage}
                        />
                    )}

                    { currentObjects.map( (item, index) =>
                        <Circle
                            key={index}
                            x={item.x}
                            y={item.y}
                            radius={20}
                            fill={item.data} />
                    ) }

                </Layer>
            </Stage>
        </div>
    )
}

export default Ninja