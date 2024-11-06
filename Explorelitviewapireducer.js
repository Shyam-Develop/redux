import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, IconButton, Tooltip, Stack, Box,  Chip, } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import store from "../..";
import{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';
import OpenInBrowserOutlinedIcon from '@mui/icons-material/OpenInBrowserOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import workinProgress from '../../assets/img/wip.png'
import DescriptionIcon from '@mui/icons-material/Description';
import { FaEdit } from "react-icons/fa";
const initialState = {
  explorerowData: [],
  explorecolumnData: [],
  loading: false,
  error: "",
  clickeddata: "",
  popupOpen:false,
  Data:{},
  exploreRowDataID:[],
  exploreColumnDataID:[],
 
  
};


export const userGroupExplore= createAsyncThunk("explore/listview",
  async ({ CompanyID,UsergroupID }) => {
    var url = store.getState().globalurl.userGroupUrl;
    var data = { CompanyID,UsergroupID };
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
  
);

export const getFetchUserData = createAsyncThunk(
  "allScreen/Header",
  async ({ accessID, get, recID,}) => {
    var url = store.getState().globalurl.apiUrl;
    var data = { 
      accessid: accessID,
      action: get,
      recid: recID,};
   
    
    console.log("🚀 ~ file: Formapireducer.js:225 ~ data:", JSON.stringify(data))

    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);

export const packingListView = createAsyncThunk(
  "packing/detail",
  async ({ accessID, screenName, filter,any,CompID}) => {
    var url = store.getState().globalurl.listViewurl;
    var idata = {
      Query: {
        AccessID: accessID,
        ScreenName: screenName,
        Filter: filter,
        Any: any,
        CompId:CompID
      },
    };
   
    
    console.log("🚀 ~ file: Formapireducer.js:225 ~ data:", JSON.stringify(idata))
    idata = JSON.stringify(idata);
    const response = await axios
    .get(url, {
      params: {
        data: idata,
      },
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
export const getApiSlice = createSlice({
  name: "exploreApi",
  initialState,
  reducers: {
    lookupOpen(state,action){
      state.isLookupOpen = !state.isLookupOpen
    },
    userGroupRowUpdate(state,action){
      state.explorerowData = action.payload.rowData
    },
    packingRowUpdate(state,action){
     console.log("🚀 ~ file: Explorelitviewapireducer.js:96 ~ packingRowUpdate ~ action:", action)
     switch(action.payload.type){

      case "INSERTED":
       state.exploreRowDataID.push(...action.payload.data)
        break
      case "EDITED":
        state.exploreRowDataID = action.payload.data
        break
      case "RESET":
          state.exploreRowDataID = action.payload.data
        break
     }
    },
    addtionalQtyCal(state,action){
      console.log("🚀 ~ file: Explorelitviewapireducer.js:138 ~ addtionalQtyCal ~ action:", action)
      
      // for(let row of action.payload.listviewData){
      //   console.log("🚀 ~ file: Explorelitviewapireducer.js:142 ~ addtionalQtyCal ~ row:", row)
     
      //   return{
      //     ...row,
      //     RequiredQty:"hai"
      //   }
      // }
      const newArr =  action.payload.listviewData.map((row)=>{

        return{
          ...row,
          RequiredQty: Number(row.RequiredQty) +(Number(action.payload.values.AdditionalQty) *Number(row.BomQty))
        }
    
      })
        

      state.explorerowData =  newArr

      
    },
    pending(state) {
      return {
        ...state,
        loading: true,
        explorerowData: [],
        explorecolumnData: [],
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
      if(action.payload.screen == "batch"){
        return {
          ...state,
          loading: false,
          error: "",
          explorerowData: action.payload.rowDataBatch,
          // explorecolumnData: action.payload.columndata,
          // clickeddata:action.payload.currentRow,
        };
      }else{
      return {
        ...state,
        loading: false,
        error: "",
        explorerowData: action.payload.rowdata,
        explorecolumnData: action.payload.columndata,
        // clickeddata:action.payload.currentRow,
      };}
    },
    openPopup: (state,action) => {
       state.popupOpen  = action.payload.isOpen
    }
  },
  extraReducers(builder) {
    builder
      .addCase(userGroupExplore.pending, (state, action) => {
        state.explorerowData =  []
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(userGroupExplore.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;

        state.explorerowData =  action.payload.Data

        
        // state.explorecolumnData= action.payload.columndata
      })
      .addCase(userGroupExplore.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
      .addCase(packingListView.pending, (state, action) => {
        state.exploreColumnDataID=[]
        state.exploreRowDataID=[]
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(packingListView.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
        state.exploreColumnDataID=action.payload.Data.columns
        state.exploreRowDataID=action.payload.Data.rows

      })
      .addCase(packingListView.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
      .addCase(getFetchUserData.pending, (state, action) => {
        state.Status = "idle";
        state.loading = true;
        state.Data =  {}
        state.explorerowData=[]
      })
      .addCase(getFetchUserData.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;

        state.Data =  action.payload.Data

        if(action.payload.Data.Groupaccess){
          state.explorerowData = action.payload.Data.Groupaccess
        }

        
        // state.explorecolumnData= action.payload.columndata
      })
      .addCase(getFetchUserData.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
    }
});

// Destructure and export the plain action creators
export const {
  pending,
  errored,
  packingRowUpdate,
  Success,
  openPopup,
  addtionalQtyCal,
  userGroupRowUpdate,
  lookupOpen
} = getApiSlice.actions;

export default getApiSlice.reducer;


// React.useEffect(() => {
//   if(screenName == 'EditAddTruck'){
//   dispatch(fetchExplorelitview(   "",
//     screenName,   
//     "",
//     "",
//   ""));
//   }
// else{
// dispatch(fetchExplorelitview( "", "EditEnqiuryTruck", "", "", ""));
  
// } }, [location.key]);
export const fetchExplorelitview =
  (AccessID, screenName, filter, any,allfilter) => async (dispatch, getState) => {
    console.log("🚀 ~ file: Explorelitviewapireducer.js:209 ~ filter:", filter)
var url = ''
if(screenName == 'EditAddTruck'){
   url = store.getState().globalurl.truckdetailListUrl + "/"+filter ;
}  //EnquiryTruckListUrl
else{
  url = store.getState().globalurl.EnquirylistUrl;
}

    // const navigate = useNavigate();
   
    console.log("url" , url);
    const CompId = sessionStorage.getItem("compID")
   
    dispatch(pending());
    axios
      .get(url, {
        params: {
          "All":allfilter,
          "filter":filter
        },
        headers: {
          Authorization:
"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODFlMTVlODVmZDhmYzMxMzk3NWY3MGNiODEwMjc3YWVhODRmODlkNjc4Y2I0ZDFkNTM2NGUyMjFlNWY4YzMxODQyYmYyMjY4MmJkMDYyZGMiLCJpYXQiOjE3MjI1MTk3NDAuMTk2OTg1LCJuYmYiOjE3MjI1MTk3NDAuMTk2OTk2LCJleHAiOjE3NTQwNTU3NDAuMTUyOTYzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.F4lOKPPewIKjbJKK-HPgBfK_mnG2Rzw4AUv4w87HGXLSXl3GYfGurHAlTriVQ-KkpOftCv_QGDDflCB2MG4D0bV6rcGsD7Ayvr40yk_m3Fyz1AhB2w70Y7gMpfhd_3hEDNWZ-V9lAgH24s-UCdFqKFwZkd9icQ84NfRij9bay3M7mjJ_KR06-cfuVMGhZFGnw89jiFr5FDt1DpWeqzAOjFIBtCfywV0CvNFMJtDrNvtjAzRAbR0vDVaXZBk0xa6aMyxBhhFX4fC9FaRAU15a9oQh2RH4OheNOvqH54v32BBXHx305g-S1DLYXQWlPUZROoTiaDrJezHPog3QKZlC3J7cscLIt-nd4XlYVe9ntMOGk7rzXvEAhcai1-yTkHZZfNfy7EIifi0hXcJrR9NbRjdloPjfGCo3BsH425V3PhUyr_OaC9KxxUHHLwmEnyCWlFIfAzyMpC9g7NqpSVDYcVt--mzxGkdY6_PF-g0e43h9d1g8uxbD6iZtLVAejpsmqoEWaJxKJNrESLiYOoYu0QFGFl46bkbuTwhepswe5Pwjs54S-ps7DB2igPgT9rABF-eotflzG-zruLGQNSO-fjRY5KjSE97n2W348DKjPxHF3U1q9BW2KhGAdb-h4bOKOT6Lu4cpN7v1eRnMxucEZV3a5kIrWc2xg-7H_s3zXi4"
        },
      })
      .then((response) => {
         console.log("without authorization---"+JSON.stringify(response.data));
        var exploreData = response.data;
      
  if (exploreData.Status == "Y") {


    var obj = {};
    var currentRow = "";
    obj = {
      field: "action",
      headerName: "",
      width:80,
      align:"center",
      sortable: false,
        disableColumnMenu:true,
      renderCell: (params) => {
                     
        return (
          <>
            {screenName === 'EditAddTruck' && (
              <Stack direction="row">
                <Tooltip title="Edit">
                  <Button sx={{
                    backgroundColor: 'Tomato',
                  
                  }} variant="contained"  size="small">
                  Edit
                  </Button>
                </Tooltip>
              </Stack>
            )}
          </>
        );
      },
    };
 
    exploreData.headers.push(obj);

    dispatch(
      Success({
        columndata: exploreData.headers,
        rowdata: exploreData.rows,
      })
    );
   
  } else {
    dispatch(Success({ columndata: [], rowdata: [] }));
  }
    

  
      })

      .catch((error) => {
        dispatch(errored(error.message));
      });
  };




