import Joi from 'joi';

const name = Joi.string().alphanum().min(1).max(20).required();

export const createDemoInput = Joi.object({
    name,
});