'use strict';
import { throwIfNull } from "./throwIfNull";


export function ensureQuerySelector<T extends Element>(elementName: string,
    parent: Element | Document = document): T
{
    const element = parent.querySelector<T>(elementName);
    return throwIfNull(element, `${elementName} not found`);
}
