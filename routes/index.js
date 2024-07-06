import express from 'express';
import { Router } from 'express';
import taquilleroRouter from "./taquillerosRouter.js";
import peliculasRouter from "./peliculaRoutes.js";
import salaRouter from "./salaRoutes.js";
import filaRouter from "./filaRouter.js";
import clienteRouter from "./clienteRouter.js";
import ventaRouter from "./ventaRouter.js";
import asientoRouter from "./asientoRouter.js";
import cineRouter from "./cineRouter.js";
import funcionRouter from "./funcionRouter.js";
import localidadRouter from "./localidadRouter.js";

function routerApi(app){
  const router = Router();
  app.use('/api/v1', router);
  router.use('/taquillero', taquilleroRouter);
  router.use('/peliculas', peliculasRouter);
  router.use('/sala', salaRouter);
  router.use('/fila', filaRouter);
  router.use('/cliente', clienteRouter);
  router.use('/boleta', ventaRouter);
  router.use('/asiento', asientoRouter);
  router.use('/cine', cineRouter);
  router.use('/funcion', funcionRouter);
  router.use('/localidad', localidadRouter);
}

export default routerApi;
