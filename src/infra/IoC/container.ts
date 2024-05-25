import { Container } from "inversify";
import SaveConcessionariaUsecase from "../../application/usecase/concessionarias/save.concessionaria.usecase";
import UpdateConcessionariaUsecase from "../../application/usecase/concessionarias/update.concessionaria.usecase";
import DestroyConcessionariaUsecase from "../../application/usecase/concessionarias/destroy.concessionaria.usecase";
import ShowConcessionariaUsecase from "../../application/usecase/concessionarias/show.concessionaria.usecase";
import ListConcessionariaUsecase from "../../application/usecase/concessionarias/list.concessionaria.usecase";
import ConcessionariaRepository from "../repository/concessionaria.repository";
import FazendaRepository from "../repository/fazenda.repository";

import InsertFazendaUsecase from "../../application/usecase/fazenda/insert.fazenda.usecase";
import UpdateFazendaUsecase from "../../application/usecase/fazenda/update.fazenda.usecase";
import DestroyFazendaUsecase from "../../application/usecase/fazenda/destroy.fazenda.usecase";
import ListFazendaUsecase from "../../application/usecase/fazenda/list.fazenda.usecase";
import ShowFazendaUsecase from "../../application/usecase/fazenda/show.fazenda.usecase";
import { ConcessionariaModel } from "../data/models/concessionaria.model";
import { FazendaModel } from "../data/models/fazenda.model";

import { FazendaGeracaoModel } from "../data/models/fazenda.geracao.model";
import FazendaGeracaoRepository from "../repository/fazenda.geracao.repository";
import InsertGeracaoUseCase from "../../application/usecase/fazenda.geracao/insert.geracao.usecase";
import ShowGeracaoUseCase from "../../application/usecase/fazenda.geracao/show.geracao.usecase";
import UpdateGeracaoUseCase from "../../application/usecase/fazenda.geracao/update.geracao.usecase";
import DestroyGeracaoUseCase from "../../application/usecase/fazenda.geracao/destroy.geracao.usecase";
import ListGeracaoUseCase from "../../application/usecase/fazenda.geracao/list.geracao.usecase";
import PayloadCotasController from "../../presenters/controllers/payload.cotas.controller";
import ReaderUsecase from "../../application/usecase/reader/reader.usecase";
import CotasModel from "../data/models/cotas.model";
import CotasRepository from "../repository/cotas.repository";
import UploadCotasUsecase from "../../application/usecase/payload.cotas/upload.cotas.usecase";
import CalcularBalancoUseCase from "../../application/usecase/balanco/calcular.balanco.usecase";
import ContasRepository from "../repository/contas.repository";
import ContasModel from "../data/models/contas.model";
import BalancoEnergiaRepository from "../repository/balanco.energia.repository";
import BalancoEnergiaModel from "../data/models/balanco.energia.model";
import ShowCotaUseCase from "../../application/usecase/cotas/show.cota.usecase";
import ObterPorNumeroInstalacaoFazendaUseCase from "../../application/usecase/fazenda/obter.por.numeroinstalacao.fazenda.usecase";
import ObterPorNumeroInstalacaoReferenciaGeracaoUseCase from "../../application/usecase/fazenda.geracao/obter.por.numeroinstalacaoreferencia.fazenda.usecase";
import ObterContaEnergiaUseCase from "../../application/usecase/contasenergia/obter.contaenergia.usecase";
import AnaliseBalancoUseCase from "../../application/usecase/balanco/analise.balanco.usecase";
import BalancoAnaliseModel from "../data/models/balanco.analise.model";
import BalancoAnaliseRepository from "../repository/balanco.analise.repository";
import PersistirBalancoUseCase from "../../application/usecase/balanco/persistir.balanco.usecase";
import BalancoModel from "../data/models/balanco.model";
import BalancoRepository from "../repository/balanco.repository";
import ConsolidarBalancoUseCase from "../../application/usecase/balanco/consolidar.balanco.usecase";

const container = new Container();
container
  .bind<ConcessionariaModel>("ConcessionariaModel")
  .to(ConcessionariaModel);
container
  .bind<ConcessionariaRepository>("ConcessionariaRepository")
  .to(ConcessionariaRepository);
container
  .bind<SaveConcessionariaUsecase>("SaveConcessionariaUsecase")
  .to(SaveConcessionariaUsecase);
container
  .bind<UpdateConcessionariaUsecase>("UpdateConcessionariaUsecase")
  .to(UpdateConcessionariaUsecase);
container
  .bind<DestroyConcessionariaUsecase>("DestroyConcessionariaUsecase")
  .to(DestroyConcessionariaUsecase);
container
  .bind<ShowConcessionariaUsecase>("ShowConcessionariaUsecase")
  .to(ShowConcessionariaUsecase);
container
  .bind<ListConcessionariaUsecase>("ListConcessionariaUsecase")
  .to(ListConcessionariaUsecase);
/*-------------------*/

container.bind<FazendaModel>("FazendaModel").to(FazendaModel);
container.bind<FazendaRepository>("FazendaRepository").to(FazendaRepository);
container
  .bind<InsertFazendaUsecase>("InsertFazendaUsecase")
  .to(InsertFazendaUsecase);
container
  .bind<UpdateFazendaUsecase>("UpdateFazendaUsecase")
  .to(UpdateFazendaUsecase);
container
  .bind<DestroyFazendaUsecase>("DestroyFazendaUsecase")
  .to(DestroyFazendaUsecase);
container.bind<ListFazendaUsecase>("ListFazendaUsecase").to(ListFazendaUsecase);
container.bind<ShowFazendaUsecase>("ShowFazendaUsecase").to(ShowFazendaUsecase);
container
  .bind<ObterPorNumeroInstalacaoFazendaUseCase>(
    "ObterPorNumeroInstalacaoFazendaUseCase"
  )
  .to(ObterPorNumeroInstalacaoFazendaUseCase);
/*-------------------*/

container
  .bind<FazendaGeracaoModel>("FazendaGeracaoModel")
  .to(FazendaGeracaoModel);
container
  .bind<FazendaGeracaoRepository>("FazendaGeracaoRepository")
  .to(FazendaGeracaoRepository);
container
  .bind<InsertGeracaoUseCase>("InsertGeracaoUseCase")
  .to(InsertGeracaoUseCase);
container.bind<ShowGeracaoUseCase>("ShowGeracaoUseCase").to(ShowGeracaoUseCase);
container
  .bind<UpdateGeracaoUseCase>("UpdateGeracaoUseCase")
  .to(UpdateGeracaoUseCase);
container
  .bind<DestroyGeracaoUseCase>("DestroyGeracaoUseCase")
  .to(DestroyGeracaoUseCase);
container.bind<ListGeracaoUseCase>("ListGeracaoUseCase").to(ListGeracaoUseCase);

container
  .bind<ObterPorNumeroInstalacaoReferenciaGeracaoUseCase>(
    "ObterPorNumeroInstalacaoReferenciaGeracaoUseCase"
  )
  .to(ObterPorNumeroInstalacaoReferenciaGeracaoUseCase);
/*-------------------*/

container.bind<ReaderUsecase>("ReaderUsecase").to(ReaderUsecase);
/*-------------------*/

container.bind<CotasModel>("CotasModel").to(CotasModel);
container.bind<CotasRepository>("CotasRepository").to(CotasRepository);
container.bind<ShowCotaUseCase>("ShowCotaUseCase").to(ShowCotaUseCase);

/*-------------------*/

container.bind<ContasModel>("ContasModel").to(ContasModel);
container.bind<ContasRepository>("ContasRepository").to(ContasRepository);
container
  .bind<ObterContaEnergiaUseCase>("ObterContaEnergiaUseCase")
  .to(ObterContaEnergiaUseCase);

/*-------------------*/

container
  .bind<PayloadCotasController>("PayloadCotasController")
  .to(PayloadCotasController);
container.bind<UploadCotasUsecase>("UploadCotasUsecase").to(UploadCotasUsecase);

/*-------------------*/
container
  .bind<BalancoEnergiaModel>("BalancoEnergiaModel")
  .to(BalancoEnergiaModel);
container
  .bind<BalancoAnaliseModel>("BalancoAnaliseModel")
  .to(BalancoAnaliseModel);
container.bind<BalancoModel>("BalancoModel").to(BalancoModel);
container
  .bind<BalancoEnergiaRepository>("BalancoEnergiaRepository")
  .to(BalancoEnergiaRepository);
container.bind<BalancoRepository>("BalancoRepository").to(BalancoRepository);

container
  .bind<PersistirBalancoUseCase>("PersistirBalancoUseCase")
  .to(PersistirBalancoUseCase);
container
  .bind<BalancoAnaliseRepository>("BalancoAnaliseRepository")
  .to(BalancoAnaliseRepository);
container
  .bind<CalcularBalancoUseCase>("CalcularBalancoUseCase")
  .to(CalcularBalancoUseCase);
container
  .bind<AnaliseBalancoUseCase>("AnaliseBalancoUseCase")
  .to(AnaliseBalancoUseCase);
container
  .bind<ConsolidarBalancoUseCase>("ConsolidarBalancoUseCase")
  .to(ConsolidarBalancoUseCase);

export default container;
