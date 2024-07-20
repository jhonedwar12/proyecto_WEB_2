import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();


export async function getDetalles(req, res) {
  try {
    const response = await conexion.pool.query('SELECT * FROM detalle');
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener detalle' });
  }
}

export async function postDetalle(req, res) {
  try {
    const {  iddetalle, idventa, idproducto, precio, cantidad,tipo, total } = req.body;
    await conexion.pool.query('BEGIN');
    try {
      const response = await conexion.pool.query('INSERT INTO detalle VALUES($1, $2, $3,$4, $5, $6,$7)',
         [iddetalle, idventa, idproducto, precio, cantidad,tipo, total]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'funcion agregada correctamente',
        body: {
          detalle: {  iddetalle, idventa, idproducto, precio, cantidad, total }
        }
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al agregar funcion' });
    }
  } finally {
  }
}

export async function deleteDetalle(req, res) {
  try {
    const id = req.params.id;
    await conexion.pool.query('BEGIN');
    try {
      const response = await conexion.pool.query('DELETE FROM detalle WHERE iddetalle = $1', [id]);
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
  }
}

export async function updateDetalle(req, res) {
  try {
    const { iddetalle, idventa, idproducto, precio, cantidad,tipo, total } = req.body;
    await conexion.pool.query('BEGIN');
    try {
      const response = await conexion.pool.query('UPDATE Detalle SET idventa = $1, idproducto = $2, precio=$3, cantidad=$4,tipo=$5, total=$6 WHERE iddetalle = $7',
         [ idventa, idproducto, precio, cantidad,tipo, total,iddetalle  ]);
      await conexion.pool.query('COMMIT');
      res.json({
        message: 'Detalle actualizada correctamente',
        body: {
          Detalle: {idventa, idproducto, precio, cantidad,tipo, total,iddetalle },
        },
      });
    } catch (error) {
      await conexion.pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar funcion' });
    }
  } finally {
  }
}

export default { getDetalles, postDetalle, deleteDetalle, updateDetalle };
