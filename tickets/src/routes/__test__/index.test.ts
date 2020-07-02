import request from 'supertest';
import {app} from "../../app";

const createTicket = async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'valid ticket',
      price: 10
    });
};

it('returns an empty array when there is no records', async () => {
  const response = await request(app)
    .get('/api/tickets')
    .set('Cookie', global.signin())
    .send({});

  expect(response.body.length).toEqual(0);
});

it('fetch a list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app)
    .get('/api/tickets')
    .set('Cookie', global.signin())
    .send({});

  expect(response.body.length).toEqual(3);
});
