import express from 'express'
import { inicio, categoria, buscador, noEncontrado } from '../controllers/appController.js';

const router = express.Router();

// Pagina de Inicio

router.get('/', inicio)

// Categorias

router.get('/categoria/:id', categoria)

// Buscador

router.get('/404', buscador)

// Pagina 404

router.post('/buscador', noEncontrado)

export default router;