import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getVehiculos(req, res) {
  try {
    const response = await conexion.pool.query('SELECT * FROM Vehiculos');
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener Vehiculos' });
  }
}

export async function postVehiculo(req, res) {
  try {
    const { idvehiculo, marca, modelo, placa, precio } = req.body;
    const response = await conexion.pool.query('INSERT INTO Vehiculos VALUES ($1, $2, $3, $4, $5)',
      [idvehiculo, marca, modelo, placa, precio]);
    res.json({
      message: 'Vehiculo agregado correctamente',
      body: {
        vehiculo: { idvehiculo, marca, modelo, placa, precio }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar Vehiculo' });
  }
}

export async function deleteVehiculo(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM Vehiculos WHERE idvehiculo = $1', [id]);
    res.json({
      message: 'Vehiculo eliminado correctamente',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar Vehiculo' });
  }
}

export async function updateVehiculo(req, res) {
  try {
    const { idvehiculo, marca, modelo, placa, precio } = req.body;
    const response = await conexion.pool.query('UPDATE Vehiculos SET marca = $1, modelo = $2, placa = $3, precio = $4 WHERE idvehiculo = $5',
      [marca, modelo, placa, precio, idvehiculo]);
    res.json({
      message: 'Vehiculo actualizado correctamente',
      body: {
        vehiculo: { idvehiculo, marca, modelo, placa, precio },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar Vehiculo' });
  }
}

export default { getVehiculos, postVehiculo, deleteVehiculo, updateVehiculo };
