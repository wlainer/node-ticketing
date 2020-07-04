import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async (done) => {
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  await ticket.save();

  const firstInstace = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstace!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  await firstInstace!.save();

  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error("Should not reach this point");
});

it("increment the version number on multiples saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
