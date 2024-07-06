import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function get(req, res) {
    const response = await conexion.pool.query('SELECT* FROM Cine');
    res.json(response.rows);
}

export async function post(req, res) {
  try {
    const nombre  = req.body;
    const response = await conexion.pool.query('INSERT INTO Cine (Nombre) VALUES($1)', [nombre]);
    const cine = response.rows[0];
    res.json({
      message: 'SeCine',
      body: { cine}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar usuario' });
  }
};

export async function deleteCine(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM Cine WHERE id_cine = $1', [id]);
    res.json({
      message: 'Cine borrada',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting localidad' });
  }
}

export async function updateCine(req, res) {
  try {
    const { nombre,id_cine } = req.body;
    const response = await conexion.pool.query('UPDATE Cine SET nombre=$1  WHERE id = $2', [nombre,id_cine]);
    res.json({
      message: 'Cine updated successfully',
      body: {
        user: { id, nombre, apellido },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating Cine' });
  }
}


export default { deleteCine, updateCine, get, post };
