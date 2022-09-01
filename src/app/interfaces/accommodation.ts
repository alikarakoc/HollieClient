import { PriceSearchDetail } from "./price-search-detail";

export interface Accommodation{
    agencyId: number;
    hotelId: number;
    roomTypeId: number;
    adult: number;
    numberOfChild: number;
    childAges: number[];
    agencyName: string;
    hotelName: string;
    roomName: string;
    totalPrice: number;
    priceDetails: PriceSearchDetail[];
  
}
//PriceSearchDto