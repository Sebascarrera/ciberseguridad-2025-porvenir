import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Logo from '../../../assets/img/logo-fondo-blanco-ciberseguridad2024.png'
import LogoJackpot from '../../../assets/img/jackpot-img.png'
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategories } from '../Redux';

const JackpotIntro = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector(state => state.ruleta.status);

    useEffect( () => {
        dispatch(fetchCategories());
    }, [dispatch])

    useEffect( () => {
        if (status == 'succeded') {
            navigate('/jackpot/personaje');
        }
    }, [status])

    return (
        <div className="jackpot-intro-container">
            <div>
                <img className="home-logo" src={Logo} alt="Logo"/>
            </div>
            <div className='jackpot-intro-logo-game'>
                <img src={LogoJackpot} />
            </div>
        </div>
    );
};

export default JackpotIntro;
