
import api from "./api";

export const sessionConfirmService = async () => {
  const res = await api.post("/sessions/confirm");
  return res;
};
