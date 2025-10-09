import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import logo from './assets/img/logo-ciberseguridad-2025.png'
import iconNombre from './assets/img/icon-nombre.png'
import iconCedula from './assets/img/icon-cedula.png'
import iconCorreo from './assets/img/icon-correo.png'
import iconCiudad from './assets/img/icon-ciudad.png'
import docDatos from './assets/docs/tratamientoDatosPorvenir.pdf'
import BackgroundVideo from "./components/BackgroundVideo"; // 👈 IMPORTANTE
import imgNegra  from './assets/img/img-negra.png'
import imgNaranja from './assets/img/img-naranja.png'

import './App.css';
import { createUser } from './Redux/user';

function App() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const status = useSelector( state => state.user.status )
    const error = useSelector(state => state.user.error)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [isShowingPopup, setIsShowingPopup] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const openPopup = () => {
        setIsShowingPopup(true)
    }

    const closePopup = () => {
        setIsShowingPopup(false)
    }

    const onSubmit = data => {
        if (!data.terms) {
            return
        }

        dispatch(createUser(data))

    }

    useEffect( () => {
        if (status == "succeded") {
            navigate('/selector')
        }
    }, [status])

    return (
    <div className="App">
        <BackgroundVideo />
        <div className='background-form'>
            <header>
                <div className="logo-ciberseguridad">
                    <img src={logo} alt="Logo Ciberseguridad Porvenir" />
                </div>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className="form-cont">
                <div className="registro">
                    <div className="input-container">
                        <div className="form_controls">
                            <img className="icono" src={iconNombre} alt="Nombre" />
                            <input {...register("fullname")} placeholder="Nombre y Apellido" required />
                        </div>        
                    </div>
                    <div className="input-container">
                        <div className="form_controls">
                            <img className="icono" src={iconCedula} alt="Cédula" />
                            <input className="form_controls" {...register("document")} placeholder="Cédula" required />
                        </div>        
                    </div>
                    <div className="input-container">
                        <div className="form_controls">
                            <img className="icono" src={iconCorreo} alt="Correo Corporativo" />
                            <input className="form_controls" type="email" {...register("email")} placeholder="Correo Corporativo" required />
                        </div>        
                    </div>
                    <div className="input-container select">
                        <div className="form_controls">
                            <img className="icono" src={iconCiudad} alt="Ciudad" />
                            <select
                                required
                                className="form_controls"
                                {...register("city", { required: true })}
                                defaultValue=""
                            >
                                <option value="" disabled>Selecciona tu ciudad</option>
                                <option value="bogota">Bogotá</option>
                                <option value="medellin">Medellín</option>
                                <option value="cali">Cali</option>
                                <option value="barranquilla">Barranquilla</option>
                                <option value="bucaramanga">Bucaramanga</option>
                                <option value="otras">Otras</option>
                            </select>
                        </div>
                    </div>       
                </div>
                <div className="terminos-y-condiciones">
                    <div className="cont-check-terms">
                        <input type="checkbox" {...register("terms")} required />
                        <label htmlFor="activar">
                            <p className="text-terms">He leído y acepto la autorización de tratamiento de datos que se encuentra disponible en el siguiente <span className="resaltado" onClick={openPopup}>enlace</span>.</p>
                        </label>
                        
                    </div>
                </div>
                
                <section className="boton-start">
                    <div className="boton-enlace">
                        <input value="CONTINUAR" type="submit" />
                        { status == 'loading' && (
                            <div className='loader_button'></div>
                        )}
                    </div>
                </section>

                <section>
                    { status == "failed" && (
                        <p className='error_form'>{error}</p>
                    )}
                </section>
            </form>
        </div>
        {/*<footer>
            <div className="cont-footer">
                <div className="naranja">
                    <img src={imgNaranja} alt="" />
                </div>
                <div className="negro">
                    <img src={imgNegra} alt="" />
                </div>
            </div>
        </footer>*/}

        <div id="miPopUp" className="popUp" style={{ display: isShowingPopup ? 'block' : 'none' }}>
            <div className="popup-contenido">
                <span onClick={closePopup} className="cerrar-popup">&times;</span>
                <iframe id="pdfViewer" src={docDatos} frameBorder="0"></iframe>
            </div>
        </div>

    </div>
  );
}

export default App;
