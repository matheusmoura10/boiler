export interface InputNumberPadrao {
    id: number;
}

export interface InputStringPadrao {
    nome: string;
}

export interface InputListaPaginada {
    page: number;
    limit: number;
    filter: string | null;
    filterColumn: string | null;
    orderby: string
    direction: string;
}