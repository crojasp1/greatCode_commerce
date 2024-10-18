import express from 'express';
import { getLocales } from '../controllers/localController.js';
const router = express.Router();

router.get('/locales', getLocales);

export default router;

