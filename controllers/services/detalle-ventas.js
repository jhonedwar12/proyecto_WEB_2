import { response } from 'express';
import ConexionDataBase from '../conexion_dataBase.js';
import Ser from './operaciones.js';



class VentasService {
  constructor() {
    this.conexion = new ConexionDataBase();
    this.Ser = new Ser();

  }

  async crearVentaConDetalles(total, idCliente, idVendedor, detalles) {
    const venta = await this.crearVenta(total, idCliente, idVendedor);

    // Agregar detalles a la venta
    for (const detalle of detalles) {
      await this.agregarDetalle(venta, detalle, total);
    }
  }

  async crearVenta(total, idCliente, idVendedor) {
    // Insertar venta en la base de datos
    let response = await this.conexion.pool.query('INSERT INTO Ventas(total, idcliente, idvendedor) VALUES($1, $2, $3)',
      [total, idCliente, idVendedor]);

    const res = await this.conexion.pool.query('SELECT * FROM Ventas ORDER BY idventa DESC LIMIT 1');
    const respons = res.rows[0].idventa;
    return respons;
  }

  async agregarDetalle(idventa, detalle, total) {
    // Insertar detalle en la base de datos
    const response = await this.conexion.pool.query('INSERT INTO Detalle(idventa, idproducto, precio, cantidad, tipo, total) VALUES($1, $2, $3, $4, $5, $6)',
      [idventa,  detalle.idproducto, detalle.precio, detalle.cantidad, detalle.tipo, total]);

      const i= await this.Ser.crearVentaConDetalles(detalle.cantidad, detalle.idproducto);

    return response.rows[0];
  }
}


export default VentasService;
