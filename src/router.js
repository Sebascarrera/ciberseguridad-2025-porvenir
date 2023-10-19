import {  
    createBrowserRouter
} from 'react-router-dom'

import App from './App'
import Selector from './Selector';
import Ruleta from './Games/Ruleta'
import Ninja from './Games/Ninja'
import Focus from './Games/Focus'

import RuletaPersonaje from './Games/Ruleta/personaje'
import PreguntaScreen from './Games/Ruleta/Pregunta'



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
        path: "/focus",
        element: <Focus />,
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
    }
]);

export default router