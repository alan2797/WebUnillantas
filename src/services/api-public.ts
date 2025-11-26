import axios from "axios";
import { env } from "../config/env";

export const apiPublic = axios.create({
  baseURL: env.baseApi,
});