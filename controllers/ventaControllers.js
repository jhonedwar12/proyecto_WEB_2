import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getBoletas(req, res) {
  const response = await conexion.pool.query('SELECT * FROM Venta');
  res.json(response.rows);
}

export async function postBoleta(req, res) {
  try {
    const { Id_Asiento,Id_Funcion, Id_Pelicula, Id_Taquillero, Fecha_Venta, Total} = req.body;
    const response = await conexion.pool.query('INSERT INTO Venta VALUES($1, $2, $3, $4, $5, $6, $7)', [Id_Asiento,Id_Funcion, Id_Pelicula, Id_Taquillero, Fecha_Venta, Total]);
    res.json({
      message: 'Boleta agregada correctamente',
      body: {
        boleta: { Id_Asiento,Id_Funcion, Id_Pelicula, Id_Taquillero, Fecha_Venta, Total }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar boleta' });
  }finally {
    await conexion.desconectar();
  }
}

export async function deleteBoleta(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM Venta WHERE Id_Venta = $1', [id]);
    res.json({
      message: 'Boleta eliminada correctamente',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar boleta' });
  }finally {
    await conexion.desconectar();
  }
}

export async function updateBoleta(req, res) {
  try {
    const {Id_Venta, Id_Asiento,Id_Funcion, Id_Pelicula, Id_Taquillero, Fecha_Venta, Total } = req.body;
    const response = await pool.query('UPDATE Venta SET Id_Asiento = $1, Id_Funcion = $2, Id_Pelicula = $3, Id_Taquillero = $4, Fecha_Venta = $5, Total = $6 WHERE Id_Venta = $7', [Id_Asiento,Id_Funcion, Id_Pelicula, Id_Taquillero, Fecha_Venta, Total,Id_Venta]);
    res.json({
      message: 'Boleta actualizada correctamente',
      body: {
        boleta: {Id_Venta, Id_Asiento,Id_Funcion, Id_Pelicula, Id_Taquillero, Fecha_Venta, Total },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar boleta' });
  }finally {
    await pool.end();
  }
}

export default { getBoletas, postBoleta, deleteBoleta, updateBoleta };
