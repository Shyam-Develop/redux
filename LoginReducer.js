import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Button, IconButton } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import store from "../../index";
import { toast } from "react-toastify";
const initialState = {
  loginData: {},
  Status: "N",
  msg: "",
  loading: false,
  error: "",
};


export const authentication = createAsyncThunk(
  "lgems/authentication",
  async ({idata}) => {
    var url = store.getState().globalurl.loginUrl;
    var data = {
     ...idata
    };
    console.log("🚀 ~ file: Formapireducer.js:334 ~ data:", JSON.stringify(data))

    const response = await axios.get(url, {
      params: {
        data: JSON.stringify(idata),
      },
      headers: {
        Authorization:
"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODFlMTVlODVmZDhmYzMxMzk3NWY3MGNiODEwMjc3YWVhODRmODlkNjc4Y2I0ZDFkNTM2NGUyMjFlNWY4YzMxODQyYmYyMjY4MmJkMDYyZGMiLCJpYXQiOjE3MjI1MTk3NDAuMTk2OTg1LCJuYmYiOjE3MjI1MTk3NDAuMTk2OTk2LCJleHAiOjE3NTQwNTU3NDAuMTUyOTYzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.F4lOKPPewIKjbJKK-HPgBfK_mnG2Rzw4AUv4w87HGXLSXl3GYfGurHAlTriVQ-KkpOftCv_QGDDflCB2MG4D0bV6rcGsD7Ayvr40yk_m3Fyz1AhB2w70Y7gMpfhd_3hEDNWZ-V9lAgH24s-UCdFqKFwZkd9icQ84NfRij9bay3M7mjJ_KR06-cfuVMGhZFGnw89jiFr5FDt1DpWeqzAOjFIBtCfywV0CvNFMJtDrNvtjAzRAbR0vDVaXZBk0xa6aMyxBhhFX4fC9FaRAU15a9oQh2RH4OheNOvqH54v32BBXHx305g-S1DLYXQWlPUZROoTiaDrJezHPog3QKZlC3J7cscLIt-nd4XlYVe9ntMOGk7rzXvEAhcai1-yTkHZZfNfy7EIifi0hXcJrR9NbRjdloPjfGCo3BsH425V3PhUyr_OaC9KxxUHHLwmEnyCWlFIfAzyMpC9g7NqpSVDYcVt--mzxGkdY6_PF-g0e43h9d1g8uxbD6iZtLVAejpsmqoEWaJxKJNrESLiYOoYu0QFGFl46bkbuTwhepswe5Pwjs54S-ps7DB2igPgT9rABF-eotflzG-zruLGQNSO-fjRY5KjSE97n2W348DKjPxHF3U1q9BW2KhGAdb-h4bOKOT6Lu4cpN7v1eRnMxucEZV3a5kIrWc2xg-7H_s3zXi4"  },
    });
    console.log("🚀 ~ file: Formapireducer.js:345 ~ response:", response)
    return response.data;
  }
);

export const getApiSlice = createSlice({
  name: "loginApi",
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
        error: false,
      };
    },
    errored(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    Success(state, action) {
      console.log(
        "stage6--LoginReducer--inside Sucess reducer data" +
          JSON.stringify(action.payload)
      );

      return {
        ...state,
        loading: false,
        error: "",
        loginData: action.payload.apiResponse,
        Status: action.payload.Status,
        msg: action.payload.Msg,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authentication.pending, (state, action) => {
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(authentication.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
      })
      .addCase(authentication.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
    }
});

// Destructure and export the plain action creators
export const {
  pending,
  errored,

  Success,
} = getApiSlice.actions;

export default getApiSlice.reducer;

export function fetchApidata(emailID, password, company, year) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + JSON.stringify(success.data));
      localStorage.setItem("loginUserData", JSON.stringify(success.data.Data));
      const datawait = dispatch(
        Success({
          Status: success.data.Status,
          apiResponse: success.data.Data,
          Msg: success.data.Msg,
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.loginUrl;
      var idata = {
        Query: {
          username: emailID,
          password: password,
          yearrecordid: year,
          companyrecordid: company,
        },
      };
      dispatch(pending());
      idata = JSON.stringify(idata);
      console.log("🚀 ~ file: LoginReducer.js:94 ~ r eturn ~ idata:", idata)
      const success = await axios.get(url, {
        params: {
          data: idata,
        },
        headers: {
          Authorization:
"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODFlMTVlODVmZDhmYzMxMzk3NWY3MGNiODEwMjc3YWVhODRmODlkNjc4Y2I0ZDFkNTM2NGUyMjFlNWY4YzMxODQyYmYyMjY4MmJkMDYyZGMiLCJpYXQiOjE3MjI1MTk3NDAuMTk2OTg1LCJuYmYiOjE3MjI1MTk3NDAuMTk2OTk2LCJleHAiOjE3NTQwNTU3NDAuMTUyOTYzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.F4lOKPPewIKjbJKK-HPgBfK_mnG2Rzw4AUv4w87HGXLSXl3GYfGurHAlTriVQ-KkpOftCv_QGDDflCB2MG4D0bV6rcGsD7Ayvr40yk_m3Fyz1AhB2w70Y7gMpfhd_3hEDNWZ-V9lAgH24s-UCdFqKFwZkd9icQ84NfRij9bay3M7mjJ_KR06-cfuVMGhZFGnw89jiFr5FDt1DpWeqzAOjFIBtCfywV0CvNFMJtDrNvtjAzRAbR0vDVaXZBk0xa6aMyxBhhFX4fC9FaRAU15a9oQh2RH4OheNOvqH54v32BBXHx305g-S1DLYXQWlPUZROoTiaDrJezHPog3QKZlC3J7cscLIt-nd4XlYVe9ntMOGk7rzXvEAhcai1-yTkHZZfNfy7EIifi0hXcJrR9NbRjdloPjfGCo3BsH425V3PhUyr_OaC9KxxUHHLwmEnyCWlFIfAzyMpC9g7NqpSVDYcVt--mzxGkdY6_PF-g0e43h9d1g8uxbD6iZtLVAejpsmqoEWaJxKJNrESLiYOoYu0QFGFl46bkbuTwhepswe5Pwjs54S-ps7DB2igPgT9rABF-eotflzG-zruLGQNSO-fjRY5KjSE97n2W348DKjPxHF3U1q9BW2KhGAdb-h4bOKOT6Lu4cpN7v1eRnMxucEZV3a5kIrWc2xg-7H_s3zXi4"  },
      });
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}
