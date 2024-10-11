'use strict';
export class Message {

    /**
     * @param {string} text
     * @param {number} sender
     */
    constructor(text, sender) {
        this.id = Math.floor(Math.random() * 4294967295);
        this.text = text;
        this.time = new Date().toISOString();
        this.sender = sender;
    }
}
