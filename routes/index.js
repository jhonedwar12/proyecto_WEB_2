import express from 'express';
import { Router } from 'express';
import Cliente from "./clienteRouter.js";
import Consecionario from './consecionarioRouter.js';
import Detalle from './detalleRouter.js';
import Insumo from './insumoRouter.js';
import Persona from './personaRouter.js';
import Producto_taller from './producto_tallerRouter.js';
import Productos from './productosRouter.js';
import Taller from './tallerRouter.js';
import Vehiculos from './vehiculosRouter.js';
import Vendedores from './vendedoresRouter.js';
import Venta from './ventaRouter.js';
import Almacen from './almacenRouter.js';


function routerApi(app){
  const router = Router();
  app.use('/api/v1', router);
  router.use('/cliente', Cliente);
  router.use('/consecionario', Consecionario);
  router.use('/detalle', Detalle);
  router.use('/insumo', Insumo);
  router.use('/persona', Persona);
  router.use('/producto_taller', Producto_taller);
  router.use('/productos', Productos);
  router.use('/taller', Taller);
  router.use('/vehiculos', Vehiculos);
  router.use('/vendedores', Vendedores);
  router.use('/venta', Venta);
  router.use('/almacen', Almacen);

}

export default routerApi;
