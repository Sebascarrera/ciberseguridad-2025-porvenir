import React, { useEffect } from "react";
import './styles.css'

import ImagenMundo1 from '../../assets/img/img-antihackers/mundo1.png'
import ImagenMundo2 from '../../assets/img/img-antihackers/mundo2.png'
import ImagenMundo3 from '../../assets/img/img-antihackers/mundo3.png'
import ImagenMundo4 from '../../assets/img/img-antihackers/mundo4.png'
import ImagenCipoTitulo from '../../assets/img/img-naranja.png'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../Redux/scores";

const AntiHacker = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const times = useSelector( state => state.antihackers.times);

    useEffect( () => {
        if(times == 0) {
            dispatch(startGame());
        }
    }, [dispatch, times])

    return (
        <div className="AntiHacker_Container">

            <div className="container-titulo-texto-antihackers">
                <div 
                    class="imagen-cipo-antihackers-titulo">
                    <img src={ImagenCipoTitulo} alt="Cipo Imagen"/>
                </div>
                <h1>AntiHackers Game</h1>
                <h2>Elige el mundo con el que deseas comenzar a jugar</h2>
                <h4>"Recuerda que si cometes un error, perderás una vida. Solo tienes tres vidas disponibles por mundo, así que úsalas sabiamente."</h4>
                <h4>Acumula la mayor cantidad de puntos en cada mundo evitando cometer errores. Cada vida es valiosa, y una mala decisión te puede dejar fuera de la partida.</h4>
            </div>  

            <div>
            <div class="antihacker-grid-container">
                <div 
                    class="antihacker-grid-item"
                    onClick={() => navigate('/antihackers/mundo1')}>
                    <img src={ImagenMundo1} alt="Imagen 1"/>
                </div>
                <div 
                    class="antihacker-grid-item"
                    onClick={() => navigate('/antihackers/mundo2')}>
                    <img src={ImagenMundo2} alt="Imagen 2"/>
                </div>
                <div 
                    class="antihacker-grid-item"
                    onClick={() => navigate('/antihackers/mundo3')}>
                    <img src={ImagenMundo3} alt="Imagen 3"/>
                </div>
                <div 
                    class="antihacker-grid-item"
                    onClick={() => navigate('/antihackers/mundo4')}>
                    <img src={ImagenMundo4} alt="Imagen 4"/>
                </div>
             </div>
            </div>

        </div>
    );
}

export default AntiHacker