import { Base } from "./base";

export interface Hotel extends Base{
  code: string;
  id?: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  hotelCategoryId: number;
  hotelFeatureId: number;
  status: boolean;
}
