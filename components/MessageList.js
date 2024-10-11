'use strict';

// eslint-disable-next-line no-unused-vars
import { Message } from "./Message.js";
// eslint-disable-next-line no-unused-vars
import { ElementStorage } from "./ElementStorage.js";

export class MessageList {

    /**
     * 
     * @param {ElementStorage} storage 
     */
    constructor(storage) {
        this.storage = storage;
        const content = localStorage.getItem("messages");
        const messages = JSON.parse(content);
        if (messages === null) {
            /**
             * @type {Message[]}
             */
            this.messages = [];
        }

        else {
            this.messages = messages;
        }
        this.renderMessages();
    }

    renderMessages() {
        const currentMessageIds = new Set(this.messages.map(msg => msg.id));
        const existingElements = new Map();
    
        Array.from(this.storage.chatMessagesContainer.children).forEach(child => {
            const messageElement = child.querySelector(".message");
            const dataId = messageElement.getAttribute("data-id");
            if (!currentMessageIds.has(dataId)) {
                this.storage.chatMessagesContainer.removeChild(child);
            } else {
                existingElements.set(dataId, child);
            }
        });
    
        const fragment = document.createDocumentFragment();
    
        this.messages.forEach(message => {
            if (!existingElements.has(message.id)) {
                const clone = this.storage.messageTemplate.content.cloneNode(true);
                const messageElement = clone.querySelector(".message");
                const text = messageElement.querySelector(".message__text");
                const timeElement = messageElement.querySelector(".message__time");
                const time = new Date(message.time);
                timeElement.textContent = `${time.getHours()}:${time.getMinutes()}`;
    
                if (message.sender === 0) {
                    messageElement.setAttribute("data-sender-client", "");
                }
    
                messageElement.setAttribute("data-id", message.id);
                text.textContent = message.text;
    
                const childrenArray = Array.from(this.storage.chatMessagesContainer.children);
                let inserted = false;
                for (let i = 0; i < childrenArray.length; i++) {
                    const child = childrenArray[i];
                    const childMessageElement = child.querySelector(".message");
                    const childTime = new Date(childMessageElement.querySelector(".message__time").textContent);
                    
                    if (time < childTime) {
                        this.storage.chatMessagesContainer.insertBefore(clone, child);
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
            this.storage.chatMessagesContainer.prepend(fragment);
        }
    }

    /**
     * @param {Message} message
     */
    addMessage(message) {
        this.messages.push(message);
        localStorage.setItem("messages", JSON.stringify(this.messages));
        this.renderMessages();
    }
}
