import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function get(req, res) {
  const response = await conexion.pool.query('SELECT* FROM pelicula');
  res.json(response.rows);
}

export async function post(req, res) {
  try {
    const {Id_Pelicula , Titulo , Duracion , Genero , Sinopsis  } = req.body;
    const response = await conexion.pool.query('INSERT INTO pelicula  VALUES($1,$2,$3,$4)', [ Titulo , Duracion , Genero , Sinopsis ]);
    res.json({
      message: 'Se agrego un usuario',
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

export async function deletePelicula(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM pelicula WHERE id = $1', [id]);
    res.json({
      message: 'Taquillero deleted successfully',
      body: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting taquillero' });
  }finally {
    await conexion.desconectar();
  }
}

export async function updatePelicula(req, res) {
  try {
    const {   Id_Pelicula , Titulo , Duracion , Genero , Sinopsis  } = req.body;
    const response = await conexion.pool.query('UPDATE taquilleros SET Titulo=$1 , Duracion=$2 , Genero=$3 , Sinopsis=$4 WHERE id = $5', [ Titulo , Duracion , Genero , Sinopsis,Id_Pelicula]);
    res.json({
      message: 'Taquillero updated successfully',
      body: {
        user: { id, nombre, apellido },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating taquillero' });
  }finally {
    await conexion.desconectar();
  }
}

export default { deletePelicula, updatePelicula, get, post };
