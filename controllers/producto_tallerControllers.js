import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getProducto_taller(req, res) {
  try {
    const response = await conexion.pool.query('SELECT * FROM producto_taller');
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener producto_taller' });
  }
}

export async function postProducto_taller(req, res) {
  try {
    const {  idtaller, idproductos, valor } = req.body;
    const response = await conexion.pool.query('INSERT INTO producto_taller VALUES($1, $2,$3)', [  idtaller, idproductos, valor]);
    res.json({
      message: 'producto_taller agregada correctamente',
      body: {
        sala: {idtaller, idproductos, valor}
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar producto_taller' });
  }
}

export async function deleteProducto_taller(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM producto_taller WHERE Id_Sala = $1', [id]);
    res.json({
      message: 'producto_taller eliminada correctamente',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar producto_taller' });
  }
}

export async function updateProducto_taller(req, res) {
  try {
    const { idtaller, idproductos, valor} = req.body;
    const response = await conexion.pool.query('UPDATE producto_taller SET idproductos = $1, valor = $2 WHERE idtaller = $3',
       [idproductos, valor, idtaller]);
    res.json({
      message: 'producto_taller actualizada correctamente',
      body: {
        sala: {idtaller, idproductos, valor },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar producto_taller' });
  }
}

export default { getProducto_taller, postProducto_taller, deleteProducto_taller, updateProducto_taller };
