CREATE TABLE clientes (
  idcliente INT PRIMARY KEY,
  correo VARCHAR(50) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  idconsecionario INT,
  FOREIGN KEY (idconsecionario) REFERENCES consecionario(idconsecionario) ON DELETE CASCADE
);

CREATE TABLE almacen (
  id_almacen INT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  direccion VARCHAR(100) NOT NULL
);
CREATE TABLE detalle (
  iddetalle SERIAL PRIMARY KEY,
  idventa INT NOT NULL,
  idproducto INT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  cantidad INT NOT NULL,
  tipo VARCHAR(20) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (idventa) REFERENCES ventas(idventa) ON DELETE CASCADE,
  FOREIGN KEY (idproducto) REFERENCES productos(idproducto) ON DELETE CASCADE
);


CREATE TABLE consecionario (
  idconsecionario INT PRIMARY KEY,
  direccion VARCHAR(50) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  nombre VARCHAR(50) NOT NULL
);

CREATE TABLE insumos (
  idinsumo INT PRIMARY KEY,
  descripcion VARCHAR(100) NOT NULL,
  preciounitario DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL,
  idalmacen INT NOT NULL,
  FOREIGN KEY (idalmacen) REFERENCES almacen(idalmacen) ON DELETE CASCADE
);

CREATE TABLE persona (
  idpersona INT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  edad INT,
  categoria VARCHAR(20) NOT NULL
);

CREATE TABLE productos (
  idproducto INT PRIMARY KEY,
  idinsumo INT,
  idvehiculo INT,
  tipo VARCHAR(50) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (idinsumo) REFERENCES insumos(idinsumo) ON DELETE CASCADE,
  FOREIGN KEY (idvehiculo) REFERENCES vehiculos(idvehiculo) ON DELETE CASCADE
);

CREATE TABLE producto_taller (
  idproducto_taller SERIAL PRIMARY KEY,
  idtaller INT NOT NULL,
  idproductoS INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (idtaller) REFERENCES taller(idtaller) ON DELETE CASCADE,
  FOREIGN KEY (idproductoS) REFERENCES productos(idproducto) ON DELETE CASCADE
);

CREATE TABLE taller (
  idtaller INT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL
);

CREATE TABLE vehiculos (
  idvehiculo INT PRIMARY KEY,
  marca VARCHAR(50) NOT NULL,
  modelo VARCHAR(50) NOT NULL,
  placa VARCHAR(20) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL
);

CREATE TABLE vendedores (
  idvendedor INT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  idconcesionario INT,
  edad INT NOT NULL,
  FOREIGN KEY (idconcesionario) REFERENCES concesionarios(idconcesionario) ON DELETE CASCADE
);

CREATE TABLE ventas (
  idventa SERIAL PRIMARY KEY,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  total DECIMAL(10, 2) NOT NULL,
  idCliente INT,
  idVendedor INT,
  FOREIGN KEY (idCliente) REFERENCES clientes(idCliente) ON DELETE CASCADE,
  FOREIGN KEY (idVendedor) REFERENCES vendedores(idVendedor) ON DELETE CASCADE
);


INSERT INTO consecionario (idconsecionario, direccion, telefono, nombre)
VALUES
    (1, 'Av. 10 de Agosto, Quito', 02-2525252, 'Concesionario Quito'),
    (2, 'Calle Larga, Cuenca', 07-3333333, 'Concesionario Cuenca'),
    (3, 'Av. de la Independencia, Guayaquil', 04-4444444, 'Concesionario Guayaquil'),
    (4, 'Av. 12 de Octubre, Manta', 05-5555555, 'Concesionario Manta'),
    (5, 'Calle Central, Loja', 07-6666666, 'Concesionario Loja');

INSERT INTO Clientes (idcliente, correo, nombre, apellido, direccion, telefono, idconsecionario)
VALUES
    (1, 'j.edwar.morales2015@gmail.com', 'edwar', 'morales', 'Av. 10 de Agosto, Quito', '0999123456', 1),
    (2, 'diego.franco@ucaldas.edu.co', 'diego', 'franco', 'Calle Larga, Cuenca', '0999987654', 2),
    (3, 'michaelbrown@example.com', 'Michael', 'Brown', 'Av. de la Independencia, Guayaquil', '0999234567', 3),
    (4, 'emilydavis@example.com', 'Emily', 'Davis', 'Av. 12 de Octubre, Manta', '0999456789', 4),
    (5, 'sarahlee@example.com', 'Sarah', 'Lee', 'Calle Central, Loja', '0999123678', 5);

INSERT INTO Almacen (id_almacen, nombre, direccion)
VALUES
    (1, 'Almacen Quito', 'Av. 10 de Agosto, Quito'),
    (2, 'Almacen Cuenca', 'Calle Larga, Cuenca'),
    (3, 'Almacen Guayaquil', 'Av. de la Independencia, Guayaquil'),
    (4, 'Almacen Manta', 'Av. 12 de Octubre, Manta'),
    (5, 'Almacen Loja', 'Calle Central, Loja');

INSERT INTO Vendedores (idvendedor, nombre, apellido, direccion, telefono, idconsecionario, edad)
VALUES
    (1, 'Juan', 'Pérez', 'Av. 10 de Agosto, Quito', '0999123456', 1, 30),
    (2, 'María', 'Rodríguez', 'Calle Larga, Cuenca', '0999987654', 2, 28),
    (3, 'Carlos', 'Gómez', 'Av. de la Independencia, Guayaquil', '0999234567', 3, 35),
    (4, 'Ana', 'Sánchez', 'Av. 12 de Octubre, Manta', '0999456789', 4, 25),
    (5, 'Luis', 'Torres', 'Calle Central, Loja', '0999123678', 5, 32);

INSERT INTO Vehiculos (idvehiculo, marca, modelo, placa, precio)
VALUES
    (1, 'Toyota', 'Corolla', 'PBA-0123', 25000.00),
    (2, 'Honda', 'Civic', 'GBA-4567', 20000.00),
    (3, 'Nissan', 'Sentra', 'MVA-8901', 22000.00),
    (4, 'Ford', 'Focus', 'LBA-2345', 18000.00),
    (5, 'Chevrolet', 'Aveo', 'MBA-6789', 19000.00);

INSERT INTO Insumos (idinsumo, descripcion, preciounitario, stock, idalmacen)
VALUES
    (1, 'Aceite de motor', 5000.00, 100, 1),
    (2, 'Filtro de aire', 10000.00, 50, 2),
    (3, 'Llanta de repuesto', 20000.00, 20, 3),
    (4, 'Batería de arranque', 30000.00, 30, 1),
    (5, 'Kit de herramientas', 40000.00, 10, 2);

INSERT INTO Taller (idtaller, nombre, direccion, telefono)
VALUES
    (1, 'Taller Mécanico', 'Av. Principal 123', 555-1234),
    (2, 'Reparaciones Rápido', 'Calle 2da 456', 555-5678),
    (3, 'Servicio Técnico', 'Av. Independencia 789', 555-9012),
    (4, 'Taller de Confiar', 'Calle 5ta 101', 555-1111),
    (5, 'Centro de Reparación', 'Av. Libertad 234', 555-2222);

INSERT INTO Producto_Taller (idtaller, idproductos, valor)
VALUES
    (1, 1, 500.00),
    (1, 2, 300.00),
    (1, 3, 200.00),
    (2, 1, 450.00),
    (2, 4, 250.00),
    (5, 1, 480.00);



-- Trigger y función para after_delete_vendedor
CREATE OR REPLACE FUNCTION public.delete_null_idvendedor()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    DELETE FROM Persona WHERE IdVendedor IS NULL;
    RETURN NULL;
END;
$function$;

CREATE TRIGGER after_delete_vendedor
AFTER DELETE ON public.vendedores
FOR EACH ROW
EXECUTE FUNCTION delete_null_idvendedor();

-- Trigger y función para trigger_insertar_en_vendedor
CREATE OR REPLACE FUNCTION public.insertar_en_vendedor()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO Persona (nombre, edad, categoria, idcliente, idvendedor)
    VALUES (NEW.nombre, NEW.edad, 'vendedores', NULL, NEW.idvendedor);
    RETURN NEW;
END;
$function$;

CREATE TRIGGER trigger_insertar_en_vendedor
AFTER INSERT ON public.vendedores
FOR EACH ROW
EXECUTE FUNCTION insertar_en_vendedor();

-- Trigger y función para trigger_insertar_en_cliente
CREATE OR REPLACE FUNCTION public.insertar_en_cliente()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO Persona (nombre, edad, categoria, idcliente, idvendedor)
    VALUES (NEW.nombre, NULL, 'cliente', NEW.idcliente, NULL);
    RETURN NEW;
END;
$function$;

CREATE TRIGGER trigger_insertar_en_cliente
AFTER INSERT ON public.clientes
FOR EACH ROW
EXECUTE FUNCTION insertar_en_cliente();

-- Trigger y función para after_delete_persona
CREATE OR REPLACE FUNCTION public.delete_null_idpersona()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    DELETE FROM Ventas WHERE IdPersona IS NULL;
    RETURN NULL;
END;
$function$;

CREATE TRIGGER after_delete_persona
AFTER DELETE ON public.persona
FOR EACH ROW
EXECUTE FUNCTION delete_null_idpersona();

-- Trigger y función para trigger_insertar_en_productos_vehiculo
CREATE OR REPLACE FUNCTION public.insertar_en_productos_vehiculo()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO productos (idinsumo, idvehiculo, tipo, precio)
    VALUES (NULL, NEW.idvehiculo, 'vehiculos', NEW.precio);
    RETURN NEW;
END;
$function$;

CREATE TRIGGER trigger_insertar_en_productos_vehiculo
AFTER INSERT ON public.vehiculos
FOR EACH ROW
EXECUTE FUNCTION insertar_en_productos_vehiculo();

-- Trigger y función para trigger_insertar_en_productos_insumo
CREATE OR REPLACE FUNCTION public.insertar_en_productos_insumo()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO productos (idinsumo, idvehiculo, tipo, precio)
    VALUES (NEW.idinsumo, NULL, 'insumo', NEW.preciounitario);
    RETURN NEW;
END;
$function$;

CREATE TRIGGER trigger_insertar_en_productos_insumo
AFTER INSERT ON public.insumos
FOR EACH ROW
EXECUTE FUNCTION insertar_en_productos_insumo();
