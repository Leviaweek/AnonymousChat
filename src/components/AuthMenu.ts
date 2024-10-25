import { ensureQuerySelector } from "@extensions/ensureQuerySelector";
import { User } from "@interfaces/User";
import { Api } from "@/Api";

export class AuthMenu
{
    static template = ensureQuerySelector<HTMLTemplateElement>("#auth-menu-template");

    submit = ensureQuerySelector<HTMLTemplateElement>("#auth-submit");

    form = ensureQuerySelector<HTMLFormElement>("#auth-form");

    error = ensureQuerySelector<HTMLElement>(".auth-menu__error", this.form);

    errorText = ensureQuerySelector<HTMLElement>(".auth-menu__error__text", this.error);

    setAuthorized: (value: User) => void;

    constructor(setAuthorized: (value: User) => void) {
        this.setAuthorized = setAuthorized;
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(this.form);
            const login = formData.get("login");
            const password = formData.get("password");

            if (!login || !password)
                return;
            console.log(login.toString());
            Api.loginAsync(login.toString(), password.toString()).then(response => {
                if (response == null)
                {
                    console.log(this.errorText)
                    this.errorText.textContent = "Incorrect login/password"
                    if (this.error.attributes.getNamedItem("data-is-disabled"))
                        this.error.attributes.removeNamedItem("data-is-disabled");
                    console.log("Pizdets");
                    return;
                }
                this.setAuthorized(response);
            });
        })
    }

    static createElement(): Node
    {
        const clone = this.template.content.cloneNode(true); 
        return clone;
    }
}