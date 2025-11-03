export class QueryParams {
    constructor(
        public PageNumber: number = 1,
        public PageSize: number = 4,
        public Search?: string,
        public OrderByProperty?: string,
        public Desc?: boolean
    ) { }
}