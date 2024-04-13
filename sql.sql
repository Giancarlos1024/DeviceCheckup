CREATE DATABASE IF NOT EXISTS DeviceCheckupDB;
CREATE TABLE Dispositivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre NVARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre NVARCHAR(255) NOT NULL,
    apellido NVARCHAR(255) NOT NULL,
    correo NVARCHAR(255),
    dni NVARCHAR(20)
);

CREATE TABLE EstadosReparacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre NVARCHAR(50) NOT NULL
);

CREATE TABLE Reparaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_ticket NVARCHAR(50) NOT NULL,
    dispositivo_id INT,
    usuario_id INT,
    fecha_inicio DATETIME NOT NULL,
    fecha_estimada_finalizacion DATETIME,
    estado_id INT
);

INSERT INTO Dispositivos (nombre, descripcion, precio)
VALUES
('Smartphone', 'Teléfono inteligente con pantalla táctil', 599.99),
('Tablet', 'Tableta con sistema operativo Android', 399.99),
('Laptop', 'Portátil ligero y potente', 999.99);

INSERT INTO Usuarios (nombre, apellido, correo, dni)
VALUES
('Juan', 'Perez', 'juan@example.com', '12345678'),
('María', 'Gomez', 'maria@example.com', '87654321'),
('Carlos', 'Lopez', 'carlos@example.com', '54321678');

INSERT INTO EstadosReparacion (nombre)
VALUES
('En progreso'),
('Completada'),
('Pendiente');

INSERT INTO Reparaciones (codigo_ticket, dispositivo_id, usuario_id, fecha_inicio, fecha_estimada_finalizacion, estado_id)
VALUES
('TICKET-001', 1, 1, '2022-03-28 10:00:00', '2022-03-30 12:00:00', 1),
('TICKET-002', 2, 2, '2022-03-29 09:00:00', '2022-03-31 10:00:00', 3),
('TICKET-003', 3, 3, '2022-03-30 08:00:00', '2022-04-01 11:00:00', 2);