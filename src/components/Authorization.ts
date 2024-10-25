
import { AuthMenu } from "./AuthMenu";
import { ensureQuerySelector } from "@extensions/ensureQuerySelector";
import { User } from "@interfaces/User";
import { RegisterMenu } from "./RegisterMenu";

export class Authorization
{
    changeButton = ensureQuerySelector<HTMLButtonElement>("#change-button");

    static authTemplate = ensureQuerySelector<HTMLTemplateElement>("#auth-template");

    authWrapper: HTMLElement = ensureQuerySelector<HTMLElement>("#auth-wrapper");

    loginMenu = true;
    menu: AuthMenu | RegisterMenu | null = null;

    setAuthorized: (value: User) => void;

    constructor(setAuthorization: (value: User) => void) {
        this.setAuthorized = setAuthorization;

        this.changeButton.addEventListener("click", () => {
            if (this.loginMenu)
            {
                this.setRegisterMenu();
                return;
            }

            this.setLoginMenu();
        });

        this.setLoginMenu();
    }

    setRegisterMenu()
    {
        this.changeButton.textContent = "Login"
        this.loginMenu = false;
        this.authWrapper.replaceChildren();
        this.authWrapper.append(RegisterMenu.createElement());
                
        this.menu = new RegisterMenu((user: User) => this.setAuthorized(user));
    }

    setLoginMenu()
    {
        
        this.changeButton.textContent = "Register"
        this.loginMenu = true;
        this.authWrapper.replaceChildren();
        this.authWrapper.append(AuthMenu.createElement());
        this.menu = new AuthMenu((user: User) => this.setAuthorized(user));
    }

    static createElement(): Node {
        const node = this.authTemplate.content.cloneNode(true);
        return node;
    }
}