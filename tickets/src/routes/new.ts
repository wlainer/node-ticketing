import express, {Request, Response} from 'express';
import {requireAuth, validateRequest} from '@wnr-org/common';
import {body} from "express-validator";
import {Ticket} from "../models/ticket";

const router = express.Router();

// @ts-ignore
router.post('/api/tickets', requireAuth, [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({gt: 0})
      .withMessage('Price mus be greater than 0')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {title, price} = req.body;

    const ticket = Ticket.build({
      title, price, userId: req.currentUser!.user
    });

    await ticket.save();

    res.status(201).send(ticket);
  });

export {router as createTicketRouter};
