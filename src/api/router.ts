import { Router } from 'express';
import AuthRoutes from './auth/routes';
import VerifyRoutes from './verify/routes';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/verify', VerifyRoutes);

export default router;
