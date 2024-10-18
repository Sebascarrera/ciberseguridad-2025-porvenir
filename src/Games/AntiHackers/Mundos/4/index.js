import React, { useState, useEffect, useRef } from "react";
import '../styles.css'

import { useNavigate } from "react-router-dom";
import { Stage, Layer, Image } from "react-konva";

import Background from '../../../../assets/img/img-antihackers/mundo4-privacidad/background-mundo4.png';

import Biometrico from '../../../../assets/img/img-antihackers/mundo4-privacidad/biometrico.png';
import Consentimiento from '../../../../assets/img/img-antihackers/mundo4-privacidad/consentimiento.png';
import Habeas from '../../../../assets/img/img-antihackers/mundo4-privacidad/habeas-data.png';
import No10 from '../../../../assets/img/img-antihackers/mundo4-privacidad/no-10.png';
import No11 from '../../../../assets/img/img-antihackers/mundo4-privacidad/no-11.png';
import No12 from '../../../../assets/img/img-antihackers/mundo4-privacidad/no-12.png';

import MatchBiometrico from '../../../../assets/img/img-antihackers/mundo4-privacidad/biometrico-match.png';
import MatchConsentimiento from '../../../../assets/img/img-antihackers/mundo4-privacidad/consentimiento-match.png';
import MatchHabeas from '../../../../assets/img/img-antihackers/mundo4-privacidad/habeas-data-match.png';

import useImage from "use-image";

import { useDispatch, useSelector } from "react-redux";

import { increaseMundo4, validateTotal } from "../../Redux";
import { markScore } from "../../../../Redux/scores";

const AntiHacker = () => {

    const dispatch = useDispatch();

    const isMobile = () => {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      };

    const isFinished = useSelector( state => state.antihackers.finished);

    const [stageSize, setStageSize] = useState({ width: 600, height: 600 });
    const [scale, setScale] = useState(1);

    const matchRadius = 100;

    const navigate = useNavigate();

    const [backgroundImage] = useImage(Background);

    const [biometricoImage] = useImage(Biometrico);
    const [consentimientoImage] = useImage(Consentimiento);
    const [habeasImage] = useImage(Habeas);
    const [no10Image] = useImage(No10);
    const [no11Image] = useImage(No11);
    const [no12Image] = useImage(No12);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [match, setMatch] = useState(null);

    const [score, setScore] = useState(0);
    const [originalPositions, setOriginalPositions] = useState({}); // Almacenar posiciones originales

    const mundo4Times = useSelector( state => state.antihackers.mundo4);

    const handleDragStart = (e) => {
        // Guardar la posición original antes de comenzar a arrastrar
        const id = e.target.attrs.id; // Asumiendo que cada imagen tiene un id único
        setOriginalPositions((prev) => ({
            ...prev,
            [id]: e.target.position(),
        }));
    };

    const handleDragEnd = (e) => {
        const radius = matchRadius * scale;
        const { x, y } = e.target.position();
        const circleX = stageSize.width / 2 - (radius/ 2);
        const circleY = stageSize.height / 2 - (radius / 2);

        const distance = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);
        const metadata = e.target.attrs.metadata;


        if (distance < radius && metadata.isMatch) {
            setScore((prevScore) => prevScore + 10);
            dispatch(markScore(10));
            setMatch(metadata);
            setIsModalOpen(true);
            console.log("¡Imagen colocada correctamente!");
            e.target.position({ x: circleX, y: circleY });
        } else {
            dispatch(increaseMundo4());
            dispatch(validateTotal());
            const id = e.target.attrs.id;
            console.log("Coloca la imagen dentro del círculo.");
            const originalPosition = originalPositions[id];
            if (originalPosition) {
                e.target.position(originalPosition); // Volver a la posición original
            }
        }
    };

    // Maneja el cambio de tamaño de la ventana
    useEffect(() => {
        const handleSize = () => {

            if (!isMobile()) return;

            const newWidth = 320;
            setStageSize({ width: newWidth, height: newWidth });

            // Ajusta la escala según el tamaño de la ventana
            const newScale = Math.min(newWidth / 600, newWidth / 600); // Ajusta 906 al tamaño original de tu Stage
            setScale(newScale);
            console.log(newWidth)
        };

        handleSize(); // Llamada inicial para establecer el tamaño correcto

    }, []);

    useEffect( () => {
        if (isFinished) return;
        if(mundo4Times >= 3) {
            navigate(-1)
        }
    }, [isFinished, mundo4Times])

    useEffect( () => {
        if(isFinished) {
            navigate('/antihackers/puntaje');
        }
    }, [navigate, isFinished])

    return (
        <div className="AntiHacker_Mundo_Container">

            <div className="left">
                <h1>Mundo 4</h1>
                <h2>Privacidad</h2>
                <h3>Arrastra las imágenes que hagan Match con el personaje central Anti Hackers para que sumes la mayor cantidad de puntos.</h3>
            </div>  

            <div>
                <Stage 
                    pixelRatio={1}
                    width={stageSize.width} 
                    height={stageSize.height} >
                    <Layer>
                        <Image 
                            width={stageSize.width}
                            height={stageSize.height}
                            image={backgroundImage} />
          
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={55 * scale }
                            y={55 * scale }
                            draggable 
                            image={biometricoImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Dato Biométrico", description: "Son de categoría sensible y corresponden a una característica física única de las personas que se utilizas para identificarlas. Esto puede incluir huellas dactilares, reconocimiento facial, iris, entre otros. ¡Recuerda implementar medidas de seguridad adecuadas para proteger los datos durante su ciclo de vida!", image: MatchBiometrico }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={435 * scale}
                            y={55 * scale}
                            draggable 
                            image={consentimientoImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Consentimiento", description: "Es el permiso que tú, como dueño del dato, das para que una persona o empresa los use. Este permiso debe ser libre, Informado y expreso. Conoce nuestra política de tratamiento de datos personales, publicada en la pagina web de Porvenir.", image: MatchConsentimiento  }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={25 * scale}
                            y={255 * scale}
                            draggable 
                            image={habeasImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Habeas Data", description: "Es el derecho que tienen las personas a Conocer, Actualizar y Corregir la información personal que tienen los Responsables en sus bases de datos.", image: MatchHabeas }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={465 * scale}
                            y={255 * scale}
                            draggable 
                            image={no10Image}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: false }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={55 * scale}
                            y={455 * scale}
                            draggable 
                            image={no11Image}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: false }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={455 * scale}
                            y={455 * scale}
                            draggable 
                            image={no12Image}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: false }} />
                    </Layer>
                </Stage>
            </div>

            {isModalOpen && match && (
                <div className="modal">
                    <div className="modal-content">
                        <div>
                            <div>
                                <h2>{match.name}</h2>
                                <p>
                                    {match.description}
                                </p>
                            </div>
                            <div>
                               <img src={match.image} />     
                            </div>

                        </div>
                        <span className="close" onClick={() => {
                            dispatch(increaseMundo4());
                            setIsModalOpen(false)
                            dispatch(validateTotal());
                        }}>Cerrar</span>
                        
                    </div>
                </div>
            )}

        </div>
    );
}

export default AntiHacker