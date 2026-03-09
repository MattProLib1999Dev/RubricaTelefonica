export interface modalDescription {
    title: string;
    subtitle?: string;
    text: string;
    type: modalType;
    submitText?: string;
    closeText?: string;
    command: (res: boolean) => void;
    callbackFn?: (args?: any[]) => any;
}

export enum modalType {
    message = 'message',
    confirm = 'confirm'
}
