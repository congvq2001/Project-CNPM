import express from 'express';
import {getDemo, createDemo} from '../controllers';
import {validateCreateDemo} from '../middlewares';

const router = express.Router();

router.get('/demos', getDemo);
router.post('/demos', validateCreateDemo, createDemo);

export default router;