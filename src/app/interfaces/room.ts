export interface Room {
    id?: number;
    code: string;
    name: string;
    hotelId: number;
    roomTypeId: number;
    clean: boolean;
    reservation?: boolean;
    status: boolean;
}
