import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getClientes(req, res) {
  const response = await conexion.pool.query('SELECT * FROM Clientes');
  res.json(response.rows);
}

export async function postCliente(req, res) {
  try {
    const { idcliente,correo, nombre, apellido, direccion, telefono,idconsecionario} = req.body;
    const response = await conexion.pool.query('INSERT INTO Clientes VALUES($1, $2, $3, $4, $5,$6,$7)',
       [ idcliente,correo, nombre, apellido, direccion, telefono,idconsecionario]);
    res.json({
      message: 'Cliente agregado correctamente',
      body: {
        cliente: { idcliente,correo, nombre, apellido, direccion, telefono}
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar cliente' });
  }finally {
  }
}

export async function deleteCliente(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM Clientes WHERE Idcliente = $1', [id]);
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
  }
}

export async function updateCliente(req, res) {
  try {
    const {nombre, apellido, direccion, telefono,idconsecionario,idcliente } = req.body;
    const response = await conexion.pool.query('UPDATE Clientes SET Nombre = $1, Apellido = $2 ,direccion= $3, telefono=$4, idconsecionario=$5 WHERE Idcliente = $6',
       [ nombre, apellido, direccion, telefono,idconsecionario,idcliente]);
    res.json({
      message: 'Cliente actualizado correctamente',
      body: {
        cliente: {nombre, apellido, direccion, telefono,idcliente },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }finally {
  }
}

export default { getClientes, postCliente, deleteCliente, updateCliente };
