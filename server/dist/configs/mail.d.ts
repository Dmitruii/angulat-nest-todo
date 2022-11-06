export declare class mailConfig {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
    constructor(id: string, to: string, subject: string, text: string);
    private getTemplate;
}
