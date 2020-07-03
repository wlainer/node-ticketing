import {Publisher, Subjects, TicketUpdatedEvent} from "@wnr-org/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: TicketUpdatedEvent["subject"] = Subjects.TicketUpdated;
}
