import {Publisher, OrderCreatedEvent, Subjects} from "@wnr-org/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

}
