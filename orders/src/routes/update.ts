import express, {Request, Response} from 'express';

const router = express.Router();

router.put('/orders/:id', (req: Request, res: Response) => {

});

export {router as updateOrdersRouter};
