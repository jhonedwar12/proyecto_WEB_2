import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getTaller(req, res) {
  try {
    const response = await conexion.pool.query('SELECT * FROM taller');
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener taller' });
  }
}

export async function postTaller(req, res) {
  try {
    const { idtaller, nombre, direccion, telefono } = req.body;
    const response = await conexion.pool.query('INSERT INTO taller (idtaller, nombre, direccion, telefono) VALUES ($1, $2, $3, $4)',
      [idtaller, nombre, direccion, telefono]);
    res.json({
      message: 'Se agregó Taller',
      body: {
        taller: { idtaller, nombre, direccion, telefono }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar Taller' });
  } finally {
  }
}

export async function deleteTaller(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM taller WHERE idtaller = $1', [id]);
    res.json({
      message: 'Taller borrado',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al borrar Taller' });
  } finally {
  }
}

export async function updateTaller(req, res) {
  try {
    const { idtaller, nombre, direccion, telefono } = req.body;
    const response = await conexion.pool.query('UPDATE taller SET nombre = $1, direccion = $2, telefono = $3 WHERE idtaller = $4',
      [nombre, direccion, telefono, idtaller]);
    res.json({
      message: 'Taller actualizado correctamente',
      body: {
        taller: { idtaller, nombre, direccion, telefono },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar Taller' });
  } finally {
  }
}

export default { getTaller, postTaller, deleteTaller, updateTaller };
