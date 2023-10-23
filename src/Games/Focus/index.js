import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

import Logo from '../../assets/img/focus/ciberseguridad-logo-porvenir.png'
import LogoGrande from '../../assets/img/focus/focus-game-logo-grande.png'
import ImagenTapada from '../../assets/img/focus/png-tapadas/tapa-focus-porvenir-208px.png'

import { startGame, endGame, markScore } from '../../Redux/scores'

import './styles.css'
import { useDispatch } from 'react-redux'
import { saveScore } from '../../Services/score'

const Focus = () => {

    const generateCards = () => {
      
        const numeros = [        
            { 
                image: require('../../assets/img/focus/png-tapadas/208-1A.png'),
                match: 1,
                match_image: require('../../assets/img/focus/png-tapadas/208-1B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-1A.png'),
                match: 1,
                match_image: require('../../assets/img/focus/png-tapadas/208-1B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-2A.png'),
                match: 2,
                match_image: require('../../assets/img/focus/png-tapadas/208-2B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-2A.png'),
                match: 2,
                match_image: require('../../assets/img/focus/png-tapadas/208-2B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-3A.png'),
                match: 3,
                match_image: require('../../assets/img/focus/png-tapadas/208-3B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-3A.png'),
                match: 3,
                match_image: require('../../assets/img/focus/png-tapadas/208-3B.png')
            },            
            { 
                image: require('../../assets/img/focus/png-tapadas/208-4A.png'),
                match: 4,
                match_image: require('../../assets/img/focus/png-tapadas/208-4B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-4A.png'),
                match: 4,
                match_image: require('../../assets/img/focus/png-tapadas/208-4B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-5A.png'),
                match: 5,
                match_image: require('../../assets/img/focus/png-tapadas/208-5B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-5A.png'),
                match: 5,
                match_image: require('../../assets/img/focus/png-tapadas/208-5B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-6A.png'),
                match: 6,
                match_image: require('../../assets/img/focus/png-tapadas/208-6B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-6A.png'),
                match: 6,
                match_image: require('../../assets/img/focus/png-tapadas/208-6B.png')
            },            
            { 
                image: require('../../assets/img/focus/png-tapadas/208-7A.png'),
                match: 7,
                match_image: require('../../assets/img/focus/png-tapadas/208-7B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-7A.png'),
                match: 7,
                match_image: require('../../assets/img/focus/png-tapadas/208-7B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-8A.png'),
                match: 8,
                match_image: require('../../assets/img/focus/png-tapadas/208-8B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-8A.png'),
                match: 8,
                match_image: require('../../assets/img/focus/png-tapadas/208-8B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-9A.png'),
                match: 9,
                match_image: require('../../assets/img/focus/png-tapadas/208-9B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-9A.png'),
                match: 9,
                match_image: require('../../assets/img/focus/png-tapadas/208-9B.png')
            },            
            { 
                image: require('../../assets/img/focus/png-tapadas/208-10A.png'),
                match: 10,
                match_image: require('../../assets/img/focus/png-tapadas/208-10B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-10A.png'),
                match: 10,
                match_image: require('../../assets/img/focus/png-tapadas/208-10B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-11A.png'),
                match: 11,
                match_image: require('../../assets/img/focus/png-tapadas/208-11B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-11A.png'),
                match: 11,
                match_image: require('../../assets/img/focus/png-tapadas/208-11B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-12A.png'),
                match: 12,
                match_image: require('../../assets/img/focus/png-tapadas/208-12B.png')
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-12A.png'),
                match: 12,
                match_image: require('../../assets/img/focus/png-tapadas/208-12B.png')
            },
        ];
    
        const cards = numeros
          .sort(() => Math.random() - 0.5)
          .map((content, index) => ({ id: index, content, show: false }));
    
        return cards;
        }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [cards, setCards] = useState(generateCards());
    const [tarjetasDestapadas, setTarjetasDestapadas] = useState(0);
    const [tarjeta1, setTarjeta1] = useState(null);
    const [tarjeta2, setTarjeta2] = useState(null);
    const [primerResultado, setPrimerResultado] = useState(null);
    const [segundoResultado, setSegundoResultado] = useState(null);
    const [movimientos, setMovimientos] = useState(0);
    const [aciertos, setAciertos] = useState(0);
    const [seconds, setSeconds] = useState(120);
    const [intervalId, setIntervalId] = useState(null);
    const [isShowingModalMatch, setIsShowingModalMatch] = useState(false)
    const [imageMatch, setImageMatch] = useState(null)

    useEffect(() => {

        if (tarjetasDestapadas === 1) {
            // Mostrar primer numero
            const updatedCards = cards.slice();
            updatedCards[tarjeta1].show = true;

            setPrimerResultado(updatedCards[tarjeta1].content);
            setCards(updatedCards);
        } else if (tarjetasDestapadas === 2) {
            // Mostrar segundo numero
            const updatedCards = cards.slice();
            updatedCards[tarjeta2].show = true;
            setSegundoResultado(updatedCards[tarjeta2].content);
            setCards(updatedCards);

            // Incrementar movimientos
            setMovimientos(prev => prev + 1);   
        }
    }, [tarjetasDestapadas]);

    useEffect( () => {

        if (primerResultado == null || segundoResultado == null) {
            
            return
        }

        if (primerResultado.match === segundoResultado.match) {
            // Encerar contador tarjetas destapadas
            setTarjetasDestapadas(0);
            setPrimerResultado(null)
            setSegundoResultado(null)

            dispatch(markScore(10))

            setImageMatch(segundoResultado.match_image)

            // Aumentar aciertos
            setAciertos(prev => prev + 1);

        } else {

            setImageMatch(null)

            // Mostrar momentaneamente valores y volver a tapar
            setTimeout(() => {
                const updatedCards = cards.slice();
                updatedCards[tarjeta1].show = false;
                updatedCards[tarjeta2].show = false;
                setCards(updatedCards);
                setTarjetasDestapadas(0);
                setPrimerResultado(null)
                setSegundoResultado(null)
            }, 2000);
        }
    }, [primerResultado, segundoResultado])

    useEffect(() => {
        if (aciertos === 12) {
            markAsFinished()
        }
    }, [navigate, aciertos])

    useEffect(() => {
        const id = setInterval(() => {
          setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
    
        setIntervalId(id);

        dispatch(startGame())
    
        return () => clearInterval(id);
    }, []); 

    useEffect( () => {
        setIsShowingModalMatch(imageMatch !== null)
    }, [imageMatch])
    
    useEffect(() => {
        if (seconds === 0) {
            markAsFinished()
        }
    }, [navigate, seconds, intervalId]);

    const markAsFinished = () => {
        clearInterval(intervalId);
        navigate('/focus/puntaje')
    }

    const destapar = (id) => {
        if (tarjetasDestapadas === 0) {
          setTarjetasDestapadas(1);
          setTarjeta1(id);
        } else if (tarjetasDestapadas === 1) {
          setTarjetasDestapadas(2);
          setTarjeta2(id);
        }
      }

    const generateTable = () => {
        const table = [];
        let row = [];

        cards.forEach((card, index) => {
            row.push(
                <td key={card.id}>
                    <button
                        className={`card ${card.show ? 'revealed' : ''}`}
                        onClick={() => destapar(card.id)}
                        disabled={card.show}
                        >
                        <img src={card.show ? card.content.image : ImagenTapada} alt="" />
                    </button>
                </td>
            );

            if ((index + 1) % 6 === 0) {
                table.push(<tr key={index}>{row}</tr>);
                row = [];
            }
        });

        return table;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <div className='container_focus'>
            <header className="header-game">
                <img src={Logo} alt="focus-game-Ciberseguridad" />
            </header>
            <div className="rectangle specific-page">
                <main>      
                    <section className="focus-section1">
                        <table>
                            <tbody>{generateTable()}</tbody>
                        </table>
                    </section>
                    <section className="focus-section2">
                        <h2 id="aciertos" className="estadisticas">
                            Aciertos: {aciertos}
                        </h2>
                        <h2 id="tiempo" className="estadisticas">
                            Tiempo: {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
                        </h2>
                        <h2 id="movimientos" className="estadisticas">
                            Movimientos: {movimientos}
                        </h2>
                        
                        <div style={{ paddingTop: 20 }}>
                            <div className='boton-enlace' onClick={markAsFinished}> 
                                Terminar 
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <footer>
                <div className='focus-logo-pie'>
                    <img src={LogoGrande} alt="logo-focus" />
                </div>      
            </footer>

            <Modal 
                isOpen={isShowingModalMatch}>
                    <div className='container_focus_modal'>
                        <div className='container_focus_modal_close'>
                            <button onClick={() => setIsShowingModalMatch(false) }>Cerrar</button>
                        </div>
                    
                        <img src={imageMatch} alt="Match" />

                    </div>
                
            </Modal>

        </div>
    )
}

export default Focus