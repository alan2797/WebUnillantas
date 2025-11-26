import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { ChangePasswordDto, ChangePasswordRequestDto, ForgotUsernameRequestDto, LoginRequestDto, LoginResponseDto, SelectAreaDto } from "../../interfaces/login.interface";
import { localStorageService } from "../../services/localstorage";
import {
  sessionConfirmService,
} from "../../services/sessions";
import { authService, changePasswordTempService, permissionsUserService, recoveryUsernameService } from "../../services/auth";
import { getAreasService, getPositionsService } from "../../services/catalogs";

export interface AuthState {
  user: LoginResponseDto | null;
  token: string | null;
  tempToken: string | null;
  resetToken: string | null;
  error: string | null;
  loadingPermissions: boolean;
  tempPassword?: string | null;
}

const initialState: AuthState = {
  user: null,
  resetToken: null,
  token: localStorageService.getToken() ?? "",
  error: null,
  loadingPermissions: false,
  tempPassword: null,
  tempToken: null
};

// 🔹 AsyncThunk para login
export const login = createAsyncThunk("auth/login", async (credentials: LoginRequestDto, { rejectWithValue }) => {
  try {
    const response = await authService(credentials);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

// 🔹 AsyncThunk para login
export const changePassword = createAsyncThunk("auth/change-password", async (credentials: ChangePasswordDto, { rejectWithValue }) => {
  try {
    const response = await changePasswordTempService(credentials.password, credentials.token);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});



export const getAreas = createAsyncThunk("auth/getAreas", async (branchId: number, { rejectWithValue }) => {
  try {
    const response = await getAreasService(branchId);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const getPositions = createAsyncThunk("auth/getPositions", async (areaId: number, { rejectWithValue }) => {
  try {
    const response = await getPositionsService(areaId);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});


export const recoveryUsername = createAsyncThunk("auth/recoveryUsername", async (data: ForgotUsernameRequestDto, { rejectWithValue }) => {
  try {
    const response = await recoveryUsernameService(data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const sessionConfirm = createAsyncThunk("auth/sessionsConfirm", async (_, { rejectWithValue }) => {
  try {
    const response = await sessionConfirmService();
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const getPermissionsUser = createAsyncThunk("auth/permissionsUser", async (_, { rejectWithValue }) => {
  try {
    const response = await permissionsUserService();
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setTempPassword(state, action: PayloadAction<string>) {
      if (state.user) {
        state.tempPassword = action.payload;
      }
    },
    clearTempPassword(state) {
      if (state.user) {
        state.tempPassword = undefined;
      }
    },
    setTempToken(state, action: PayloadAction<string>) {
        state.tempToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data;
        if(action.payload.data.user.isTemporaryPassword){
          state.tempToken = action.payload.data.tokens.accessToken
        }else{
          state.token = action.payload.data.tokens.accessToken;
          localStorageService.setToken(action.payload.data.tokens.accessToken);
        }
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.user = action.payload.data;
        if(action.payload.success && state.tempToken){
          state.token = state.tempToken;
          localStorageService.setToken(state.tempToken);
          state.tempPassword = null;
          state.tempToken = null;
        }
      })
      
      .addCase(sessionConfirm.fulfilled, (state, action) => {
        //state.token = action.payload.data.token;
        //localStorageService.setToken(action.payload.data.token);
      })
      .addCase(getPermissionsUser.pending, (state) => {
        state.loadingPermissions = true;
      })
      
      .addCase(getPermissionsUser.rejected, (state) => {
        state.loadingPermissions = false;
      });
  },
});

export const { logout, setTempPassword, clearTempPassword } = authSlice.actions;
export default authSlice.reducer;
