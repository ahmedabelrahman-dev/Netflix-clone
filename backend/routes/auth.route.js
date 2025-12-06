import express from 'express';
import {
  login,
  signup,
  logout,
  authCheck,
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/authCheck', protectRoute, authCheck);

export default router;
