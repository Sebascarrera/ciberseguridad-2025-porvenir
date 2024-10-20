import React, { useState, useEffect, useRef } from "react";
import '../styles.css'

import { useNavigate } from "react-router-dom";
import { Stage, Layer, Image } from "react-konva";

import Background from '../../../../assets/img/img-antihackers/mundo1-seguridad/background-mundo1.png';

import Circular from '../../../../assets/img/img-antihackers/mundo1-seguridad/circular-normativa.png';
import Cumplimiento from '../../../../assets/img/img-antihackers/mundo1-seguridad/cumplimiento-normativo.png';
import Seguridad from '../../../../assets/img/img-antihackers/mundo1-seguridad/seguridad-informacion.png';
import No1 from '../../../../assets/img/img-antihackers/mundo1-seguridad/no-1.png';
import No2 from '../../../../assets/img/img-antihackers/mundo1-seguridad/no-2.png';
import No3 from '../../../../assets/img/img-antihackers/mundo1-seguridad/no-3.png';

import MatchCumplimiento from '../../../../assets/img/img-antihackers/mundo1-seguridad/cumplimiento-match.png';
import MatchCircular from '../../../../assets/img/img-antihackers/mundo1-seguridad/circular-match.png';
import MatchSeguridad from '../../../../assets/img/img-antihackers/mundo1-seguridad/seguridad-match.png';

import useImage from "use-image";

import { useDispatch, useSelector } from "react-redux";

import { increaseMundo1, validateTotal } from "../../Redux";
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

    const [circularImage] = useImage(Circular);
    const [cumplimientoImage] = useImage(Cumplimiento);
    const [seguridadImage] = useImage(Seguridad);
    const [no1Image] = useImage(No1);
    const [no2Image] = useImage(No2);
    const [no3Image] = useImage(No3);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [match, setMatch] = useState(null);

    const [score, setScore] = useState(0);
    const [originalPositions, setOriginalPositions] = useState({}); // Almacenar posiciones originales

    const mundo1Times = useSelector( state => state.antihackers.mundo1);

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
            dispatch(increaseMundo1());
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
        if(mundo1Times >= 3) {
            navigate(-1)
        }
    }, [isFinished, mundo1Times])

    useEffect( () => {
        if(isFinished) {
            navigate('/antihackers/puntaje');
        }
    }, [navigate, isFinished])

    return (
        <div className="AntiHacker_Mundo_Container">

            <div className="left">
                <h1>Mundo 1 Seguridad</h1>
                <h3>¿Cómo jugar?</h3>
                <h4>Observa el personaje central: En el centro de la pantalla encontrarás un personaje de AntiHackers.</h4>
                <h4>Tu objetivo es identificar las imágenes que tienen relación con este personaje.</h4>
                <h4>Arrastra las imágenes correctas: Desliza y arrastra las imágenes que correspondan al personaje central. Cada imagen correcta te sumará puntos, ¡así que elige sabiamente!</h4>
                <h4>Cuidado con las imágenes incorrectas: Si arrastras una imagen que no hace match con el personaje central, perderás una vida. Recuerda que solo tienes dos vidas por cada mundo, ¡no las desperdicies!</h4>
            </div>  

            <div className="stage-container">
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
                            image={circularImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Circular normativa 090", description: "La circular normativa 090 define las políticas y normas en materia de Seguridad de la Información y Ciberseguridad los cuales debe ser aplicados por todos los colaboradores de Porvenir, contratistas y terceras partes que presten servicios o tengan cualquier vínculo con los Activos de Información de la Compañía, con el fin de conseguir un adecuado nivel de protección de la información. ¡Consulta la circular normativa 090 en Isolución!", image: MatchCircular }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={435 * scale}
                            y={55 * scale}
                            draggable 
                            image={cumplimientoImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Cumplimiento Normativo", description: "Estamos comprometidos con el cumplimiento continúo de las normativas internas y externas de Seguridad y Ciberseguridad expedidas por diferentes entes de control como la Superintendencia Financiera de Colombia, La SIC, entre otros.  Adoptando los mejores estándares como ISO/IEC 27001:2022 y Marco de referencia NIST. ¡Consulta nuestras políticas de seguridad en Isolución!", image: MatchCumplimiento  }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={25 * scale}
                            y={255 * scale}
                            draggable 
                            image={seguridadImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Seguridad de la Información y Ciberseguridad", description: "Como segunda línea coadyuvamos a la supervisión de los riesgos, controles y cumplimiento establecidos por la Alta Dirección entorno a la seguridad. Por ejemplo, definimos el Manual, Políticas y procedimientos, fomentamos la cultura de seguridad de la información, apoyamos la implementación  y monitoreo de herramientas de seguridad  y gestión de accesos para mantener nuestros entornos físicos  y digitales más seguros.", image: MatchSeguridad }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={465 * scale}
                            y={255 * scale}
                            draggable 
                            image={no1Image}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: false }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={55 * scale}
                            y={455 * scale}
                            draggable 
                            image={no2Image}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: false }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={455 * scale}
                            y={455 * scale}
                            draggable 
                            image={no3Image}
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
                                <h2>{match.name}</h2>
                                <p>
                                    {match.description}
                                </p>
                            </div>
                            <div>
                               <img src={match.image} />     
                            </div>
                            <span className="close" onClick={() => {
                            setIsModalOpen(false)
                            dispatch(increaseMundo1());
                            dispatch(validateTotal());
                        }}>Cerrar</span>
                        <div>
                    </div>
                        
                        
                    </div>
                </div>
            )}

        </div>
    );
}

export default AntiHacker