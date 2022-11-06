import { ActivateDto } from './dto/activate.dto';
import { Activate } from './models/activate.model';
export declare class ActivatesService {
    private activateRepository;
    constructor(activateRepository: typeof Activate);
    createActivate(dto: ActivateDto): Promise<Activate>;
}
