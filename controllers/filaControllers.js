import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getFilas(req, res) {
  try {
    const response = await conexion.pool.query('SELECT * FROM Fila');
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener filas' });
  }
}

export async function postFila(req, res) {

    try {
      const { Id_Fila, Id_Sala, Numero_Fila } = req.body;

      const response = await conexion.pool.query('INSERT INTO Fila VALUES($1, $2,$3)', [ Id_Fila, Id_Sala, Numero_Fila]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'Fila agregada correctamente',
        body: {
          fila: { Id_Fila, Id_Sala, Numero_Fila}
        }
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al agregar fila' });
    }
  }

export async function deleteFila(req, res) {
    try {
      const id = req.params.id;

      const response = await conexion.pool.query('DELETE FROM Fila WHERE Id_Fila = $1', [id]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'Fila eliminada correctamente',
        body: {
          id,
        },
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar fila' });
    }
  }

export async function updateFila(req, res) {
    try {
      const { Id_Fila, Id_Sala, Numero_Fila } = req.body;

      const response = await conexion.pool.query('UPDATE Fila SET Id_Sala = $1, Numero_Fila = $2 WHERE Id_Fila = $3', [Id_Sala, Numero_Fila, Id_Fila]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'Fila actualizada correctamente',
        body: {
          fila: { Id_Fila, Id_Sala, Numero_Fila },
        },
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar fila' });
    }
  }
export default { getFilas, postFila, deleteFila, updateFila };
