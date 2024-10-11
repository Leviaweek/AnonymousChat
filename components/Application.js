'use strict'
import { ElementStorage } from "./ElementStorage.js";
import { Message } from "./Message.js";
import { MessageInput } from "./MessageInput.js";
import { MessageList } from "./MessageList.js";
import { SidePanel } from "./SidePanel.js";

export class Application {

    constructor()
    {
        this.storage = new ElementStorage();
        this.messageInput = new MessageInput(this.storage, (messageText) => this.onMessageSend(messageText));
        this.sidePanel = new SidePanel(this.storage);
        this.messageList = new MessageList(this.storage);
    }

    /**
     * @param {string} messageText 
     */
    onMessageSend(messageText)
    {
        const message = new Message(messageText, 0);
        this.messageList.addMessage(message);
    }
}