import { MessageInput } from "./MessageInput";
import { SidePanel } from "./SidePanel";
import { MessageList } from "./MessageList";
import { Message } from "@interfaces/Message";
import { TextMessage } from "@interfaces/TextMessage";
import { ensureQuerySelector } from "@extensions/ensureQuerySelector";
import { JoinRandomChat } from "./JoinRandomChat";

export class Main
{
    static template = ensureQuerySelector<HTMLTemplateElement>("#main-app-template");

    messageInput = new MessageInput((messageText: string, chatId: string) =>
        this.onMessageSend(messageText, chatId));

    sidePanel = new SidePanel();
    messageList = new MessageList();
    userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }


    onMessageSend(messageText: string, chatId: string)
    {
        const message = <Message> {
            chatId: chatId,
            senderId: this.userId,
            time: new Date().toISOString(),
            textMessage: <TextMessage> {
                text: messageText
            }
        };
        this.messageList.addMessage(message);
    }

    static createElement()
    {
        const clone = this.template.content.cloneNode(true) as Element; 

        const sidePanel = ensureQuerySelector<HTMLElement>("#side-panel", clone);
        sidePanel.appendChild(JoinRandomChat.createElement());
        return clone;
    }
}