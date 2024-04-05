export default interface OutputListaPaginada<T> {
    items: T[];
    total: number;
    totalPages: number;
    currentPage: number;
}