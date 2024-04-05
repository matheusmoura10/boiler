import {z} from "zod";

const numberRequest = z.object({
    params: z.object({
        id: z.preprocess((val) => parseInt(z.string().parse(val), 0), z.number({
            required_error: "O id é obrigatório",
            invalid_type_error: "O id deve ser um número",
        }))
    })
});

export {numberRequest};