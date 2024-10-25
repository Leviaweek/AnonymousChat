'use strict';

import { ensureQuerySelector } from "@extensions/ensureQuerySelector";
import { Message } from "@interfaces/Message";
import { MessageElement } from "./MessageElement";

export class MessageList {

    chatMessagesContainer = ensureQuerySelector<HTMLElement>("#chat-messages-container");
    
    messages: Array<Message>;

    constructor() {
        const content = localStorage.getItem("messages") || "[]";
        const messages = JSON.parse(content);
        if (messages === null) {
            this.messages = [];
        }

        else {
            this.messages = messages.map((msg: Message) => {
                msg.senderId;
                msg.time;
                msg.id;
                msg.chatId;
                msg.textMessage;
                msg.notifyMessage;
            });
        }
        this.renderMessages();
        
    }

    renderMessages() {
        const currentMessageIds = new Set(this.messages.map(msg => msg.id));
        const existingElements = new Map();
    
        Array.from(this.chatMessagesContainer.children).forEach(child => {
            const messageElement = ensureQuerySelector<Element>(".message", child);

            const dataId = messageElement.getAttribute("data-id");
            if (!dataId)
                return;

            if (!currentMessageIds.has(dataId)) {
                this.chatMessagesContainer.removeChild(child);
            } else {
                existingElements.set(dataId, child);
            }
        });
    
        const fragment = document.createDocumentFragment();
    
        this.messages.forEach(message => {
            if (!existingElements.has(message.id)) {

                const clone = MessageElement.createElement(message);

                const time = new Date(message.time);
    
                const childrenArray = Array.from(this.chatMessagesContainer.children);
                let inserted = false;
                for (let i = 0; i < childrenArray.length; i++) {
                    const child = childrenArray[i];
                    const childMessageElement = ensureQuerySelector<Element>(".message", child);

                    const timeElement = ensureQuerySelector<Element>(".message__time", childMessageElement);

                    const childTime = new Date(timeElement.textContent ?? "");
                    
                    if (time < childTime) {
                        this.chatMessagesContainer.insertBefore(clone, child);
                        inserted = true;
                        break;
                    }
                }

                if (!inserted) {
                    fragment.prepend(clone);
                }
            }
        });
    
        if (fragment.childNodes.length > 0) {
            this.chatMessagesContainer.prepend(fragment);
        }
    }

    addMessage(message: Message) {
        this.messages.push(message);
        localStorage.setItem("messages", JSON.stringify(this.messages));
        this.renderMessages();
    }
}
