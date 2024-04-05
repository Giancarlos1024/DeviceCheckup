import React, { useState } from 'react';
import './css/Admin.css';
import { Link } from 'react-router-dom';
import DatosTabla from './DatosTabla';
function Admin() {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    apellidoUsuario: '',
    correoUsuario: '',
    dniUsuario: '',
    nombreDispositivo: '',
    descripcionDispositivo: '',
    precioDispositivo: '',
    nombreEstado: '',
    codigoTicket: '',
    fechaInicio: '',
    fechaEstimadaFinalizacion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        fechaInicio: new Date(formData.fechaInicio).toISOString(),
        fechaEstimadaFinalizacion: new Date(formData.fechaEstimadaFinalizacion).toISOString()
      };
  
      const response = await fetch('http://localhost:3000/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });
      if (response.ok) {
        console.log('Datos creados exitosamente');
        // Limpiar el formulario después de la creación exitosa
        setFormData({
          nombreUsuario: '',
          apellidoUsuario: '',
          correoUsuario: '',
          dniUsuario: '',
          nombreDispositivo: '',
          descripcionDispositivo: '',
          precioDispositivo: '',
          nombreEstado: '',
          codigoTicket: '',
          fechaInicio: '',
          fechaEstimadaFinalizacion: ''
        });
      } else {
        console.error('Error al crear datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear datos:', error);
    }
  };
  
  return (
    <div>
      <div className="admin-container">
      <h1>Panel de Administrador</h1>
      <Link to="/">Home</Link>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <h2>Crear Usuario</h2>
          <input type="text" name="nombreUsuario" placeholder="Nombre" value={formData.nombreUsuario} onChange={handleChange} />
          <input type="text" name="apellidoUsuario" placeholder="Apellido" value={formData.apellidoUsuario} onChange={handleChange} />
          <input type="email" name="correoUsuario" placeholder="Correo" value={formData.correoUsuario} onChange={handleChange} />
          <input type="text" name="dniUsuario" placeholder="DNI" value={formData.dniUsuario} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <h2>Crear Dispositivo</h2>
          <input type="text" name="nombreDispositivo" placeholder="Nombre" value={formData.nombreDispositivo} onChange={handleChange} />
          <input type="text" name="descripcionDispositivo" placeholder="Descripción" value={formData.descripcionDispositivo} onChange={handleChange} />
          <input type="text" name="precioDispositivo" placeholder="Precio" value={formData.precioDispositivo} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <h2>Crear Estado de Reparación</h2>
          <p>En progreso, Completada, Pendiente</p><br />
          <input type="text" name="nombreEstado" placeholder="Nombre" value={formData.nombreEstado} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <h2>Crear Reparación</h2>
          <input type="text" name="codigoTicket" placeholder="Código del Ticket" value={formData.codigoTicket} onChange={handleChange} />
          <input type="datetime-local" name="fechaInicio" placeholder="Fecha de Inicio" value={formData.fechaInicio} onChange={handleChange} />
          <input type="datetime-local" name="fechaEstimadaFinalizacion" placeholder="Fecha Estimada de Finalización" value={formData.fechaEstimadaFinalizacion} onChange={handleChange} />
        </div>
        
        <button type="submit" className="admin-button">Crear Datos</button>
      </form>
      </div>
      <DatosTabla />
    </div>
  );
}

export default Admin;
