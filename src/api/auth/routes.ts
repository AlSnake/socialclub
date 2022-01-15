import { Router } from 'express';
import { AuthController } from './controller';
import { Validator } from '../../middlewares/Validator';
import { isAuthenticated } from '../../middlewares/isAuthenticated';

const router = Router();

router.post('/register', Validator.register(), AuthController.postRegister);
router.post('/login', Validator.login(), AuthController.postLogin);
router.post('/logout', isAuthenticated, AuthController.postLogout);

export default router;
