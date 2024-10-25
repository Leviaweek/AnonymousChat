'use strict'

import { ensureQuerySelector } from "@extensions/ensureQuerySelector";

export class JoinRandomChat {

    static template = ensureQuerySelector<HTMLTemplateElement>("#join-random-chat-template");

    static createElement()
    {
        const clone = this.template.content.cloneNode(true);
        return clone;
    }
}