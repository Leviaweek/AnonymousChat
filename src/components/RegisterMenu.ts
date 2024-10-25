import {Api} from "@/Api"
import { User } from "@interfaces/User";
import { ensureQuerySelector } from "@extensions/ensureQuerySelector";

export class RegisterMenu
{
    static template = ensureQuerySelector<HTMLTemplateElement>("#register-template");

    submit = ensureQuerySelector<HTMLTemplateElement>("#register-submit");

    form = ensureQuerySelector<HTMLFormElement>("#register-form");

    error = ensureQuerySelector<HTMLElement>(".register-menu__error", this.form);

    errorText = ensureQuerySelector<HTMLElement>(".register-menu__error__text", this.error);
    
    setAuthorization: (value: User) => void;

    constructor(setIsAuthorized: (value: User) => void) {
        this.setAuthorization = setIsAuthorized;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(this.form);
            const login = formData.get("login");
            const password = formData.get("password");
            
            if (!login || !password)
                return;

            Api.registerAsync(login.toString(), password.toString()).then(response => {
                if (response == null)
                {
                    this.errorText.textContent = "User is registered";
                    if (this.error.attributes.getNamedItem("data-is-disabled"))
                        this.error.attributes.removeNamedItem("data-is-disabled");
                    return;
                }
                this.setAuthorization(response);
            });
        })
    }
    static createElement(): Node
    {
        const clone = this.template.content.cloneNode(true); 
        return clone;
    }
}