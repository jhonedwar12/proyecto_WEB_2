
import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getAlmacen(req, res) {
  try {
    const response = await conexion.pool.query('SELECT * FROM Almacen');
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener Almacen' });
  }
}

export async function postAlmacen(req, res) {

    try {
      const {  id_almacen,nombre,direccion} = req.body;

      const response = await conexion.pool.query('INSERT INTO Almacen VALUES($1,$2,$3)',
        [  id_almacen,nombre,direccion]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'Almacen agregada correctamente',
        body: {
          almacen: {  id_almacen,nombre,direccion}
        }
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al agregar Almacen' });
    }
  }

export async function deleteAlmacen(req, res) {
    try {
      const id = req.params.id;

      const response = await conexion.pool.query('DELETE FROM Almacen WHERE Id_Fila = $1', [id]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'Almacen eliminada correctamente',
        body: {
          id,
        },
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar Almacen' });
    }
  }

export async function updateAlmacen(req, res) {
    try {
      const { id_almacen,nombre,direccion} = req.body;

      const response = await conexion.pool.query('UPDATE Almacen SET nombre=$1,direccion=$2 WHERE id_almacen = $3',
        [nombre,direccion, id_almacen]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'Almacen actualizada correctamente',
        body: {
          Consecionario: {idconsecionario, direccion, telefono, nombre},
        },
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar Almacen' });
    }
  }
export default { getAlmacen, postAlmacen, deleteAlmacen, updateAlmacen };
