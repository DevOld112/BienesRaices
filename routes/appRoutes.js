import express from 'express'
import { inicio, categoria, buscador, noEncontrado } from '../controllers/appController.js';

const router = express.Router();

// Pagina de Inicio

router.get('/', inicio)

// Categorias

router.get('/categorias/:id', categoria)

// Buscador

router.get('/buscador', buscador)

// Pagina 404

router.get('/404', noEncontrado)

export default router;