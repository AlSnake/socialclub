import { Router } from 'express';
import { VerifyController } from './controller';
import { Validator } from '../../middlewares/Validator';

const router = Router();

router.post(
	'/email/request',
	Validator.email(),
	VerifyController.postEmailRequest
);

router.post(
	'/email/confirm',
	Validator.EmailAndCode(),
	VerifyController.postEmailConfirm
);

export default router;
