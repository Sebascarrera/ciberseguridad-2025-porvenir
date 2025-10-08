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

import FirewallIntro from "./Games/firewall/pages/Intro";
import FirewallPlay from "./Games/firewall/pages/Play";

import ContrasenaMaestraIntro from "./Games/contrasena-maestra/pages/intro.js";
import ContrasenaMaestraPlay from "./Games/contrasena-maestra/pages/play.js";

import Live from './Live'

import AuthRoute from './Auth/';
import MalwareIntro from './Games/escapa-malware/pages/intro.js';
import MalwarePlay from './Games/escapa-malware/pages/play.js';

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
        element: (<Selector />),
    },
    {
        path: "/live",
        element: (
        <AuthRoute>
            <Live />
        </AuthRoute>),
    },
    {/*{
        path:"/firewall/intro",
        element:(
        <AuthRoute>
            <FirewallIntro />
        </AuthRoute>),
    },
    {
        path:"/firewall/play",
        element:(
        <AuthRoute>
            <FirewallPlay />
        </AuthRoute>),
    },*/},

    {
        path:"/firewall/intro",
        element:(

            <FirewallIntro />)

    },
    {
        path:"/firewall/play",
        element:(

            <FirewallPlay />)

    },

    {
        path:"/contrasena-maestra/intro",
        element:(

            <ContrasenaMaestraIntro />)

    },

    {
        path:"/contrasena-maestra/play",
        element:(

            <ContrasenaMaestraPlay />)

    },

    {
        path:"/escapa-malware/intro",
        element:(

            <MalwareIntro />)

    },

    {
        path:"/escapa-malware/play",
        element:(

            <MalwarePlay />)

    },

    
]);

export default router