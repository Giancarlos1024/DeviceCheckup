import React, { useState } from 'react';
import './css/App.css';
import './css/Home.css';
import './css/Modal.css';
import { Link } from 'react-router-dom';
import logo from './img/logo.png';
import baterias from './img/baterias.jpg';
import pantallas from './img/pantallas.jpg';
import liberacion from './img/liberacion.jpg';
import forros from './img/forro.jpg';
import pantallaspromo from './img/pantallaspromo.jpg';
import revision from './img/revision.jpg';
function Home() {
  const [ticketCode, setTicketCode] = useState('');
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [repairStatus, setRepairStatus] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/dispositivos/${ticketCode}`);
      const data = await response.json();
      setDeviceDetails(data);
      // Obtener datos del usuario y estado de reparación permanecen sin cambios
    } catch (error) {
      console.error('Error al obtener detalles del dispositivo:', error);
    }
  };

  const handleAuthentication = (username, password) => {
    if (username === 'admin' && password === 'Admin2024ABB') {
      setIsAdmin(true);
      setIsModalOpen(false); // Cerrar el modal después de iniciar sesión correctamente
    } else {
      setIsAdmin(false);
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000); // Limpiar el error después de 3 segundos
      setUsername('');
      setPassword('');
    }
  };

  const handleDownloadPDF = async () => {
    if (deviceDetails) { // Verifica que deviceDetails no sea null
      try {
        const response = await fetch('http://localhost:3000/pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(deviceDetails)
        });
        const pdfBlob = await response.blob();
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'detalles_dispositivo.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error('Error al descargar el PDF:', error);
      }
    } else {
      console.error('No hay detalles de dispositivo para generar el PDF');
    }
  };
  
  
  
  

  return (
    <div className="App">
      <header className="header-container">
        <img src={logo} alt="error" />
        <button onClick={() => setIsModalOpen(true)} className='buttoninicio'>Login</button>
      </header>
      <main>
        <section className="welcome">
          <h2>Bienvenido a DeviceCheckup</h2>
          <p>Ingrese su código de ticket para verificar el estado de su dispositivo.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ingrese su código de ticket"
              value={ticketCode}
              onChange={(event) => setTicketCode(event.target.value)}
            />
            <button type="submit">Verificar Estado</button>
          </form>
          {isAdmin && <Link to="/admin">Panel de Administración</Link>}
        </section>
        <section className='container-productos'>
          <h2>Productos Destacados</h2>
          <section className='container-grupo'>
            <div className='container-subproductos'>
              <img src={baterias} alt="error" />
              <p><strong>Baterias</strong></p>
            </div>
            <div className='container-subproductos'>
              <img src={pantallas} alt="error" />
              <p><strong>Pantallas</strong></p>
            </div>
            <div className='container-subproductos'>
              <img src={liberacion} alt="error" />
              <p><strong>Liberacion</strong></p>
            </div>
          </section>
        </section>
        <section className='container-productos'>
          <h2>Ofertas Especiales</h2>
          <section className='container-grupo'>
            <div className='container-subproductos'>
              <img src={forros} alt="error" />
              <p><strong>Forros</strong></p>
            </div>
            <div className='container-subproductos'>
              <img src={pantallaspromo} alt="error" />
              <p><strong>Pantallas Promo</strong></p>
            </div>
            <div className='container-subproductos'>
              <img src={revision} alt="error" />
              <p><strong>Revision</strong></p>
            </div>
          </section>
        </section>
        {deviceDetails && (
          <div className="modal" style={{ display: deviceDetails ? 'block' : 'none' }}>
            <div className="modal-content">
              <span className="close" onClick={() => setDeviceDetails(null)}>&times;</span>
              <h2>DETALLES DEL DISPOSITIVO</h2>
              <table>
                <tbody>
                  <tr>
                    <th>Nombre del dispositivo</th>
                    <td>{deviceDetails.nombre}</td>
                  </tr>
                  <tr>
                    <th>Descripción del dispositivo</th>
                    <td>{deviceDetails.descripcion}</td>
                  </tr>
                  <tr>
                    <th>Precio</th>
                    <td>$ {deviceDetails.precio}</td>
                  </tr>
                  <tr>
                    <th>Nombres y Apellidos</th>
                    <td>{deviceDetails.usuario} {deviceDetails.apellido}</td>
                  </tr>
                  <tr>
                    <th>Correo electrónico</th>
                    <td>{deviceDetails.correo}</td>
                  </tr>
                  <tr>
                    <th>DNI</th>
                    <td>{deviceDetails.dni}</td>
                  </tr>
                  <tr>
                    <th>Estado de reparación</th>
                    <td>{deviceDetails.estado}</td>
                  </tr>
                  <tr>
                    <th>Fecha de Inicio</th>
                    <td>{deviceDetails.fecha_inicio}</td>
                  </tr>
                  <tr>
                    <th>Fecha de Finilizacion</th>
                    <td>{deviceDetails.fecha_estimada_finalizacion}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={handleDownloadPDF}>Descargar Detalles (PDF)</button>
            </div>
          </div>
        )}
        {isModalOpen && (
          <div className="modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
              <h2>Iniciar Sesión</h2>
              <form className='formularioLogin' onSubmit={(event) => {
                event.preventDefault();
                handleAuthentication(username, password);
              }}>
                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className={loginError ? 'error' : ''}
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={loginError ? 'error' : ''}
                />
                {loginError && <p className="error-message">Credenciales incorrectas. Inténtelo de nuevo.</p>}
                <button className='buttoninicio' type="submit">Iniciar</button>
              </form>
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
