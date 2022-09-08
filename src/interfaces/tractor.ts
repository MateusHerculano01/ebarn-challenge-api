import { UserInterface } from "./user";

export interface TractorInterface {
  user?: UserInterface;
  _id?: string | number | object;
  manufacturer: string;
  modelName: string;
  power: string;
  year: number;
  photo: string | undefined;
  photoUrl?: string;
}
