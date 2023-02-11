import {Demo} from '../models';


export const getAll = async () => {
    return await Demo.find({});
}

export const create = async (data) => {
    const demo = new Demo({
        ...data
    });
    return await demo.save();
}
