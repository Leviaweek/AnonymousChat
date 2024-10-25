'use strict'

import { NotifyMessage } from "./NotifyMessage"
import { TextMessage } from "./TextMessage"

export interface Message{
    id: string | null
    senderId: string
    chatId: string
    time: string
    textMessage: TextMessage | null
    notifyMessage: NotifyMessage | null
    isClientMessage: boolean;
}

