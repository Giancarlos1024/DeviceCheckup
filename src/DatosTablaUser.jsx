import React, { useState, useEffect } from 'react';
import './css/DatosTablaUser.css';

const DatosTablaUser = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null); // ID del usuario que se está editando
  const [editedUser, setEditedUser] = useState({}); // Datos editados del usuario
  const [showModal, setShowModal] = useState(false); // Estado del modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Error al obtener los datos de los usuarios:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditedUser({ ...user });
    setShowModal(true); // Mostrar el modal al editar usuario
  };

  const handleSaveUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${editedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });
      if (response.ok) {
        // Actualizar el usuario en la lista después de la edición exitosa
        setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)));
        setEditUserId(null); // Finalizar la edición
        setShowModal(false); // Ocultar el modal después de guardar
        console.log('Usuario editado exitosamente.');
      } else {
        console.error('Error al editar el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red al editar el usuario:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Eliminar el usuario de la lista después de la eliminación exitosa
        setUsers(users.filter((user) => user.id !== userId));
        console.log('Usuario eliminado exitosamente.');
      } else {
        console.error('Error al eliminar el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red al eliminar el usuario:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditUserId(null); // Cancelar la edición
    setShowModal(false); // Ocultar el modal al cancelar
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
   <div className='container-tabla' style={{ margin: '0px', marginTop: '20px' }}>
      <h2>Registro de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{editUserId === user.id ? <input type="text" name="usuario" value={editedUser.usuario} onChange={handleInputChange} /> : user.usuario}</td>
              <td>{editUserId === user.id ? <input type="password" name="contrasena" value={editedUser.contrasena} onChange={handleInputChange} /> : user.contrasena}</td>
              <td>{editUserId === user.id ? <input type="text" name="tipo" value={editedUser.tipo} onChange={handleInputChange} /> : user.tipo}</td>
              <td>
                {editUserId === user.id ? (
                  <>
                    <button onClick={handleSaveUser}>Guardar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditUser(user)}>Editar</button>
                    <button className='buttonTablaUser' onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar usuario */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Usuario</h2>
            <form>
              <label>
                Usuario:
                <input type="text" name="usuario" value={editedUser.usuario} onChange={handleInputChange} />
              </label>
              <label>
                Contraseña:
                <input type="password" name="contrasena" value={editedUser.contrasena} onChange={handleInputChange} />
              </label>
              <label>
                Tipo:
                <input type="text" name="tipo" value={editedUser.tipo} onChange={handleInputChange} />
              </label>
              <button type="button" onClick={handleSaveUser}>Guardar</button>
              <button type="button" onClick={handleCancelEdit}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatosTablaUser;
