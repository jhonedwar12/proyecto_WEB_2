import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getFuncion(req, res) {
  try {
    const response = await conexion.pool.query('SELECT * FROM Funcion');
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener funcion' });
  }
}

export async function postFuncion(req, res) {
  try {
    const {  Hora, Id_Pelicula,Id_Sala } = req.body;
    await conexion.pool.query('BEGIN');
    try {
      const response = await conexion.pool.query('INSERT INTO Funcion VALUES($1, $2, $3)', [Hora, Id_Pelicula,Id_Sala]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'funcion agregada correctamente',
        body: {
          fila: { Id_Fila, Id_Sala, Numero_Fila }
        }
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al agregar funcion' });
    }
  } finally {
    await conexion.desconectar();
  }
}

export async function deleteFuncion(req, res) {
  try {
    const id = req.params.id;
    await conexion.pool.query('BEGIN');
    try {
      const response = await conexion.pool.query('DELETE FROM Funcion WHERE Id_Funcion = $1', [id]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'funcion eliminada correctamente',
        body: {
          id,
        },
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar funcion' });
    }
  } finally {
    await conexion.desconectar();
  }
}

export async function updateFuncion(req, res) {
  try {
    const { Id_Funcion, Hora, Id_Pelicula,Id_Sala } = req.body;
    await conexion.pool.query('BEGIN');
    try {
      const response = await conexion.pool.query('UPDATE Funcion SET Hora = $1, Id_Pelicula = $2, Id_Sala=$3 WHERE Id_Funcion = $4', [Hora, Id_Pelicula,Id_Sala, Id_Funcion]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'funcion actualizada correctamente',
        body: {
          Localidad: { Id_Localidad,  Id_Sala,Id_Fila, Precio },
        },
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar funcion' });
    }
  } finally {
    await conexion.desconectar();
  }
}

export default { getFuncion, postFuncion, deleteFuncion, updateFuncion };
