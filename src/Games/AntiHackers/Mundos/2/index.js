import React, { useState, useEffect, useRef } from "react";
import '../styles.css'

import { useNavigate } from "react-router-dom";
import { Stage, Layer, Image } from "react-konva";

import Background from '../../../../assets/img/img-antihackers/mundo2-antifraude/background-mundo2.png';

import Conexion from '../../../../assets/img/img-antihackers/mundo2-antifraude/conexion-responsable.png';
import fraudeExterno from '../../../../assets/img/img-antihackers/mundo2-antifraude/fraude-externo.png';
import fraudeInterno from '../../../../assets/img/img-antihackers/mundo2-antifraude/fraude-interno.png';
import No4 from '../../../../assets/img/img-antihackers/mundo2-antifraude/no-4.png';
import No5 from '../../../../assets/img/img-antihackers/mundo2-antifraude/no-5.png';
import No6 from '../../../../assets/img/img-antihackers/mundo2-antifraude/no-6.png';

import MatchConexion from '../../../../assets/img/img-antihackers/mundo2-antifraude/conexion-match.png';
import MatchFraudeExterno from '../../../../assets/img/img-antihackers/mundo2-antifraude/fraude-externo-match.png';
import MatchFraudeInterno from '../../../../assets/img/img-antihackers/mundo2-antifraude/fraude-interno-match.png';

import useImage from "use-image";

import { useDispatch, useSelector } from "react-redux";

import { increaseMundo2, validateTotal } from "../../Redux";
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

    const [conexionImage] = useImage(Conexion);
    const [fraudeExternoImage] = useImage(fraudeExterno);
    const [fraudeInternoImage] = useImage(fraudeInterno);
    const [no4Image] = useImage(No4);
    const [no5Image] = useImage(No5);
    const [no6Image] = useImage(No6);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [match, setMatch] = useState(null);

    const [score, setScore] = useState(0);
    const [originalPositions, setOriginalPositions] = useState({}); // Almacenar posiciones originales

    const mundo2Times = useSelector( state => state.antihackers.mundo2);

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
            e.target.position({ x: circleX, y: circleY });
        } else {
            dispatch(increaseMundo2());
            dispatch(validateTotal());
            const id = e.target.attrs.id;
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
        if(mundo2Times >= 3) {
            navigate(-1)
        }
    }, [isFinished, mundo2Times])

    useEffect( () => {
        if(isFinished) {
            navigate('/antihackers/puntaje');
        }
    }, [navigate, isFinished])

    return (
        <div className="AntiHacker_Mundo_Container">

            <div className="left">
                <h1>Mundo 2</h1>
                <h2>Antifraude</h2>
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
                            image={conexionImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Conexión Responsable", description: "Recuerda conectarte a redes wifi seguras, evita utilizar tu dispositivo en sitios públicos para realizar transacciones, cuando ingreses a una página web verifica que la URL sea legítima, que contenga un certificado SSL valido y el protocolo https, asegúrate que tu equipo cuenta con herramientas de seguridad y software de antivirus, únicamente debes descargar aplicaciones en tu dispositivo directamente desde tiendas oficiales.", image: MatchConexion }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={435 * scale}
                            y={55 * scale}
                            draggable 
                            image={fraudeExternoImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Fraude Externo", description: "Los fraudes conocidos como externos son aquellos actos realizados por personas externas ajenas a Porvenir que buscan defraudar, apropiarse indebidamente de activos, incumplir normas o leyes y/o hacer uso de su buen nombre para obtener ganancias ilícitas. En Porvenir contamos con un área de Gestión de Riesgos de Fraude Externo adscritos a la Gerencia de Riesgos de Negocio con el objetivo de implementar actividades y elementos para prevenir, investigar, detectar y mitigar riesgos relacionados con prácticas transaccionales fraudulentas de origen externo. ¡Recuerda reportar cualquier operación sospechosa de carácter externo al buzón fraudeexterno@porvenir.com.co !", image: MatchFraudeExterno }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={25 * scale}
                            y={255 * scale}
                            draggable 
                            image={fraudeInternoImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Fraude Interno", description: "Los fraudes denominados internos son aquellos organizados por una o varias personas dentro de una compañía, con el fin de obtener un beneficio propio. En Porvenir contamos con la Gerencia de Auditoria quienes se encargan de realizar los procesos de investigación correspondiente.", image: MatchFraudeInterno }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={465 * scale}
                            y={255 * scale}
                            draggable
                            image={no4Image}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: false }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={55 * scale}
                            y={455 * scale}
                            draggable 
                            image={no5Image}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: false }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={455 * scale}
                            y={455 * scale}
                            draggable 
                            image={no6Image}
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
                            dispatch(increaseMundo2());
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