import { ConexionDataBase } from './conexion_dataBase.js';
import EmailSender from './email_sendController.js';
import VentasService from './services/detalle-ventas.js';

const ventas = new VentasService();
const conexion = new ConexionDataBase();
const emailSender = new EmailSender();

// Función auxiliar para verificar si el cliente existe
async function getPersona(idCliente) {
  const response = await conexion.pool.query('SELECT * FROM clientes WHERE idCliente = $1', [idCliente]);
  return response.rows.length > 0;
}

export async function getVentas(req, res) {
  try {
    const response = await conexion.pool.query('SELECT * FROM Ventas');
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener ventas' });
  }
}

export async function postVentas(req, res) {
  try {
    const {total, idCliente, idVendedor,detalles } = req.body;
    ventas.crearVentaConDetalles(total, idCliente, idVendedor,detalles );


    // Verificar si el cliente existe
    const clienteExiste = await getPersona(idCliente);
    if (!clienteExiste) {
      return res.status(400).json({ message: 'Cliente no registrado, por favor regístrese' });
    }

    // Obtener correo electrónico del cliente
    const correoResult = await conexion.pool.query('SELECT correo FROM clientes WHERE idCliente = $1', [idCliente]);
    const correoElectronico = correoResult.rows[0].correo;

    // Enviar correo electrónico al cliente
    emailSender.sendEmail(correoElectronico, "VENTAS DE VEHICULOS E INSUMOS S.A", "USTED ACABA DE COMPRAR EN NUESTRA TIENDA");

    res.json({
      message: 'Venta agregada correctamente',
      body: {
        venta: {total, idCliente }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la venta' });
  }
}

export async function deleteVentas(req, res) {
  try {
    const id = req.params.id;
    const response = await conexion.pool.query('DELETE FROM Ventas WHERE idventa = $1', [id]);
    res.json({
      message: 'Venta eliminada correctamente',
      body: { id }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar venta' });
  } finally {
  }
}

export async function updateVentas(req, res) {
  try {
    const { idventa, fecha, total, idCliente, idVendedor } = req.body;
    const response = await conexion.pool.query('UPDATE Ventas SET fecha = $2, total = $3, idCliente = $4, idVendedor = $5 WHERE idventa = $1',
      [idventa, fecha, total, idCliente, idVendedor]);
    res.json({
      message: 'Venta actualizada correctamente',
      body: { idventa, fecha, total, idCliente, idVendedor }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar venta' });
  } finally {

  }
}

export default { getVentas, postVentas, deleteVentas, updateVentas };

