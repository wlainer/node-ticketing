import request from 'supertest';
import {app} from '../../app';
import mongoose from "mongoose";


it('returns a 404 if the ticket is not found', async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/tickets/${ticketId}`)
    .set('Cookie', global.signin())
    .expect(404);
});


it('returns the ticket if the ticket is found', async () => {
  const title = 'concert';
  const price = 20;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({title, price})
    .expect(201);

  const ticket = response.body;

  const ticketResponse = await request(app)
    .get(`/api/tickets/${ticket.id}`)
    .set('Cookie', global.signin())
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.title).toEqual(title);

});

