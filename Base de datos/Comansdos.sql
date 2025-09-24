-- Incremento 1: Usuarios
CREATE TABLE Roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);
CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    id_rol INT REFERENCES Roles(id_rol),
    fecha_registro TIMESTAMP DEFAULT NOW()
);
CREATE TABLE Zonas (
    id_zona SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    activa BOOLEAN DEFAULT TRUE
);
CREATE TABLE Repartidores_zonas (
    id_repartidor_zona SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuarios(id_usuario),
    id_zona INT REFERENCES Zonas(id_zona)
);
-- Incremento 2: Pedidos
CREATE TABLE Productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);
CREATE TABLE Pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES Usuarios(id_usuario),
    id_repartidor INT REFERENCES Usuarios(id_usuario),
    fecha_pedido TIMESTAMP DEFAULT NOW(),
    estado VARCHAR(50) DEFAULT 'Pendiente',
    costo_envio NUMERIC(10,2) DEFAULT 0,
    impuestos NUMERIC(10,2) DEFAULT 0,
    total NUMERIC(10,2) DEFAULT 0
);
CREATE TABLE Detalle_pedidos (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INT REFERENCES Pedidos(id_pedido) ON DELETE CASCADE,
    id_producto INT REFERENCES Productos(id_producto),
    cantidad INT NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL
);
-- Incremento 3: Pagos
CREATE TABLE Metodos_pago (
    id_metodo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);
CREATE TABLE Pagos (
    id_pago SERIAL PRIMARY KEY,
    id_pedido INT REFERENCES Pedidos(id_pedido),
    id_metodo INT REFERENCES Metodos_pago(id_metodo),
    monto NUMERIC(10,2) NOT NULL,
    fecha_pago TIMESTAMP DEFAULT NOW(),
    estado VARCHAR(50) DEFAULT 'Pendiente'
);

-- Roles
INSERT INTO Roles (nombre, descripcion)
VALUES 
  ('Administrador','Usuario con privilegios completos'),
  ('Cliente','Usuario que hace pedidos'),
  ('Repartidor','Usuario que entrega pedidos');


