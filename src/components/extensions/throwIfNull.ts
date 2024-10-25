'use strict'

import { Nullable } from "./Nullable";

export function throwIfNull<T>(element: Nullable<T>, errorText: string): T
{
    if (element == null)
        throw new Error(errorText);

    return element;
}

