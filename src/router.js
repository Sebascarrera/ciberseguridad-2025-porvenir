import {  
    createBrowserRouter
} from 'react-router-dom'

import App from './App'
import Selector from './Selector';

import Focus from './Games/Focus'
import FocusFrase from './Games/Focus/frase'
import FocusPuntaje from './Games/Focus/Puntaje'

import Ruleta from './Games/Ruleta'
import RuletaPersonaje from './Games/Ruleta/Personaje'
import PreguntaScreen from './Games/Ruleta/Pregunta'
import PuntajeScreen from './Games/Ruleta/Puntaje'

import Ninja from './Games/Ninja'

import Live from './Live'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/selector",
        element: <Selector />,
    },
    {
        path: "/live",
        element: <Live />,
    },

    {
        path: "/focus",
        element: <Focus />,
    },
    {
        path: "/focus/frase",
        element: <FocusFrase />,
    },
    {
        path: "/focus/puntaje",
        element: <FocusPuntaje />,
    },
    {
        path: "/ninja",
        element: <Ninja />,
    },

    {
        path: "/ruleta",
        element: <Ruleta />,
    },
    {
        path: "/ruleta/personaje",
        element: <RuletaPersonaje />
    },
    {
        path: "/ruleta/preguntas",
        element: <PreguntaScreen />
    },
    {
        path: "/ruleta/puntaje",
        element: <PuntajeScreen />
    }
]);

export default router