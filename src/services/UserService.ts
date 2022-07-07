import { AxiosResponse } from "axios";
import $api from "../http";
import IUser from "../models/IUser";

export const fetchUsers = (): Promise<AxiosResponse<IUser[]>> => {
  return $api.get<IUser[]>('/users');
}