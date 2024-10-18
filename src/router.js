import {  
    createBrowserRouter
} from 'react-router-dom'

import App from './App'
import Selector from './Selector';

import PacmanIntro from './Games/Pacman/Intro'
import PacmanSummary from './Games/Pacman/Summary'
import Pacman from './Games/Pacman'
import PacmanResults from './Games/Pacman/Results'
import PacmanScore from './Games/Pacman/Score'

import JackpotIntro from './Games/Jackpot/Intro';
import JackpotAvatar from './Games/Jackpot/Avatar'
import JackpotPregunta from './Games/Jackpot/Pregunta'
import JackpotPuntaje from './Games/Jackpot/Puntaje'
import Jackpot from './Games/Jackpot'

import AntiHacker from './Games/AntiHackers/';
import AntiHackerMundo1 from './Games/AntiHackers/Mundos/1';
import AntiHackerMundo2 from './Games/AntiHackers/Mundos/2';
import AntiHackerMundo3 from './Games/AntiHackers/Mundos/3';
import AntiHackerMundo4 from './Games/AntiHackers/Mundos/4';
import AntiHackersScore from './Games/AntiHackers/Score';

import Live from './Live'

import AuthRoute from './Auth/';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/pacman/intro",
        element: ( 
             <AuthRoute>
                <PacmanIntro />
             </AuthRoute>
            )
    },
    {
        path: "/pacman/resumen",
        element: ( 
             <AuthRoute>
                <PacmanSummary />
             </AuthRoute>
            )
    },
    {
        path: "/pacman/juego",
        element: ( 
             <AuthRoute>
                <Pacman />
             </AuthRoute>
            )
    },
    {
        path: "/pacman/resultados",
        element: ( 
             <AuthRoute>
                <PacmanResults />
             </AuthRoute>
            )
    },
    {
        path: "/pacman/puntaje",
        element: ( 
             <AuthRoute>
                <PacmanScore />
             </AuthRoute>
            )
    },
    {
        path: "/jackpot/intro",
        element: (
            <AuthRoute>
                <JackpotIntro />
            </AuthRoute>
        )
    },
    {
        path: "/jackpot/personaje",
        element: (
            <AuthRoute>
                <JackpotAvatar />
            </AuthRoute>
        )
    },
    {
        path: "/jackpot/juego",
        element: (
            <AuthRoute>
                <Jackpot />
            </AuthRoute>
        )
    },
    {
        path: "/jackpot/preguntas",
        element: (
            <AuthRoute>
                <JackpotPregunta />
            </AuthRoute>
        )
    },
    {
        path: "/jackpot/puntaje",
        element: (
            <AuthRoute>
                <JackpotPuntaje />
            </AuthRoute>
        )
    },
    {
        path: "/antihackers",
        element: (
            <AuthRoute>
                <AntiHacker />
            </AuthRoute>
        )
    },
    {
        path: "/antihackers/mundo1",
        element: (
            <AuthRoute>
                <AntiHackerMundo1 />
            </AuthRoute>
        )
    },
    {
        path: "/antihackers/mundo2",
        element: (
            <AuthRoute>
                <AntiHackerMundo2 />
            </AuthRoute>
        )
    },
    {
        path: "/antihackers/mundo3",
        element: (
            <AuthRoute>
                <AntiHackerMundo3 />
            </AuthRoute>
        )
    },
    {
        path: "/antihackers/mundo4",
        element: (
            <AuthRoute>
                <AntiHackerMundo4 />
            </AuthRoute>
        )
    },
    {
        path: "/antihackers/puntaje",
        element: (
            <AuthRoute>
                <AntiHackersScore />
            </AuthRoute>
        )
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

]);

export default router