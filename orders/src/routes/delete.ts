import express, {Request, Response} from 'express';

const router = express.Router();

router.delete('/orders/:id', (req: Request, res: Response) => {

});

export {router as deleteOrdersRouter};
