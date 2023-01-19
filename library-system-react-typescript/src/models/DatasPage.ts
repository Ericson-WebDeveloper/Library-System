

export interface DatasWPage<D> {
    data: D[] | [];
    totalDatas: number;
    totalPage: number;
    previous: number | null;
    next: number | null;
    currePage: number;
    rowsPerPage: number;
}