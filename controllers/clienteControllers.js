import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getClientes(req, res) {
  const response = await conexion.pool.query('SELECT * FROM Cliente');
  res.json(response.rows);
}

export async function postCliente(req, res) {
  try {
    const { Id_Cliente, Nombre, Apellido } = req.body;
    const response = await conexion.pool.query('INSERT INTO Cliente VALUES($1, $2, $3)', [Id_Cliente, Nombre, Apellido]);
    res.json({
      message: 'Cliente agregado correctamente',
      body: {
        cliente: { Id_Cliente, Nombre, Apellido }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar cliente' });
  }finally {
    await conexion.pool.end();
  }
}

export async function deleteCliente(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM Cliente WHERE Id_Cliente = $1', [id]);
    res.json({
      message: 'Cliente eliminado correctamente',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar cliente' });
  }finally {
    await pool.end();
  }
}

export async function updateCliente(req, res) {
  try {
    const { Id_Cliente, Nombre, Apellido } = req.body;
    const response = await conexion.pool.query('UPDATE Cliente SET Nombre = $1, Apellido = $2 WHERE Id_Cliente = $3', [Nombre, Apellido, Id_Cliente]);
    res.json({
      message: 'Cliente actualizado correctamente',
      body: {
        cliente: { Id_Cliente, Nombre, Apellido },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }finally {
    await pool.end();
  }
}

export default { getClientes, postCliente, deleteCliente, updateCliente };
