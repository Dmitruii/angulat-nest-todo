import { ActivatesService } from './activates.service';
export declare class ActivatesController {
    private activatesService;
    constructor(activatesService: ActivatesService);
    active(id: number): Promise<"<h1>You have already actived your account</h1>" | "<h1>Success</h1>">;
}
