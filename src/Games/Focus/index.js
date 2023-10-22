import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import Logo from '../../assets/img/focus/ciberseguridad-logo-porvenir.png'
import LogoGrande from '../../assets/img/focus/focus-game-logo-grande.png'
import ImagenTapada from '../../assets/img/focus/png-tapadas/tapa-focus-porvenir-208px.png'

import './styles.css'

const Focus = () => {

    const generateCards = () => {
      
        const numeros = [        
            { 
                image: require('../../assets/img/focus/png-tapadas/208-1A.png'),
                match: 1
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-1A.png'),
                match: 1
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-2A.png'),
                match: 2
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-2A.png'),
                match: 2
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-3A.png'),
                match: 3
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-3A.png'),
                match: 3
            },            
            { 
                image: require('../../assets/img/focus/png-tapadas/208-4A.png'),
                match: 4
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-4A.png'),
                match: 4
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-5A.png'),
                match: 5
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-5A.png'),
                match: 5
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-6A.png'),
                match: 6
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-6A.png'),
                match: 6
            },            
            { 
                image: require('../../assets/img/focus/png-tapadas/208-7A.png'),
                match: 7
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-7A.png'),
                match: 7
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-8A.png'),
                match: 8
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-8A.png'),
                match: 8
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-9A.png'),
                match: 9
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-9A.png'),
                match: 9
            },            
            { 
                image: require('../../assets/img/focus/png-tapadas/208-10A.png'),
                match: 10
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-10A.png'),
                match: 10
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-11A.png'),
                match: 11
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-11A.png'),
                match: 11
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-12A.png'),
                match: 12
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-12A.png'),
                match: 12
            },
        ];
    
        const cards = numeros
          .sort(() => Math.random() - 0.5)
          .map((content, index) => ({ id: index, content, show: false }));
    
        return cards;
        }

    const navigate = useNavigate()

    const [cards, setCards] = useState(generateCards());
    const [tarjetasDestapadas, setTarjetasDestapadas] = useState(0);
    const [tarjeta1, setTarjeta1] = useState(null);
    const [tarjeta2, setTarjeta2] = useState(null);
    const [primerResultado, setPrimerResultado] = useState(null);
    const [segundoResultado, setSegundoResultado] = useState(null);
    const [movimientos, setMovimientos] = useState(0);
    const [aciertos, setAciertos] = useState(0);
    const [seconds, setSeconds] = useState(300);
    const [intervalId, setIntervalId] = useState(null);

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

        console.log(primerResultado)
        console.log(segundoResultado)

        if (primerResultado.match === segundoResultado.match) {
            // Encerar contador tarjetas destapadas
            setTarjetasDestapadas(0);
            setPrimerResultado(null)
            setSegundoResultado(null)

            // Aumentar aciertos
            setAciertos(prev => prev + 1);

        } else {
            // Mostrar momentaneamente valores y volver a tapar
            setTimeout(() => {
                const updatedCards = cards.slice();
                updatedCards[tarjeta1].show = false;
                updatedCards[tarjeta2].show = false;
                setCards(updatedCards);
                setTarjetasDestapadas(0);
                setPrimerResultado(null)
                setSegundoResultado(null)
            }, 5000);
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
    
        return () => clearInterval(id);
    }, []); // This empty array makes the effect run only once, similar to componentDidMount
    
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

        </div>
    )
}

export default Focus