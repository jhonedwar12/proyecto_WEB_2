import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getAsientos(req, res) {
  const response = await conexion.pool.query('SELECT * FROM Asiento');
  res.json(response.rows);

}

export async function postAsiento(req, res) {
  try {
    const { Id_Asiento, Id_Fila, Numero_Asiento } = req.body;
    const response = await conexion.pool.query('INSERT INTO Asiento VALUES($1, $2)', [ Id_Fila, Numero_Asiento]);
    res.json({
      message: 'Asiento agregado correctamente',
      body: {
        asiento: { Id_Asiento, Id_Fila, Numero_Asiento }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar asiento' });
  }
}

export async function deleteAsiento(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM Asiento WHERE Id_Asiento = $1', [id]);
    res.json({
      message: 'Asiento eliminado correctamente',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar asiento' });
  }
}

export async function updateAsiento(req, res) {
  try {
    const { Id_Asiento, Id_Fila, Numero_Asiento } = req.body;
    const response = await conexion.pool.query('UPDATE Asiento SET Id_Fila = $1, Numero_Asiento = $2 WHERE Id_Asiento = $3', [Id_Fila, Numero_Asiento, Id_Asiento]);
    res.json({
      message: 'Asiento actualizado correctamente',
      body: {
        asiento: { Id_Asiento, Id_Fila, Numero_Asiento },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar asiento' });
  }
}

export default { getAsientos, postAsiento, deleteAsiento, updateAsiento };
