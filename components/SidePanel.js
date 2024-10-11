'use strict';

// eslint-disable-next-line no-unused-vars
import { ElementStorage } from "./ElementStorage.js";

export class SidePanel {

    /**
     * 
     * @param {ElementStorage} storage 
     */
    constructor(storage) {
        this.storage = storage;
        this.storage.sidePanelEnable.addEventListener("click", () => this.sidePanelEnable());
        this.storage.sidePanelDisable.addEventListener("click", () => this.sidePanelDisable());
        this.storage.modal.addEventListener("click", () => this.sidePanelDisable());
    }

    sidePanelEnable() {
        this.storage.sidePanel.setAttribute("data-enabled", "true");
        this.storage.modal.setAttribute("data-enabled", "true");
    }

    sidePanelDisable() {
        this.storage.sidePanel.setAttribute("data-enabled", "false");
        this.storage.modal.setAttribute("data-enabled", "false");
    }
}
