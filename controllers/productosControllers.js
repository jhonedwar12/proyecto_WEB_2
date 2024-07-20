import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getProducto(req, res) {
  try {
    const response = await conexion.pool.query('SELECT * FROM productos');
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
}

export async function postProducto(req, res) {
  try {
    const { idproducto, idinsumo, idvehiculo, tipo, precio } = req.body;
    const response = await conexion.pool.query('INSERT INTO productos (idproducto, idinsumo, idvehiculo, tipo, precio) VALUES ($1, $2, $3, $4, $5)',
      [idproducto, idinsumo, idvehiculo, tipo, precio]);
    res.json({
      message: 'Producto agregado correctamente',
      body: {
        producto: { idproducto, idinsumo, idvehiculo, tipo, precio }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar producto' });
  }
}

export async function deleteProducto(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM productos WHERE idproducto = $1', [id]);
    res.json({
      message: 'Producto eliminado correctamente',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
}

export async function updateProducto(req, res) {
  try {
    const { idproducto, idinsumo, idvehiculo, tipo, precio } = req.body;
    const response = await conexion.pool.query('UPDATE productos SET idinsumo = $1, idvehiculo = $2, tipo = $3, precio = $4 WHERE idproducto = $5',
      [idinsumo, idvehiculo, tipo, precio, idproducto]);
    res.json({
      message: 'Producto actualizado correctamente',
      body: {
        producto: { idproducto, idinsumo, idvehiculo, tipo, precio },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
}

export default { getProducto, postProducto, deleteProducto, updateProducto };
