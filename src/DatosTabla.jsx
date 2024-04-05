import React, { useState, useEffect } from 'react';
import './css/DatosTabla.css';

function DatosTabla() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/datos');
      if (response.ok) {
        const data = await response.json();
        setDatos(data);
      } else {
        console.error('Error al obtener datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handleUpdate = async (codigoTicket) => {
    try {
      // Lógica para actualizar datos
    } catch (error) {
      console.error('Error al actualizar datos:', error);
    }
  };

  const handleDelete = async (codigoTicket) => {
    try {
      const response = await fetch(`http://localhost:3000/eliminarDatos/${codigoTicket}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Datos eliminados exitosamente');
        // Volver a cargar los datos después de eliminar
        fetchData();
      } else {
        console.error('Error al eliminar datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar datos:', error);
    }
  };
  

  return (
    <div className='container-tabla'>
      <h2>Datos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>DNI</th>
            <th>Dispositivo</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Código Ticket</th>
            <th>Fecha Inicio</th>
            <th>Fecha Finalización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato, index) => (
            <tr key={index}>
              <td>{dato.nombreUsuario}</td>
              <td>{dato.apellidoUsuario}</td>
              <td>{dato.correoUsuario}</td>
              <td>{dato.dniUsuario}</td>
              <td>{dato.nombreDispositivo}</td>
              <td>{dato.descripcionDispositivo}</td>
              <td>{dato.precioDispositivo}</td>
              <td>{dato.nombreEstado}</td>
              <td>{dato.codigoTicket}</td>
              <td>{new Date(dato.fechaInicio).toLocaleString()}</td>
              <td>{new Date(dato.fechaEstimadaFinalizacion).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(dato.codigoTicket)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DatosTabla;
