import {BaseRepository} from "../../@shared/repository/base.repository";
import {inject, injectable} from "inversify";
import {FazendaGeracaoModel} from "../data/models/fazenda.geracao.model";

@injectable()
export default class FazendaGeracaoRepository extends BaseRepository<FazendaGeracaoModel> {
    constructor(
        @inject('FazendaGeracaoModel') model: FazendaGeracaoModel
    ) {
        super(FazendaGeracaoModel);
    }
}
