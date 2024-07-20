import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getInsumos(req, res) {
  const response = await conexion.pool.query('SELECT * FROM insumos');
  res.json(response.rows);

}


export async function postInsumo(req, res) {
  try {
    const {  idinsumo, descripcion, preciounitario, stock,idalmacen} = req.body;
    const response = await conexion.pool.query('INSERT INTO insumos VALUES($1,$2,$3,$4,$5)', [  idinsumo, descripcion, preciounitario, stock,idalmacen]);
    res.json({
      message: 'Insumo agregado correctamente',
      body: {
        insumo: {   idinsumo, descripcion, preciounitario, stock,idalmacen }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar Insumo' });
  }
}

export async function deleteInsumo(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM insumos WHERE idinsumo = $1', [id]);
    res.json({
      message: 'Insumo eliminado correctamente',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar Insumo' });
  }
}

export async function updateInsumo(req, res) {
  try {
    const {   idinsumo, descripcion, preciounitario, stock,idalmacen} = req.body;
    const response = await conexion.pool.query('UPDATE insumos SET descripcion = $1, preciounitario = $2,stock=$3,idalmacen=$4 WHERE idinsumo = $5',
       [descripcion, preciounitario, stock,idalmacen, idinsumo ]);
    res.json({
      message: 'Insumo actualizado correctamente',
      body: {
        Insumo: { idinsumo, descripcion, preciounitario, stock,idalmacen  },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar Insumo' });
  }
}

export default { getInsumos, postInsumo, deleteInsumo, updateInsumo };
