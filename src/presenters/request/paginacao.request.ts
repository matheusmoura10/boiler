import {z} from "zod";


const listaPaginadaRequest = z.object({
    query: z.object({
        page: z.string({
            required_error: "A página é obrigatória",
            invalid_type_error: "A página deve ser um número",
        }),
        limit: z.string({
            required_error: "O limite é obrigatório",
            invalid_type_error: "O limite deve ser um número",
        }),
        filter: z.string().optional(),
        filterColumn: z.string().optional(),
        orderby: z.string().optional(),
        direction: z.string().optional(),
    })
});

export {listaPaginadaRequest};