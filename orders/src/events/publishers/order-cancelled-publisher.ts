import {Publisher, OrderCancelledEvent, Subjects} from "@wnr-org/common"

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
