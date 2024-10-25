'use strict'
import { Authorization } from "./Authorization";
import { Main } from "./Main";
import { Api } from "@/Api"
import { User } from "@interfaces/User";
import { ensureQuerySelector } from "@extensions/ensureQuerySelector";
import { NewMessageEvent } from "@events/NewMessageEvent";

export class Application {

    user: User | null = null;

    appContainer = ensureQuerySelector<HTMLElement>("#app-container");
    
    mainScreen: Authorization | Main | null = null;
    src: EventSource | null = null;
    
    constructor() {
        Api.refreshAccessTokenAsync().then((response) => {
            if (!response)
            {
                this.appContainer.replaceChildren(Authorization.createElement());
                this.mainScreen = new Authorization(user => this.setAuthorization(user));
                return;
            }
            this.setAuthorization(response);
        })
    }

    addNewMessage(event: MessageEvent)
    {
        const obj: NewMessageEvent = JSON.parse(event.data);
        console.log(obj)
    }

    get isAuthorized()
    {
        return !this.user
    }

    setAuthorization(user: User)
    {

        this.user = user;
        if (this.appContainer.attributes.getNamedItem("data-is-authorize"))
            this.appContainer.attributes.removeNamedItem("data-is-authorize");
        this.appContainer.replaceChildren(Main.createElement());
        this.mainScreen = new Main(user.id, );

        this.src = new EventSource(`${Api.url}/event/subscribe`, {
            withCredentials: true
        });
        this.src.addEventListener("new-message", (event: MessageEvent) => this.addNewMessage(event));
    }
}

