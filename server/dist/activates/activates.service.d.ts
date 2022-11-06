import { ActivateDto } from './dto/activate.dto';
import { Activate } from './models/activate.model';
export declare class ActivatesService {
    private activateRepository;
    constructor(activateRepository: typeof Activate);
    createActivate(dto: ActivateDto, to: string): Promise<Activate>;
    active(id: number): Promise<"<h1>You have already actived your account</h1>" | "<h1>Success</h1>">;
}
