'use strict';

import { ensureQuerySelector } from "@extensions/ensureQuerySelector";
import { Message } from "@interfaces/Message";

export class MessageElement {

    static messageTemplate = ensureQuerySelector<HTMLTemplateElement>("#message-template");

    static createElement(message: Message): HTMLElement
    {
        const clone = this.messageTemplate.content.cloneNode(true) as HTMLElement;
        const messageElement = ensureQuerySelector<Element>(".message", clone);
    
        const text = ensureQuerySelector<Element>(".message__text", messageElement);
        const timeElement = ensureQuerySelector<Element>(".message__time", messageElement);

        const time = new Date(message.time);
        timeElement.textContent = `${time.getHours()}:${time.getMinutes()}`;
        text.textContent = message.textMessage?.text || "";
        messageElement.setAttribute("data-id", message.id ?? "");

        if (message.isClientMessage) {
            messageElement.setAttribute("data-sender-client", "");
        }

        return clone;
    }
}
