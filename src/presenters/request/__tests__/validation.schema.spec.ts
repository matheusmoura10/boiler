import {NextFunction, Request, Response} from "express";
import {z, ZodError} from "zod";
import ValidateSchema from "../validation.schema";

describe("ValidateSchema", () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;
    let zodError: ZodError;

    beforeEach(() => {
        req = {} as Request;
        res = {} as Response;
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        next = jest.fn();
        zodError = new ZodError([]);
    });

    it("deve retornar status 422 e os erros de validação", async () => {

        const schema = z.object({
            body: z.object({
                nome: z.string(),
                estado: z.string(),
            }),
            query: z.object({}),
            params: z.object({}),
        });

        req.body = {};
        req.query = {};
        req.params = {};

        await ValidateSchema(schema)(req, res, next);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith([{
            message: 'Required',
            path: 'body.nome'
        }, {
            message: 'Required',
            path: 'body.estado'
        }]);
    })


});