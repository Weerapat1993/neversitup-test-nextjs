import { baseUrl } from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookies from "js-cookie";

type AuthState = {
  loading: false
  data: AuthDataResponse
  error: any;
};

type AuthDataResponse = {
  token: string | null;
}

type LoginPayload = {
  username: string
  password: string
}

export const authLogin = createAsyncThunk('authLogin', async (payload: LoginPayload) => {
  try {
    const res = await axios({
      url: baseUrl('users/auth'),
      method: 'POST',
      data: {
        username: payload.username,
        password: payload.password,
      }
    })
    return res.data
  } catch (e) {
    console.error(e)
    return e
  }
})


const initialState = {
  loading: false,
  data: {
    token: null
  },
  error: null,
} as AuthState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    init: () => initialState,
    getToken: (state) => {
        const token = cookies.get('jwt')
        state.data.token = token;
    },
    login: (state, action) => {
      console.log('authLogin')
    },
  },
  extraReducers: {
    [`${authLogin.pending}`]: (state) => {
      state.loading = true
      state.error = null
    },
    [`${authLogin.fulfilled}`]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = null
      cookies.set('jwt', action.payload.token)
    },
    [`${authLogin.rejected}`]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  }
});

export const {
  init,
  getToken,
} = auth.actions;
export default auth.reducer;

