export interface Room {
    code: string;
    id?: number; 
    roomTypeId: number;
    hotelId: number;
    name: string;
    slot: number;
    bed: string;
    status: boolean;
}
  