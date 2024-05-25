import { AnyZodObject, z } from "zod";
import { NextFunction, Request, Response } from "express";

const ValidateSchema = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(422).json(
          e.errors.map((error) => {
            return {
              message: error.message,
              path: error.path.join("."),
            };
          })
        );
      }
    }
  };
};

export default ValidateSchema;
