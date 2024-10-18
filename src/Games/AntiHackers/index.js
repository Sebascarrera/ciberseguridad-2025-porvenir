import React, { useEffect } from "react";
import './styles.css'

import ImagenMundo1 from '../../assets/img/img-antihackers/mundo1.png'
import ImagenMundo2 from '../../assets/img/img-antihackers/mundo2.png'
import ImagenMundo3 from '../../assets/img/img-antihackers/mundo3.png'
import ImagenMundo4 from '../../assets/img/img-antihackers/mundo4.png'
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

            <div>
                <h1>AntiHackers Game</h1>
                <h2>Escoge el mundo con el que quieres empezar a jugar</h2>
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