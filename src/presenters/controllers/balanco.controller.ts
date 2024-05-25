import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import CalcularBalancoUseCase from "../../application/usecase/balanco/calcular.balanco.usecase";

@injectable()
export default class BalancoController {
  constructor(
    @inject("CalcularBalancoUseCase")
    private readonly calcularBalancoUseCase: CalcularBalancoUseCase
  ) {}

  async calcularBalanco(req: Request, res: Response): Promise<void> {
    const { referencia, contratoId } = req.body;

    const result = await this.calcularBalancoUseCase.execute({
      referencia,
      contratoId,
    });

    res.status(200).json(result);
  }
}
