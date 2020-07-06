import {Publisher, ExpirationCompleteEvent, Subjects} from "@wnr-org/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

}
