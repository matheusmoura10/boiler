import {z} from "zod";

const stringRequest = z.object({
    params: z.object({
        id: z.string(
            {
                required_error: "O id é obrigatório",
                invalid_type_error: "O id deve ser um número",
            }
        )
    })
});

export {stringRequest};