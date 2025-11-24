import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import type { ApiResponse } from "../../../interfaces/components.interface";
import type { SelectBranchResponse } from "../../../interfaces/branch.interface";
import { handleRequestThunk } from "../../../utils/handle-request-thunk";
import { selectArea, selectBranch, selectPosition } from "../../../redux/features/auth.slice";
import type { SelectAreaResponse } from "../../../interfaces/area.interface";
import type { SelectPositionResponse } from "../../../interfaces/position.interface";

export const useApis = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectBranchApi = async (branchId: number) => {
    const response: ApiResponse<SelectBranchResponse> | null = await handleRequestThunk(
      dispatch,
      () => dispatch(selectBranch({ branchId })).unwrap(),
      { showSpinner: true }
    );
    return response;
  };

  const selectAreaApi = async (areaId: number, branchId: number) => {
    const response: ApiResponse<SelectAreaResponse> | null = await handleRequestThunk(
      dispatch,
      () => dispatch(selectArea({ areaId, branchId })).unwrap(),
      { showSpinner: true }
      
    );
    return response;
  };

  const selectPositionApi = async (areaId: number, positionId: number) => {
    const response: ApiResponse<SelectPositionResponse> | null = await handleRequestThunk(
      dispatch,
      () => dispatch(selectPosition({ areaId, positionId })).unwrap(),
      { showSpinner: true }
    );
    return response;
  };

  return {
    selectBranchApi,
    selectAreaApi,
    selectPositionApi,
  };
};
