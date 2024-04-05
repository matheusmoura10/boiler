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
  .bind<FazendaGeracaoModel>("FazendaGeracaoModel")
  .to(FazendaGeracaoModel);
container
  .bind<FazendaGeracaoRepository>("FazendaGeracaoRepository")
  .to(FazendaGeracaoRepository);

export default container;
