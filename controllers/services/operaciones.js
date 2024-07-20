import { response } from 'express';
import ConexionDataBase from '../conexion_dataBase.js';
let conexion = new ConexionDataBase();

class Ser {
  constructor() {
    this.conexion = new ConexionDataBase();
  }

  async crearVentaConDetalles(cantidad, idproducto) {
    try {
      const stock = await this.getStock(idproducto);
      if (stock < cantidad) {
        throw new Error(`No hay suficiente stock para el producto ${idproducto}`);
      }

      const newStock = stock.stock - cantidad;
      await this.updateStock(stock.idinsumo, newStock);


    } catch (error) {
      console.error(error);
    }
  }

  async  getStock(idproducto) {
    const query = {
      text: `
        SELECT p.idproducto, i.stock,i.idinsumo
        FROM productos p
        JOIN insumos i ON p.idinsumo = i.idinsumo
        WHERE p.idproducto = $1;

      `,
      values: [idproducto]
    };

    try {
      const result = await this.conexion.pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateStock(idinsumo, newStock) {
    const query = {
      text: `UPDATE insumos SET stock = $1 WHERE idinsumo = $2`,
      values: [newStock, idinsumo]
    };

    try {
      await this.conexion.pool.query(query);
    } catch (error) {
      console.error(error);
    }
  }




}


export default Ser;
