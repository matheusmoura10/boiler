import {BaseRepository} from "../../@shared/repository/base.repository";
import {inject, injectable} from "inversify";
import {FazendaModel} from "../data/models/fazenda.model";

@injectable()
export default class FazendaRepository extends BaseRepository<FazendaModel> {
    constructor(
        @inject('FazendaModel') model: FazendaModel
    ) {
        super(FazendaModel);
    }
}
