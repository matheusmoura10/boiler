export default class DomainException {
    public message: string = '';
    public erros: string[] = [];

    constructor(message: string, conteudo: Map<string, string>) {
        this.erros = Array.from(conteudo.values());
        this.message = message;

    }

    getErros(): string[] {
        return this.erros;
    }
}