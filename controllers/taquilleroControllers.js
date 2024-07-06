import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function get(req, res) {
  const response = await conexion.pool.query('SELECT* FROM taquillero');
  res.json(response.rows);

}

export async function post(req, res) {
  try {
    const { id_taquillero, id_cine, nombre, apellido } = req.body;
    let idCineParam = id_cine;
    if (id_cine === null || id_cine === undefined) {
      idCineParam = null; // or some default value
    }

    const response = await conexion.pool.query('INSERT INTO taquillero (Id_Cine, nombre, apellido) VALUES($1,$2,$3) RETURNING *', [idCineParam, nombre, apellido]);
    const insertedTaquillero = response.rows[0];
    res.json({
      message: 'Se agrego un usuario',
      body: {
        user: { Id_Taquillero: insertedTaquillero.Id_Taquillero, idCineParam, nombre, apellido }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar usuario' });
  }
};

export async function deleteTaquillero(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM taquillero WHERE id_taquillero = $1', [id]);
    res.json({
      message: 'Taquillero deleted successfully',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting taquillero' });
  }
}

export async function updateTaquillero(req, res) {
  try {
    await conexion.conectar();
    const { id_taquillero, id_cine, nombre, apellido } = req.body;

    // Validate input data
    if (!id_taquillero ||!nombre ||!apellido) {
      throw new Error('Invalid input data');
    }

    // Check if id_cine is null or undefined
    let idCineParam = id_cine;
    if (id_cine === null || id_cine === undefined) {
      idCineParam = null; // or some default value
    }

    const response = await conexion.pool.query('UPDATE taquillero SET Id_Cine=$1, nombre = $2, apellido = $3 WHERE Id_Taquillero = $4', [idCineParam, nombre, apellido, id_taquillero]);

    res.json({
      message: 'Taquillero updated successfully',
      body: {
        Taquillero: { id_taquillero, idCineParam, nombre, apellido },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating taquillero' });
  }
}

export default { deleteTaquillero, updateTaquillero, get, post };
