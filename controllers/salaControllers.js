import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getSalas(req, res) {
  try {
    const response = await conexion.pool.query('SELECT * FROM Sala');
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener salas' });
  }
}

export async function postSala(req, res) {
  try {
    const { Id_Sala, Nombre, Capacidad } = req.body;
    const response = await conexion.pool.query('INSERT INTO Sala VALUES($1, $2,$3)', [ Id_Sala, Nombre, Capacidad]);
    res.json({
      message: 'Sala agregada correctamente',
      body: {
        sala: { Id_Sala, Nombre, Capacidad }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar sala' });
  }
}

export async function deleteSala(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM Sala WHERE Id_Sala = $1', [id]);
    res.json({
      message: 'Sala eliminada correctamente',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar sala' });
  }
}

export async function updateSala(req, res) {
  try {
    const { Id_Sala, Nombre, Capacidad } = req.body;
    const response = await conexion.pool.query('UPDATE Sala SET Nombre = $1, Capacidad = $2 WHERE Id_Sala = $3', [Nombre, Capacidad, Id_Sala]);
    res.json({
      message: 'Sala actualizada correctamente',
      body: {
        sala: { Id_Sala, Nombre, Capacidad },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar sala' });
  }
}

export default { getSalas, postSala, deleteSala, updateSala };
