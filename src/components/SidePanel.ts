'use strict';

import { ensureQuerySelector } from "@extensions/ensureQuerySelector";

export class SidePanel {

    sidePanelEnableElement = ensureQuerySelector<HTMLElement>("#side-panel-enable");

    sidePanelDisableElement = ensureQuerySelector<HTMLElement>("#side-panel-disable");

    sidePanel = ensureQuerySelector<HTMLElement>("#side-panel");

    modal = ensureQuerySelector<HTMLElement>("#modal");

    constructor() {

        this.sidePanelEnableElement.addEventListener("click", () => this.sidePanelEnable());
        this.sidePanelDisableElement.addEventListener("click", () => this.sidePanelDisable());
        this.modal.addEventListener("click", () => this.sidePanelDisable());
    }

    sidePanelEnable() {
        this.sidePanel.setAttribute("data-enabled", "true");
        this.modal.setAttribute("data-enabled", "true");
    }

    sidePanelDisable() {
        this.sidePanel.setAttribute("data-enabled", "false");
        this.modal.setAttribute("data-enabled", "false");
    }
}
