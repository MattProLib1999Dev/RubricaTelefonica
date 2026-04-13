import { buttonState, buttonType } from "../enums/_index";

export interface buttonDescription {
    type: buttonType;
    title: string;
    icon: string;
    commandName: string;
    state: buttonState;
    color: string;
}

export class buttonDescriptionUtilities {
    static iconButton(icon: string, commandName: string, title: string): buttonDescription {
        return {
            commandName: commandName,
            icon: icon,
            title: title,
            type: buttonType.icon,
            state: buttonState.active,
            color: 'primary'
        };
    }

    static linkButton(title: string, commandName: string): buttonDescription {
        return {
            commandName: commandName,
            icon: '',
            title: title,
            type: buttonType.link,
            state: buttonState.active,
            color: 'primary'
        };
    }

    static Button(title: string, commandName: string): buttonDescription {
        return {
            commandName: commandName,
            icon: '',
            title: title,
            type: buttonType.button,
            state: buttonState.active,
            color: 'primary'
        };
    }
}


export function toIconButton(icon: string, commandName: string, title: string): buttonDescription {
    return {
        commandName: commandName,
        icon: icon,
        title: title,
        type: buttonType.icon,
        state: buttonState.active,
        color: 'primary'
    };
}

export function toLinkButton(title: string, commandName: string): buttonDescription {
    return {
        commandName: commandName,
        icon: '',
        title: title,
        type: buttonType.link,
        state: buttonState.active,
        color: 'primary'
    };
}

export function toButton(title: string, commandName: string): buttonDescription {
    return {
        commandName: commandName,
        icon: '',
        title: title,
        type: buttonType.button,
        state: buttonState.active,
        color: 'primary'
    };
}
