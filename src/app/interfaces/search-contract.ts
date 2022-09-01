export interface SearchContract{
    beginDate: Date;
    endDate: Date;
    adult: number;
    hotelIds: any[];
    numberOfChild?: number;
    child1Age?: number;
    child2Age?: number;
    child3Age?: number;
}