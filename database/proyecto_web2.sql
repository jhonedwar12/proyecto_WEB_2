CREATE TABLE Pelicula (
    Id_Pelicula SERIAL PRIMARY KEY,
    Titulo VARCHAR(255) NOT NULL,
    Duracion INT NOT NULL,
    Genero VARCHAR(100),
    Sinopsis TEXT
);

CREATE TABLE Sala (
    Id_Sala SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Capacidad INT NOT NULL
);

CREATE TABLE Fila (
    Id_Fila SERIAL PRIMARY KEY,
    Id_Sala INT REFERENCES Sala(Id_Sala) ON DELETE CASCADE,
    Numero_Fila INT NOT NULL
);

CREATE TABLE Asiento (
    Id_Asiento SERIAL PRIMARY KEY,
    Id_Fila INT REFERENCES Fila(Id_Fila) ON DELETE CASCADE,
    Numero_Asiento INT NOT NULL
);

CREATE TABLE Localidad (
    Id_Localidad SERIAL PRIMARY KEY,
    Id_Sala INT REFERENCES Sala(Id_Sala) ON DELETE CASCADE,
    Id_Fila INT REFERENCES Fila(Id_Fila) ON DELETE CASCADE,
    Precio DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Funcion (
    Id_Funcion SERIAL PRIMARY KEY,
    Hora TIME NOT NULL,
    Id_Pelicula INT REFERENCES Pelicula(Id_Pelicula) ON DELETE CASCADE,
    Id_Sala INT REFERENCES Sala(Id_Sala) ON DELETE CASCADE
);

CREATE TABLE Cine (
    Id_Cine SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Taquillero (
    Id_Taquillero SERIAL PRIMARY KEY,
    Id_Cine INT REFERENCES Cine(Id_Cine) ON DELETE CASCADE,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL
);

CREATE TABLE Cliente (
    Id_Cliente SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL
);

CREATE TABLE Venta (
    Id_Venta SERIAL PRIMARY KEY,
    Id_Cliente INT REFERENCES Cliente(Id_Cliente) ON DELETE CASCADE,
    Id_Asiento INT REFERENCES Asiento(Id_Asiento) ON DELETE CASCADE,
    Id_Funcion INT REFERENCES Funcion(Id_Funcion) ON DELETE CASCADE,
    Id_Pelicula INT REFERENCES Pelicula(Id_Pelicula) ON DELETE CASCADE,
    Id_Taquillero INT REFERENCES Taquillero(Id_Taquillero) ON DELETE CASCADE,
    Fecha_Venta DATE NOT NULL,
    Total DECIMAL(10, 2) NOT NULL,
    CONSTRAINT unique_asiento_funcion UNIQUE (Id_Asiento, Id_Funcion)
);
