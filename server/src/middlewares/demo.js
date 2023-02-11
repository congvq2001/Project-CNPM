import {handleAsync} from '../utils';
import {createDemoInput} from '../validators';

export const validateCreateDemo = handleAsync(async(req, res, next) => {
    await createDemoInput.validateAsync(req.body);
    next()
});