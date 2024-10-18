import React, { useState, useEffect, useRef } from "react";
import '../styles.css'

import { useNavigate } from "react-router-dom";
import { Stage, Layer, Image } from "react-konva";

import Background from '../../../../assets/img/img-antihackers/mundo3-ciberataques/background-mundo3.png';

import Vulnerabilidades from '../../../../assets/img/img-antihackers/mundo3-ciberataques/vulnerabilidades.png';
import Control from '../../../../assets/img/img-antihackers/mundo3-ciberataques/control-nube-ciberseguridad.png';
import Ciberataques from '../../../../assets/img/img-antihackers/mundo3-ciberataques/ciberataques.png';
import No7 from '../../../../assets/img/img-antihackers/mundo3-ciberataques/no-7.png';
import No8 from '../../../../assets/img/img-antihackers/mundo3-ciberataques/no-8.png';
import No9 from '../../../../assets/img/img-antihackers/mundo3-ciberataques/no-9.png';

import MatchVulnerabilidades from '../../../../assets/img/img-antihackers/mundo3-ciberataques/vulnerabilidades-match.png';
import MatchControl from '../../../../assets/img/img-antihackers/mundo3-ciberataques/control-nube-match.png';
import MatchCiberataque from '../../../../assets/img/img-antihackers/mundo3-ciberataques/ciberataques-match.png';

import useImage from "use-image";

import { useDispatch, useSelector } from "react-redux";

import { increaseMundo3, validateTotal } from "../../Redux";
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

    const [vulnerabilidadesImage] = useImage(Vulnerabilidades);
    const [controlImage] = useImage(Control);
    const [ciberataquesImage] = useImage(Ciberataques);
    const [no7Image] = useImage(No7);
    const [no8Image] = useImage(No8);
    const [no9Image] = useImage(No9);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [match, setMatch] = useState(null);

    const [score, setScore] = useState(0);
    const [originalPositions, setOriginalPositions] = useState({}); // Almacenar posiciones originales

    const mundo3Times = useSelector( state => state.antihackers.mundo3);

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
            dispatch(increaseMundo3());
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
        if(mundo3Times >= 3) {
            navigate(-1)
        }
    }, [isFinished, mundo3Times])

    useEffect( () => {
        if(isFinished) {
            navigate('/antihackers/puntaje');
        }
    }, [navigate, isFinished])

    return (
        <div className="AntiHacker_Mundo_Container">

            <div className="left">
                <h1>Mundo 3</h1>
                <h2>Ciberataques</h2>
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
                            image={vulnerabilidadesImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Vulnerabilidades", description: "Son puntos débiles de seguridad en un sistema que pueden ser aprovechados por Cibercriminales para hacer daño o robar información. ¡Recuerda que estas deben ser cerradas y mitigadas en el menor tiempo posible con el apoyo de los equipos de Seguridad de la Información y Ciberseguridad, Seguridad Informática y comunicaciones y Calidad de Software!.", image: MatchVulnerabilidades }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={435 * scale}
                            y={55 * scale}
                            draggable 
                            image={controlImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Controles de seguridad en nube", description: "Son necesarios para proteger la  confidencialidad, integridad, disponibilidad y privacidad, sin comprometer la flexibilidad e innovación que busca Porvenir al migrar: Aplicaciones core de negocio, plataformas, bases de datos , redes, entre otros en estos entornos.", image: MatchControl }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={25 * scale}
                            y={255 * scale}
                            draggable 
                            image={ciberataquesImage}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: true, name: "Ciberataques", description: "Los ciberataques pueden iniciarse mediante la explotación de una vulnerabilidad en un servicio expuesto públicamente o interno, engañando a un colaborador para que abra un archivo adjunto infeccioso o incluso provocando la instalación de programas a través de visitas inocentes al sitio web. ¡ Participa activamente en las estrategias de cultura y sensibilización de Ciberseguridad CiPo!", image: MatchCiberataque }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={465 * scale}
                            y={255 * scale}
                            draggable 
                            image={no7Image}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: false }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={55 * scale}
                            y={455 * scale}
                            draggable 
                            image={no8Image}
                            onDragStart={handleDragStart} 
                            onDragEnd={handleDragEnd}
                            metadata={{ isMatch: false }} />
                        <Image 
                            scaleX={scale} 
                            scaleY={scale}
                            x={455 * scale}
                            y={455 * scale}
                            draggable 
                            image={no9Image}
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
                            dispatch(increaseMundo3());
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