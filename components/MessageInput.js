'use strict';

// eslint-disable-next-line no-unused-vars
import { ElementStorage } from "./ElementStorage.js";

export class MessageInput {
    
    get #messageInputText() {
        return this.storage.messageInput.value;
    }

    set #messageInputText(value) {
        this.storage.messageInput.value = value;
    }

    /**
     * @param {(storage: ElementStorage)}
     * @param {(messageText: string) => void} onMessageSend
     */
    constructor(storage, onMessageSend) {
        
        this.storage = storage;
        this.storage.messageInput.addEventListener("input", () => this.updateMessageInput());
        this.storage.inputForm.addEventListener("submit", (event) => this.onSubmit(event, onMessageSend));
    }

    updateMessageInput() {
        this.storage.sendMessageButton.disabled = this.#messageInputText.trim() === "";
    }

    /**
    * @param {SubmitEvent} e
    * @param {(messageText: string) => void} callback
    */
    onSubmit(e, callback) {
        e.preventDefault();
        callback(this.#messageInputText);
        this.#messageInputText = "";
        this.updateMessageInput();
    }
}
