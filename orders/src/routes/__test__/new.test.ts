import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@wnr-org/common";
import {natsWrapper} from "../../nats/nats-wrapper";

const createId = () => {
  return mongoose.Types.ObjectId().toHexString();
};

it("returns an error if the ticket does not exist", async () => {
  const ticketId = mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});

it("returns as error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    id: createId(),
    title: "Metallica Concert",
    price: 20,
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  const ticket = Ticket.build({
    id: createId(),
    title: "Metallica Concert",
    price: 20,
  });
  await ticket.save();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it("emits an order created event", async () => {
  const ticket = Ticket.build({
    id: createId(),
    title: "Metallica Concert",
    price: 20,
  });
  await ticket.save();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

});

it("should return 401 when user is not authenticated", async () => {
  await request(app).post("/api/orders").send({}).expect(401);
});

it("should return 400 when user is authenticated and ticketId is not present", async () => {
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({})
    .expect(400);

  expect(response.body.errors[0].field).toEqual("ticketId");
});
