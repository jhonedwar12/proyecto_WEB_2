import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getPersonas(req, res) {
  const response = await conexion.pool.query('SELECT* FROM persona');
  res.json(response.rows);
}


export async function deletePersona(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM persona WHERE id = $1', [id]);
    res.json({
      message: 'persona deleted successfully',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting persona' });
  }finally {
  }
}

export async function updatePersona(req, res) {
  try {
    const {  nombre, edad, categoria, idcliente, idvendedor, idpersona  } = req.body;
    const response = await conexion.pool.query('UPDATE persona SET nombre=$1 , edad=$2 , categoria=$3 , idcliente=$4,idvendedor=$5 WHERE idpersona = $6',
       [ nombre, edad, categoria, idcliente, idvendedor, idpersona]);
    res.json({
      message: 'persona updated successfully',
      body: {
        persona: { nombre, edad, categoria, idcliente, idvendedor, idpersona},
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating persona' });
  }finally {
  }
}

export default { deletePersona, updatePersona, getPersonas };
