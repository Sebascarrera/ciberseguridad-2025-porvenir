import { useEffect, useState } from 'react';
import Logo from '../../assets/img/focus/ciberseguridad-logo-porvenir.png'
import LogoGrande from '../../assets/img/focus/focus-game-logo-grande.png'
import ImagenTapada from '../../assets/img/focus/png-tapadas/tapa-focus-porvenir-208px.png'

import './styles.css'

const Focus = () => {

    const [cards, setCards] = useState(generateCards());
    const [tarjetasDestapadas, setTarjetasDestapadas] = useState(0);
    const [tarjeta1, setTarjeta1] = useState(null);
    const [tarjeta2, setTarjeta2] = useState(null);
    const [primerResultado, setPrimerResultado] = useState(null);
    const [segundoResultado, setSegundoResultado] = useState(null);
    const [movimientos, setMovimientos] = useState(0);
    const [aciertos, setAciertos] = useState(0);
    const [segundos, setSegundos] = useState(0);

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
            }, 1000);
        }
    }, [primerResultado, segundoResultado])

    useEffect(() => {
        if (aciertos === 6) {
            // Game won logic goes here
        }
    }, [aciertos])
    
    useEffect(() => {
        if (segundos === 30) {
            // Game over logic goes here
        } else {
            setTimeout(() => {
            setSegundos(segundos + 1);
            }, 1000);
        }
    }, [segundos]);
    
    function generateCards()  {
      
        const numeros = [        
            { 
                image: require('../../assets/img/focus/png-tapadas/208-1A.png'),
                match: 1
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-1B.png'),
                match: 1
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-2A.png'),
                match: 2
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-2B.png'),
                match: 2
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-3A.png'),
                match: 3
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-3B.png'),
                match: 3
            },            
            { 
                image: require('../../assets/img/focus/png-tapadas/208-4A.png'),
                match: 4
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-4B.png'),
                match: 4
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-5A.png'),
                match: 5
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-5B.png'),
                match: 5
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-6A.png'),
                match: 6
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-6B.png'),
                match: 6
            },            
            { 
                image: require('../../assets/img/focus/png-tapadas/208-7A.png'),
                match: 7
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-7B.png'),
                match: 7
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-8A.png'),
                match: 8
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-8B.png'),
                match: 8
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-9A.png'),
                match: 9
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-9B.png'),
                match: 9
            },            
            { 
                image: require('../../assets/img/focus/png-tapadas/208-10A.png'),
                match: 10
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-10B.png'),
                match: 10
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-11A.png'),
                match: 11
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-11B.png'),
                match: 11
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-12A.png'),
                match: 12
            },                
            { 
                image: require('../../assets/img/focus/png-tapadas/208-12B.png'),
                match: 12
            },
        ];
    
        const cards = numeros
          .sort(() => Math.random() - 0.5)
          .map((content, index) => ({ id: index, content, show: false }));
    
        return cards;
      }
    
      function destapar(id) {
        if (tarjetasDestapadas === 0) {
          setTarjetasDestapadas(1);
          setTarjeta1(id);
        } else if (tarjetasDestapadas === 1) {
          setTarjetasDestapadas(2);
          setTarjeta2(id);
        }
      }

    function generateTable() {
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


    return (
        <div className='container_focus'>
            <header className="header-game">
                <img src={Logo} alt="focus-game-Ciberseguridad" />
            </header>
            <div className="rectangle specific-page">
                <main>      
                    <section className="section1">
                        <table>
                            <tbody>{generateTable()}</tbody>
                        </table>
                    </section>
                    <section className="section2">
                        <h2 id="aciertos" className="estadisticas">
                            Aciertos: {aciertos}
                        </h2>
                        <h2 id="tiempo" className="estadisticas">
                            Tiempo: {segundos} Segundos
                        </h2>
                        <h2 id="movimientos" className="estadisticas">
                            Movimientos: {movimientos}
                        </h2>
                    </section>
                </main>
            </div>
            {/* <footer>
                <img src={LogoGrande} alt="logo-focus" />
            </footer> */}

        </div>
    )
}

export default Focus