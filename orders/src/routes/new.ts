import express, {Request, Response} from 'express';

const router = express.Router();

router.post('/orders', (req: Request, res: Response) => {

});

export {router as insertOrdersRoute};
