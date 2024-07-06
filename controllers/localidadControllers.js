import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function get(req, res) {
  const response = await conexion.pool.query('SELECT* FROM pelicula');
  res.json(response.rows);
}

export async function post(req, res) {
  try {
    const {Id_sala,Id_fila,precio } = req.body;
    const response = await conexion.pool.query('INSERT INTO localidad  VALUES($1,$2,$3)', [Id_sala,Id_fila,precio ]);
    res.json({
      message: 'Se agrego localidad',
      body: {
        user: { nombre, apellido }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar usuario' });
  }finally {
    await conexion.desconectar();
  }
};

export async function deleteLocalidad(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM Localidad WHERE id = $1', [id]);
    res.json({
      message: 'Localidad borrada',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting localidad' });
  }finally {
    await conexion.desconectar();
  }
}

export async function updateLocalidad(req, res) {
  try {
    const { Id_localidad, Id_sala,Id_fila,precio  } = req.body;
    const response = await conexion.pool.query('UPDATE Localidad SET Id_sala=$1 , Id_fila=$2 , precio=$3  WHERE id = $4', [Id_sala,Id_fila,precio,Id_localidad ]);
    res.json({
      message: 'localidad updated successfully',
      body: {
        user: { id, nombre, apellido },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating localidad' });
  }finally {
    await conexion.desconectar();
  }
}

export default { deleteLocalidad, updateLocalidad, get, post };
