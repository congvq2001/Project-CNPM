import {handleAsync} from '../utils';
import {DemoService} from '../services';

export const getDemo = handleAsync(async(req, res) => {
    const demos = await DemoService.getAll();
    res.json({
        data: demos
    });
});

export const createDemo = handleAsync(async(req, res) => {
    const demo = await DemoService.create(req.body);
    res.json({
        data: demo
    });
})
