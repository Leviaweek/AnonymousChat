'use strict';
import { Message } from "./interfaces/Message";

export interface NewMessageEvent {
    body: Message;
}
