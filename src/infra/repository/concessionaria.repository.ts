import { ConcessionariaModel } from "../data/models/concessionaria.model";
import { BaseRepository } from "../../@shared/repository/base.repository";
import { inject, injectable } from "inversify";

@injectable()
export default class ConcessionariaRepository extends BaseRepository<ConcessionariaModel> {
  constructor(@inject("ConcessionariaModel") model: ConcessionariaModel) {
    super(ConcessionariaModel);
  }
}
