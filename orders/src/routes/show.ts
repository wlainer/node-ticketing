import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/orders/:id', (req: Request, res: Response) => {

});

export {router as showOrdersRoute};
