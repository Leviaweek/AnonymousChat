'use strict';

import { ensureQuerySelector } from "@extensions/ensureQuerySelector";

export class MessageInput {

    messageInput = ensureQuerySelector<HTMLInputElement>("#message-input");

    sendMessageButton = ensureQuerySelector<HTMLButtonElement>("#send-message-button");

    inputForm = ensureQuerySelector<HTMLFormElement>("#input-form");

    get #messageInputText(): string {
        return this.messageInput.value;
    }

    set #messageInputText(value: string) {
        this.messageInput.value = value;
    }

    constructor(onMessageSend: (messageText: string, chatId: string) => void) {
        this.messageInput.addEventListener("input", () => this.updateMessageInput());
        this.inputForm.addEventListener("submit", (event) => this.onSubmit(event, onMessageSend));
    }

    updateMessageInput() {
        this.sendMessageButton.disabled = this.#messageInputText.trim() === "";
    }

    onSubmit(e: SubmitEvent, callback: (messageText: string, chatId: string) => void) {
        e.preventDefault();
        callback(this.#messageInputText, "1");
        this.#messageInputText = "";
        this.updateMessageInput();
    }
}
