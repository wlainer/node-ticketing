import {Publisher, Subjects, TicketCreatedEvent} from "@wnr-org/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: TicketCreatedEvent["subject"] = Subjects.TicketCreated;
}
