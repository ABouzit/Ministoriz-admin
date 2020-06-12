import { BehaviorSubject } from "rxjs";
const subscriberNewStoriz = new BehaviorSubject(false);
const messageService = {
  send: function(msg) {
    subscriberNewStoriz.next(msg);
  }
};
export { messageService, subscriberNewStoriz };
