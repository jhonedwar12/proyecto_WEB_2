import { ConexionDataBase } from './conexion_dataBase.js';

const conexion = new ConexionDataBase();

export async function getVendedores(req, res) {
    try {
        const response = await conexion.pool.query('SELECT * FROM Vendedores');
        res.json(response.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener Vendedores' });
    }
}

export async function postVendedores(req, res) {
    try {
        const { idvendedor, nombre, apellido, direccion, telefono, idconsecionario, edad }  = req.body;
        await conexion.pool.query('INSERT INTO Vendedores VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [idvendedor, nombre, apellido, direccion, telefono, idconsecionario, edad]);
        res.json({
            message: 'Se agregó un vendedor correctamente',
            body: { idvendedor, nombre, apellido, direccion, telefono, idconsecionario, edad }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar Vendedor' });
    }
}

export async function deleteVendedores(req, res) {
    try {
        const id = req.params.id;
        await conexion.pool.query('DELETE FROM Vendedores WHERE idvendedor = $1', [id]);
        res.json({
            message: 'Vendedor eliminado correctamente',
            body: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar Vendedor' });
    }
}

export async function updateVendedores(req, res) {
    try {
        const { idvendedor, nombre, apellido, direccion, telefono, idconsecionario, edad } = req.body;
        await conexion.pool.query('UPDATE Vendedores SET nombre=$1, apellido=$2, direccion=$3, telefono=$4, idconsecionario=$5, edad=$6 WHERE idvendedor = $7',
            [nombre, apellido, direccion, telefono, idconsecionario, edad, idvendedor]);
        res.json({
            message: 'Vendedor actualizado correctamente',
            body: {
                vendedor: { idvendedor, nombre, apellido, direccion, telefono, idconsecionario, edad },
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar Vendedor' });
    }
}

export default { deleteVendedores, updateVendedores, getVendedores, postVendedores };
