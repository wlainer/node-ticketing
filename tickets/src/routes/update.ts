import express, {Request, Response} from 'express';
import {NotAuthorizedError, NotFoundError, requireAuth, validateRequest, BadRequestError} from "@wnr-org/common";
import {Ticket} from "../models/ticket";
import {body} from "express-validator";
import {TicketUpdatedPublisher} from "../events/ticket-updated-publisher";
import {natsWrapper} from "../nats/nats-wrapper";

const router = express.Router();

// @ts-ignore
router.put('/api/tickets/:id', [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({gt: 0})
      .withMessage('Price should be grater than 0')
  ],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if(ticket.orderId) {
      throw new BadRequestError('Cannot edit a reserved ticket');
    }

    if (ticket.userId !== req.currentUser?.user) {
      throw new NotAuthorizedError();
    }

    const {title, price} = req.body;
    ticket.set({
      title, price
    });

    await ticket.save();
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version
    });

    res.send(ticket);
  });

export {router as updateTicketRouter};
