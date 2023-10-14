import { useState } from 'react';

import './App.css';
import logo from './assets/img/logo-ciberseguridad.jpg'
import iconNombre from './assets/img/icon-nombre.png'
import iconCedula from './assets/img/icon-cedula.png'
import iconCorreo from './assets/img/icon-correo.png'
import docDatos from './assets/docs/tratamientoDatosPorvenir.pdf'
import imgNegra  from './assets/img/img-negra.png'
import imgNaranja from './assets/img/img-naranja.png'

function App() {

  const [isShowingPopup, setIsShowingPopup] = useState(false)

  const openPopup = () => {
    setIsShowingPopup(true)
  }

  const closePopup = () => {
    setIsShowingPopup(false)
  }

  return (
    <div className="App">
      <header>
        <div className="logo-ciberseguridad">
            <img src={logo} alt="Logo Ciberseguridad Porvenir" />
        </div>
      </header>
      <form className="form-cont">
          <div className="registro">
              <div className="input-container">
                  <div className="controls">
                      <img className="icono" src={iconNombre} alt="Nombre" />
                      <input type="text" name="nombre" id="nombre" placeholder="Nombre" required />
                  </div>        
              </div>
              <div className="input-container">
                  <div className="controls">
                      <img className="icono" src={iconCedula} alt="Cédula" />
                      <input className="controls" type="number" name="cedula" id="cedula" placeholder="Cédula" required />
                  </div>        
              </div>
              <div className="input-container">
                  <div className="controls">
                      <img className="icono" src={iconCorreo} alt="Correo Corporativo" />
                      <input className="controls" type="email" name="email" id="email" placeholder="Correo Corporativo" required />
                  </div>        
              </div>      
          </div>
          <div className="terminos-y-condiciones">
              <div className="cont-check-terms">
                  <input type="checkbox" id="activar" required />
                  <label for="activar"></label>
                  <p className="text-terms">He leído y acepto la autorización de tratamiento de datos que se encuentra disponible en el siguiente <span className="resaltado" onClick={openPopup}>enlace</span>.</p>
              </div>
          </div>
          
          <section className="boton-start">
              <a href="/selector" className="boton-enlace">Continuar</a>
          </section>
      </form>
      
      <div id="miPopUp" className="popUp" style={{ display: isShowingPopup ? 'block' : 'none' }}>
          <div className="popup-contenido">
              <span onClick={closePopup} className="cerrar-popup">&times;</span>
              <iframe id="pdfViewer" src={docDatos} frameborder="0"></iframe>
          </div>
      </div>
      <footer>
          <div className="cont-footer">
              <div className="naranja">
                  <img src={imgNaranja} alt="" />
              </div>
              <div className="negro">
                  <img src={imgNegra} alt="" />
              </div>
          </div>
      </footer>
    </div>
  );
}

export default App;
