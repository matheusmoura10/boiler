import {NextFunction, Request, Response} from 'express';
import IFramework from './IFramework';
import DomainException from "../../../@shared/exceptions/domain.exception";

export default class ExpressAdapter implements IFramework {
    create<T>(
        fn: (params: Request, body: Response) => Promise<T>,
        middleware?: (req: Request, res: Response, next: NextFunction) => void
    ) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                middleware?.(req, res, next);
                const result = await fn(req, res);
                res.status(201).json(result);

            } catch (error) {
                console.log(error instanceof DomainException);
                this.handleException(error, res);
            }
        };
    }


    private handleException(error: Error, res: Response) {
        if (error.name === 'NotFoundException') {
            res.status(404).json({message: error.message});
            return;
        }

        if (error.name == 'QueryFailedError') {
            res.status(400).json({message: error.message});
            return;
        }

        if (error instanceof DomainException) {
            res.status(400).json({message: error.message, erros: error.getErros()});
            return;
        }

        res.status(500).json({message: error.message, stack: error.stack});


    }


}