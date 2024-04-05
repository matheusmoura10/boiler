import "reflect-metadata";
import {z} from "zod";

const concessionariaPost = z.object({
    body: z.object({
        nome: z.string(
            {
                required_error: "O nome é obrigatório",
                invalid_type_error: "O nome deve ser um texto",
            }
        ),
        estado: z.string(
            {
                required_error: "O estado é obrigatório",
                invalid_type_error: "O estado deve ser um texto",
            }
        )
    })
});

const concessionariaPut = concessionariaPost.extend({
    params: z.object({
        id: z.string(
            {
                required_error: "O id é obrigatório",
                invalid_type_error: "O id deve ser um texto",
            }
        )
    })
});

export {concessionariaPost, concessionariaPut};