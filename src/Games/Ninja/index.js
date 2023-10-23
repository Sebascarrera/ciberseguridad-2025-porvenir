import { useState, useEffect, useRef } from "react"

import { Stage, Layer, Image } from 'react-konva'

import { useRandomInterval } from './useRandomInterval'

import { useNavigate } from "react-router-dom"

import mainImage from '../../assets/img/ninja/Cipo-ninja.png'

import objectImage1 from '../../assets/img/ninja/troyano-1.png'
import objectImage2 from '../../assets/img/ninja/troyano-2.png'
import objectImage3 from '../../assets/img/ninja/troyano-3.png'
import objectImage4 from '../../assets/img/ninja/troyano-4.png'
import objectImage5 from '../../assets/img/ninja/troyano-5.png'
import objectImage6 from '../../assets/img/ninja/troyano-6.png'
import objectImage7 from '../../assets/img/ninja/troyano-7.png'
import objectImage8 from '../../assets/img/ninja/troyano.png'

import Logo from '../../assets/img/ciberseguridad-logo.png'

import "./styles.css"
import { useDispatch } from "react-redux"

import { 
    startGame as startGameScore,
    endGame as endGameScore,
    markScore
 } from "../../Redux/scores"


const Ninja = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const mainImageWidth = 100
    const mainImageHeight = 100

    const [mainObjectImage, setMainObjectImage] = useState(null)
    const [positionXMainObject, setPositionXMainObject] = useState(0)
    const animationFrameRef = useRef()

    const [totalPoints, setTotalPoints] = useState(0)
    const [seconds, setSeconds] = useState(60)
    const [intervalId, setIntervalId] = useState(null)

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
    }, [positionXMainObject])

    useEffect(() => {
        if (seconds === 0) {
            endGame()
        }
    }, [seconds]);

    const startTimer = () => {
        const id = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
    
        setIntervalId(id);
    }

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
    }

    const startGame = () => {
        console.log('starting game')
        startTimer()
        randomInterval.start()

        dispatch(startGameScore())

        // Start the animation loop
        animationFrameRef.current = requestAnimationFrame(updateObjectsPosition);

        // Clean up the animation frame when component unmounts
        return () => cancelAnimationFrame(animationFrameRef.current);
    }

    const endGame = () => {
        dispatch(endGameScore)
        randomInterval.cancel()
        cancelAnimationFrame(animationFrameRef.current);
        clearInterval(intervalId)

        navigate('/ninja/puntaje')
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
        const newObjects = currentObjects.filter(obj => obj.id !== object.id)
        dispatch(markScore(object.data.points))
        setCurrentObjects(newObjects)
        setTotalPoints( prev => prev + object.data.points)
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
            setPositionXMainObject(prev => validateXAxisMainObject(prev, prev - 20));
          } else if (event.key === 'ArrowRight') {
            setPositionXMainObject(prev => validateXAxisMainObject(prev, prev + 20));
          }
        };
      
        window.addEventListener('keydown', handleKeyDown);
      
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, [mainImageWidth]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <div className="container_ninja">
            <header className="cont-logo">
                <img src={Logo} alt="Logo" />
            </header>

            <div className="stats">
                <p>{String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}</p>
                <p>{totalPoints} Pts</p>
            </div>

            <div className="scene">
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
                                key={index}
                                x={item.x}
                                y={item.y}
                                image={item.data.image} />
                        ) }

                    </Layer>
                </Stage>
            </div>
            
        </div>
    )
}

export default Ninja