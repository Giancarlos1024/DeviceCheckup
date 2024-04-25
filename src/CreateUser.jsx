import React, { useState } from 'react';
import './css/CreateUser.css';


const CreateUser = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
    userType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.contrasena.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Usuario creado exitosamente');
        // Aquí puedes realizar alguna acción adicional, como mostrar un mensaje de éxito
        // Luego de enviar los datos, podrías limpiar el formulario
        setFormData({
          usuario: '',
          contrasena: '',
          userType: ''
        });
      } else {
        console.error('Error al crear el usuario:', response.statusText);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error de red:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className='divCreateUser'>
      <form className='UserForm' onSubmit={handleSubmit}>
        <h4 className='DataUser'>Datos Usuarios</h4>
        <div className='divfor'>
          <input
            type="text"
            name="usuario"
            placeholder='Usuario'
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className='divfor'>
          <input
            type="text"
            name="contrasena"
            placeholder='Contraseña'
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </div>
        <div className='divfor'>
          <h4>Tipo</h4>
          <select name="userType" value={formData.userType} onChange={handleChange}>
            <option >Selección</option>
            <option value="Admin">Admin</option>
            <option value="Gerente">Gerente</option>
            <option value="Tecnico">Tecnico</option>
          </select>
        </div>
        <button type="submit" className='buttonUser'>Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;
