import {  
    createBrowserRouter
} from 'react-router-dom'

import App from './App'
import Selector from './Selector';

import PacmanIntro from './Games/Pacman/Intro'
import PacmanSummary from './Games/Pacman/Summary'
import Pacman from './Games/Pacman'
import PacmanScore from './Games/Pacman/Score'

import Jackpot from './Games/Jackpot'

import Focus from './Games/Focus'
import FocusFrase from './Games/Focus/frase'
import FocusPuntaje from './Games/Focus/Puntaje'

import Ruleta from './Games/Ruleta'
import RuletaPersonaje from './Games/Ruleta/Personaje'
import PreguntaScreen from './Games/Ruleta/Pregunta'
import PuntajeScreen from './Games/Ruleta/Puntaje'

import Ninja from './Games/Ninja'
import NinjaIntro from './Games/Ninja/Intro'
import NinjaPuntaje from './Games/Ninja/Puntaje'

import Live from './Live'

import AuthRoute from './Auth/';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/pacman/intro",
        element: <PacmanIntro />,
    },
    {
        path: "/pacman/resumen",
        element: <PacmanSummary />,
    },
    {
        path: "/pacman/juego",
        element: <Pacman />,
    },
    {
        path: "/pacman/puntaje",
        element: <PacmanScore />,
    },
    {
        path: "/jackpot",
        element: <Jackpot />,
    },
    {
        path: "/selector",
        element: (
            <AuthRoute>
                <Selector />
            </AuthRoute>
        ),
    },
    {
        path: "/live",
        element: (
        <AuthRoute>
            <Live />
        </AuthRoute>),
    },

    {
        path: "/focus",
        element: (
        <AuthRoute>
            <Focus />
        </AuthRoute>),
    },
    {
        path: "/focus/frase",
        element: (
            <AuthRoute>
                <FocusFrase />
            </AuthRoute>
        ),
    },
    {
        path: "/focus/puntaje",
        element: (
            <AuthRoute>
                <FocusPuntaje />
            </AuthRoute>
        ),
    },
    {
        path: "/ninja",
        element: (
            <AuthRoute>
                <Ninja />
            </AuthRoute>
        ),
    },

    {
        path: "/ninja/intro",
        element: (
            <AuthRoute>
                <NinjaIntro />
            </AuthRoute>
        ),
    },

    {
        path: "/ninja/puntaje",
        element: (
            <AuthRoute>
                <NinjaPuntaje />
            </AuthRoute>
        ),
    },

    {
        path: "/ruleta",
        element: (
            <Ruleta />
        ),
    },
    {
        path: "/ruleta/personaje",
        element: (
            <RuletaPersonaje />
        )
    },
    {
        path: "/ruleta/preguntas",
        element: (
            <PreguntaScreen />
        )
    },
    {
        path: "/ruleta/puntaje",
        element: (
            <PuntajeScreen />
        )
    }
]);

export default router