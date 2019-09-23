import { ActionReducer } from '@ngrx/store';
import { LoggerService } from 'src/app/services/logger.service';

class DebugStore {

    constructor(private logger: LoggerService) {}

    // FIXME:
    // console.log all actions
    debug(reducer: ActionReducer<any>): ActionReducer<any> {
        // const logger = new LoggerService();
        return (state, action) => {
            // LoggerService.storeInfo('ACTION', action);
            // logger.storeInfo('STATE', state);
            return reducer(state, action);
        };
    }
}
