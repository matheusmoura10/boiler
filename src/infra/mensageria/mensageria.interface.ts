export default abstract class Mensageria {
  abstract conectar(): Promise<boolean>;
  abstract enviarMensagem(mensagem: string, queue: string): Promise<void>;
  abstract consumirMensagem(
    queue: string,
    callback: (msg: any) => void
  ): Promise<void>;
  abstract ack(msg: any): void;
  abstract nack(msg: any): void;
}
