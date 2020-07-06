import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats/nats-wrapper";
import mongoose from "mongoose";

const createId = () => {
  return mongoose.Types.ObjectId().toHexString();
};

it("marks an order as cancelled", async () => {
  const ticket = Ticket.build({
    id: createId(),
    title: "concert",
    price: 20,
  });

  await ticket.save();
  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);
});

it("emits a order cancelled event", async () => {
  const ticket = Ticket.build({
    id: createId(),
    title: "concert",
    price: 20,
  });

  await ticket.save();
  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
