import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/orders', (req: Request, res: Response) => {

});

export {router as indexOrdersRouter};
