import React, { useEffect } from "react";
import './styles.css'

import ImagenMundo1 from '../../assets/img/img-antihackers/mundo1.png'
import ImagenMundo2 from '../../assets/img/img-antihackers/mundo2.png'
import ImagenMundo3 from '../../assets/img/img-antihackers/mundo3.png'
import ImagenMundo4 from '../../assets/img/img-antihackers/mundo4.png'

import ImagenMundo1Off from '../../assets/img/img-antihackers/mundo1-off.png'
import ImagenMundo2Off from '../../assets/img/img-antihackers/mundo2-off.png'
import ImagenMundo3Off from '../../assets/img/img-antihackers/mundo3-off.png'
import ImagenMundo4Off from '../../assets/img/img-antihackers/mundo4-off.png'

import ImagenCipoTitulo from '../../assets/img/img-naranja.png'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../Redux/scores";

const AntiHacker = () => {

    const maxPerMundo = 3;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const times = useSelector( state => state.antihackers.times);
    const timesMundo1 = useSelector(state => state.antihackers.mundo1);
    const timesMundo2 = useSelector(state => state.antihackers.mundo2);
    const timesMundo3 = useSelector(state => state.antihackers.mundo3);
    const timesMundo4 = useSelector(state => state.antihackers.mundo4);

    useEffect( () => {
        if(times == 0) {
            dispatch(startGame());
        }
    }, [dispatch, times])

    return (
        <div className="AntiHacker_Container">

            <div className="container-titulo-texto-antihackers">
                <div 
                    className="imagen-cipo-antihackers-titulo">
                    <img src={ImagenCipoTitulo} alt="Cipo Imagen"/>
                </div>
                <h1>AntiHackers Game</h1>
                <h2>Elige el mundo con el que deseas comenzar a jugar</h2>
                <h4>"Recuerda que si cometes un error, perderás una vida. Solo tienes tres vidas disponibles por mundo, así que úsalas sabiamente."</h4>
                <h4>Acumula la mayor cantidad de puntos en cada mundo evitando cometer errores. Cada vida es valiosa, y una mala decisión te puede dejar fuera de la partida.</h4>
            </div>  

            <div>
            <div className="antihacker-grid-container">
                <div 
                    className={`antihacker-grid-item ${ timesMundo1 == maxPerMundo ? 'antihacker-disabled' : '' }`}
                    onClick={() => navigate('/antihackers/mundo1')}>
                    <img src={ timesMundo1 == maxPerMundo ? ImagenMundo1Off : ImagenMundo1} alt="Imagen 1"/>
                </div>
                <div 
                    className={`antihacker-grid-item ${ timesMundo2 == maxPerMundo ? 'antihacker-disabled' : '' }`}
                    onClick={() => navigate('/antihackers/mundo2')}>
                    <img src={ timesMundo2 == maxPerMundo ? ImagenMundo2Off : ImagenMundo2} alt="Imagen 2"/>
                </div>
                <div 
                    className={`antihacker-grid-item ${ timesMundo3 == maxPerMundo ? 'antihacker-disabled' : '' }`}
                    onClick={() => navigate('/antihackers/mundo3')}>
                    <img src={ timesMundo3 == maxPerMundo ? ImagenMundo3Off : ImagenMundo3} alt="Imagen 3"/>
                </div>
                <div 
                    className={`antihacker-grid-item ${ timesMundo4 == maxPerMundo ? 'antihacker-disabled' : '' }`}
                    onClick={() => navigate('/antihackers/mundo4')}>
                    <img src={ timesMundo4 == maxPerMundo ? ImagenMundo4Off : ImagenMundo4} alt="Imagen 4"/>
                </div>
             </div>
            </div>

        </div>
    );
}

export default AntiHacker