import {FazendaModel} from "../models/fazenda.model";
import {EventSubscriber} from "typeorm";
import {SubscriberLog} from "./abstract.subscriber";


@EventSubscriber()
export class FazendaSubscribe extends SubscriberLog<FazendaModel> {
    listenTo() {
        return FazendaModel;
    }

}