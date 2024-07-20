import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getConsecionarios(req, res) {
  try {
    const response = await conexion.pool.query('SELECT * FROM consecionario');
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener consecionarios' });
  }
}

export async function postConsecionario(req, res) {

    try {
      const {  idconsecionario, direccion, telefono, nombre} = req.body;

      const response = await conexion.pool.query('INSERT INTO consecionario VALUES($1,$2,$3,$4)', [ idconsecionario, direccion, telefono, nombre]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'Consecionario agregada correctamente',
        body: {
          fila: { idconsecionario, direccion, telefono, nombre}
        }
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al agregar fila' });
    }
  }

export async function deleteConsecionario(req, res) {
    try {
      const id = req.params.id;

      const response = await conexion.pool.query('DELETE FROM consecionario WHERE Id_Fila = $1', [id]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'Consecionario eliminada correctamente',
        body: {
          id,
        },
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar Consecionario' });
    }
  }

export async function updateConsecionario(req, res) {
    try {
      const { idconsecionario, direccion, telefono, nombre } = req.body;

      const response = await conexion.pool.query('UPDATE consecionario SET direccion = $1, telefono = $2, nombre=$3 WHERE idconsecionario = $3',
        [direccion, telefono, nombre, idconsecionario ]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'consecionario actualizada correctamente',
        body: {
          Consecionario: {idconsecionario, direccion, telefono, nombre},
        },
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar consecionario' });
    }
  }
export default { getConsecionarios, postConsecionario, deleteConsecionario, updateConsecionario };
