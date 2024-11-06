import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, IconButton, Tooltip, Stack, Box, Alert } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import store from "../..";
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useNavigate } from "react-router-dom";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import { toast } from "react-hot-toast";
import { redirect } from "react-router-dom";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { hashtoken, StockProcessApi } from "./Formapireducer";
import OpenInBrowserOutlinedIcon from '@mui/icons-material/OpenInBrowserOutlined';
import { CheckBox } from "@mui/icons-material";
import { IoPeopleSharp } from "react-icons/io5";
import { IoPricetags } from "react-icons/io5";
import { BsFillBasket3Fill } from "react-icons/bs";
import { IoPrintOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import Swal from "sweetalert2"
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

const initialState = {
  rowData: [],
  columnData: [],
  loading: false,
  error: "",
  mailOpen: false,
  pdfOpen: false,
  mailData: {},
  currentMailData : {},
  pdfData: {},
  currentPdfData : {},
  mailGetData: {},
  materialRecID:"",
  isLookupOpen:false,
  productionCardRecid:0,
  priceListData:[],
  brandListData:[],
  classDescription:[],
  Commodity:[],
  primaryLoading:false,
  secondaryLoading:false,
  tertiaryLoading:false,
  primaryListviewData:{
    row:[],
    columns:[]
  },
  secondaryListviewData:{
    row:[],
    columns:[]
  },
  terriaryListviewData:{
    row:[],
    columns:[]
  },
  // lookupRowData: [],
  // lookupColumnData: [],
};


const Finyear = sessionStorage.getItem("year");
export const getMail = createAsyncThunk("mail/get", async (data) => {
  var url = store.getState().globalurl.mailContentGeturl;

  // console.log("get" + JSON.stringify(data));
  // console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
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
});

export const sendMail = createAsyncThunk(
  "mail/send",
  async ({ accessID, action, idata }) => {
    const url = store.getState().globalurl.mailSendUrl;
    const data = {
      ToID: idata.ToID,
      Cc: idata.Cc,
      Subject: idata.Subject,
      Attachment: idata.Attachment,
      Message: idata.Message,
    };
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    toast.success("Mail Send Successfully");
    return response.data;
  }
);

export const primaryListview = createAsyncThunk("printpricebook/primary", async (data) => {
  var url = store.getState().globalurl.listViewurl;

  // console.log("get" + JSON.stringify(data));
  console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
  const response = await axios.get(url, {
    params: {
      data
    },
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
    },
  })
  return response.data;
});
export const secondaryListview = createAsyncThunk("printpricebook/secondary", async (data) => {
  var url = store.getState().globalurl.listViewurl;

  // console.log("get" + JSON.stringify(data));
  // console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
  const response = await axios.get(url, {
    params: {
      data
    },
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
    },
  })
  return response.data;
});
export const tertiaryListview = createAsyncThunk("printpricebook/tertiary", async (data) => {
  var url = store.getState().globalurl.listViewurl;

  const response = await axios.get(url, {
    params: {
      data
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
});

export const getApiSlice = createSlice({
  name: "listviewApi",
  initialState,
  reducers: {
    productionlookupOpen(state,action){
      state.isLookupOpen = !state.isLookupOpen
      //here change
      state.materialRecID = action.payload.materialRecID;
      state.productionCardRecid = action.payload.productionCardID;
    },
    mailOpen(state, action) {
      state.mailOpen = !state.mailOpen;
      state.mailData = action.payload;
    },
    currentMail(state, action) {
      state.currentMailData = action.payload;
    },
    currentPDF(state, action) {
      state.currentPdfData = action.payload;
    },
    pdfOpen(state, action) {
      state.pdfOpen = !state.pdfOpen;
      state.pdfData = action.payload;
    },
    listviewRowData(state, action){
      state.priceListData = action.payload;
    },
    listviewBrandData(state, action){
      state.brandListData = action.payload;
    },
    listviewclassDescData(state, action){
      state.classDescription = action.payload;
    },
    listviewCommodityData(state, action){
      state.Commodity = action.payload;
    },
    pending(state) {
      return {
        ...state,
        loading: true,
        error: false,
        rowData: [],
        columnData: [],
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
      return {
        ...state,
        loading: false,
        error: "",
        rowData: action.payload.rowdata,
        columnData: action.payload.columndata,
      };
    },

    // lookupPending(state) {
    //   return {
    //     ...state,
    //     loading: true,
    //     error: false,
    //     lookupRowData: [],
    //     lookupColumnData: [],
    //   };
    // },
    // lookupErrored(state, action) {
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload,
    //   };
    // },
    // lookupSuccess(state, action) {
    //   return {
    //     ...state,
    //     loading: false,
    //     error: "",
    //     lookupRowData: action.payload.rowdata,
    //     lookupColumnData: action.payload.columndata,
    //   };
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getMail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMail.fulfilled, (state, action) => {
        state.loading = false;

        state.mailGetData = action.payload;
      })
      .addCase(getMail.rejected, (state, action) => {
        state.loading = false;
      })


      .addCase(primaryListview.pending, (state, action) => {
        state.primaryLoading = true;
        state.primaryListviewData.columns = [];
        state.primaryListviewData.row = [];
      })
      .addCase(primaryListview.fulfilled, (state, action) => {
        state.primaryLoading = false;

        state.primaryListviewData.columns = action.payload.Data.columns;
        state.primaryListviewData.row = action.payload.Data.rows;
      })
      .addCase(primaryListview.rejected, (state, action) => {
        state.primaryLoading = false;
        state.primaryListviewData.columns = [];
        state.primaryListviewData.row = [];
      })
      .addCase(secondaryListview.pending, (state, action) => {
        state.secondaryLoading = true;
        state.secondaryListviewData.columns = [];
        state.secondaryListviewData.row = []
      })
      .addCase(secondaryListview.fulfilled, (state, action) => {
        state.secondaryLoading = false;

        state.secondaryListviewData.columns = action.payload.Data.columns;
        state.secondaryListviewData.row = action.payload.Data.rows
      })
      .addCase(secondaryListview.rejected, (state, action) => {
        state.secondaryLoading = false;
        state.secondaryListviewData.columns = [];
        state.secondaryListviewData.row = []
      })
      .addCase(tertiaryListview.pending, (state, action) => {
        state.tertiaryLoading = true;
        state.terriaryListviewData.columns = [];
        state.terriaryListviewData.row = [];
      })
      .addCase(tertiaryListview.fulfilled, (state, action) => {
        state.tertiaryLoading = false;
        state.terriaryListviewData.columns = action.payload.Data.columns;
        state.terriaryListviewData.row = action.payload.Data.rows
      })
      .addCase(tertiaryListview.rejected, (state, action) => {
        state.tertiaryLoading = false;
        state.terriaryListviewData.columns = [];
        state.terriaryListviewData.row = [];
      })

      
  },
});

// Destructure and export the plain action creators
export const { pending, errored, mailOpen, pdfOpen,Success,productionlookupOpen,listviewRowData,listviewBrandData,listviewCommodityData,listviewclassDescData,currentPDF,currentMail } = getApiSlice.actions;

export default getApiSlice.reducer;

// const loader = async () => {

//     return redirect("/");

// };

const productionCardUPdate = (type, recID) => (dispatch, getState) => {
  //  alert(type);

  var updateName = "";

  if (type === "S") {
    updateName = "Production Card Started ";
  }
  if (type === "P") {
    updateName = "Production Card Paused";
  }
  if (type === "C") {
    updateName = "Production Card Completed";
  }
  if (type === "R") {
    updateName = "Production Card Continued";
  }
  var url = store.getState().globalurl.pcdurl;
  var data = {
    accessid: "TR047",
    Type: type,
    RecordID: recID,
  };
  console.log("🚀 ~ file: Listviewapireducer.js:113 ~ data:", data);

  axios
    .post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })

    .then((response) => {
      console.log(
        "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
        response.data
      );
      // console.log("response data" + response.data);
      if (response.data.Status == "Y") {
        toast.success(`${updateName}`);
        // window.location.href = '/Apps/TR056/Customer%20Order'
      } else {
        toast.error(`${"Error"}`);
      }
    })
    .catch((error) => {
      dispatch(errored);
      //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
    });
};

const fnProcess = (recID, accessid) => (dispatch, getState) => {
  var url = store.getState().globalurl.imageNameUpdateUrl;

  var data = { accessid: accessid, Recordid: recID,Action:"none",ImageName :"no" };
  console.log(
    "🚀 ~ file: Listviewapireducer.js:228 ~ fnProcess ~ data:",
    JSON.stringify(data)
  );

  axios
    .post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })

    .then((response) => {
      console.log(
        "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
        response.data
      );
      // console.log("response data" + response.data);
      if (response.data.Status == "Y") {
        // window.location.href = '/Apps/TR056/Customer%20Order'
      } else {
        toast.error(`${"Error"}`);
      }
    });
};

const indentOrderSave =
  (type, recID, SupplierID, parentID) => (dispatch, getState) => {
    var url = store.getState().globalurl.indentUrl;
    const Finyear = sessionStorage.getItem("year");
    var data = {
      accessid: "TR056",
      Type: type,
      RecordID: recID,
      SupplierID,
      Finyear
    };

    console.log("INDENTSTRUCT" + JSON.stringify(data));
    // dispatch(pending());

    
    axios
      .post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })

      .then((response) => {
        console.log(
          "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
          response.data
        );
        // alert( JSON.stringify( response.data))
        console.log("response data" + response.data);
        console.log("response data" + response.data.Type);

        if (response.data.Status == "Y") {
          if (response.data.Insert == "Y") {
            toast.success(response.data.Msg);
            if (response.data.Type == "L") {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditIndent%20Order/${response.data.RecordID}/E`;
            } else {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditMaterial IndentOrder/${response.data.RecordID}/E`;
            }
          } else {
            if (response.data.Type == "L") {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditIndent%20Order/${response.data.RecordID}/E`;
            } else {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditMaterial IndentOrder/${response.data.RecordID}/E`;
            }
          }
        } else {
          toast.error(response.data.Msg);
        }
      });
  };

const PurchaseIndent = createAsyncThunk(
  "Production Card/Indent",
  ({ RecordID }) => {
    var url = store.getState().globalurl.pIndentUrl;
    var data = {
      accessid: "TR108",
      RecordID: RecordID,
    };

    console.log("INDENTSTRUCT" + JSON.stringify(data));
    // dispatch(pending());
    axios
      .post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })

      .then((response) => {
        console.log(
          "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
          response.data
        );
        // console.log("response data" + response.data);
        if (response.data.Status == "Y") {
          if (response.data.Insert == "Y") {
            toast.success(response.data.Msg);
            window.location.href = `/Apps/Secondarylistview/TR108/Material IndentOrder/${RecordID}/${response.data.ProdcrdNO}`;
          } else {
            window.location.href = `/Apps/Secondarylistview/TR108/Material IndentOrder/${RecordID}/${response.data.ProdcrdNO}`;
          }
        } else {
          toast.error(response.data.Msg);
        }
      });
  }
);

const CustomerOrderSave = (type, recID) => (dispatch, getState) => {
  //  alert(type);

  var url = store.getState().globalurl.pcdurl;
  var data = {
    accessid: "TR047",
    Type: type,
    RecordID: recID,
  };

  console.log(data);
  // dispatch(pending());
  axios
    .post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })

    .then((response) => {
      console.log(
        "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
        response.data
      );
      // console.log("response data" + response.data);
      if (response.data.Status == "Y") {
        toast.success(``);
        // window.location.href = '/Apps/TR056/Customer%20Order'
      } else {
        toast.error(``);
      }
    })
    .catch((error) => {
      dispatch(errored);
      //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
    });
};
export const fetchListview =
  (AccessID, screenName, filter, any, CompId) => async (dispatch, getState) => {
    // const navigate = useNavigate();;





    var url ="";
    if(screenName ==  'Company' ) {
      var url = store.getState().globalurl.companyListViewUrl;
    }
   else if(screenName ==  'Driver' ) {
      var url= store.getState().globalurl.driverListViewUrl;
    }
    else if(screenName == 'Route'){
      var url = store.getState().globalurl.routeListViewUrl;
    }
   else if(screenName == 'Truck'){
    var url = store.getState().globalurl.truckListViewUrl;
   }else{
    var url = store.getState().globalurl.listViewurl;
}


    var compID = sessionStorage.getItem("compID");
    // alert(compID);
    const year = sessionStorage.getItem("year");
    const company = sessionStorage.getItem("company");
    // alert("Inside listview--",sessionStorage.getItem("UserName"));
    var LoggedInUserName = sessionStorage.getItem("UserName");

    // if (AccessID != "TR080") {
    //   filter = "parentID='" + filter + "'";
    //   // console.log("---3---",filter);
    // }
   
    var idata = {
      Query: {
        AccessID: AccessID,
        ScreenName: screenName,
        Filter: filter,
        Any: any,
        CompId,
      },
    };

    idata = JSON.stringify(idata);

     
    console.log("data--" + idata);

    dispatch(pending());
    axios
      .get(url, {
        params: {
          data: idata,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })
      .then((response) => {
        console.log("without authorization---" + JSON.stringify(response));
        var listviewData = response.data;
        if (listviewData.Status == "Y") {
          var obj = {};
        if (AccessID != "TR203" && AccessID != "PM206" && AccessID != "TR204" && AccessID != "PM207" && AccessID != "PM210") {
            obj = {
              field: "action",
              headerName: "Action",
              width:200,
              headerAlign: 'center',
              align:"center",
              filterable: false,
              sortable: false,
              disableColumnMenu:true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Stack direction="row" >
                   {AccessID !== "TR094" && AccessID !== "TR095" && AccessID !== "TR032" && AccessID !== "TR099" && AccessID !== "TR048" &&  AccessID !== "TR010" && AccessID !== "TR083" && AccessID !== "TR097" && AccessID !== "TR052"  ? <Link to={`./Edit${screenName}/${params.row.RecordID}/E`} state={{ CustomerID:params.row.CustomerRecordID ,ProductID : params.row.ProductRecordID,BomID: params.row.BomRecordID}}>
                      <Tooltip title="Edit">
                        <IconButton color="info" size="small"  >
                          <ModeEditOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link> :false}
                    {AccessID == "TR094" ? <Link to={`./Edit${screenName}/${params.row.RecordID}/E`} >
                      <Tooltip title="Edit">
                        <IconButton sx={{color:"#174c4f" }}   size="large" >
                          < FaEdit />
                        </IconButton>
                      </Tooltip>
                    </Link> :false}

                    {AccessID == "TR095" ? <Link to={`./Edit${screenName}/${params.row.RecordID}/E`} >
                      <Tooltip title="Edit">
                        <IconButton sx={{color:"#174c4f" }}   size="large" >
                          < FaEdit />
                        </IconButton>
                      </Tooltip>
                    </Link> :false}
                   
                    {AccessID == "TR052" ? <Link to={`./EditDelivery Chalan/${params.row.RecordID}/E`} >
                      <Tooltip title="Edit">
                        <IconButton color="info" size="small"  >
                          <ModeEditOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link> :false}
                    {AccessID == "TR099" ?
                     <Link to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}`} >
                     <Tooltip title="List of  usergroups">
                       <IconButton sx={{color:"#174c4f" }}  size="large">
                         <FaUsers />
                       </IconButton>
                     </Tooltip>
                 </Link>
                :false}
              </Stack>
                );
              },
            };
          }
        
          if (AccessID == "TR201") {
            obj = {
              field: "action",
              headerName: "Action",
              flex :1,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>

                    {/* // <Stack direction="row" spacing={1}> */}
                    {/* <Tooltip title="Print Full Price Book">
                    <IconButton sx={{color:"#dd2c00" }} size="large" onClick={()=>{Swal.fire({
        title: `It is used to Print Full Print Price Book for entire rungroup that is each customer address will have a pdf without any filter.This feature will be available in Phase 1 scope`,
        // text:data.payload.Msg,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        } else {
          return;
        }
      });}}><IoPrintOutline /> </IconButton> 
                     </Tooltip>
                    <Tooltip title="Email Full Price Book">
                    <IconButton    sx={{color:"#174c4f" }} size="large"  onClick={()=>{Swal.fire({
        title: `It is used to Email Full Print Price Book for entire rungroup that is each customer address will have a pdf without any filter.This feature will be available in Phase 1 scope`,
        // text:data.payload.Msg,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        } else {
          return;
        }
      });}}><IoMailOpenOutline /> </IconButton> 
                     </Tooltip> */}
                    
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.ppc_RunGroup}`}
                    >
                      <Tooltip title="Customer/Address">
                      <Button variant="contained"  sx={{
                  backgroundColor: '#174c4f',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#82ada5', // Custom hover color
                  },
                }} startIcon={<GrView />}>View Customer/Address({params.row.CustomerCount}) </Button> 
                       
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } 
          if (AccessID == "TR202") {
           const obj1 = {
              field: "FullPriceItems",
              headerName: "Full Price List",
              width:200,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {/* // <Stack direction="row" spacing={1}> */}
                    
                    { params.row.FullPriceItems == "Y" ? 
                     <Tooltip title="Full Price List">
                     <IconButton   sx={{color:"#174c4f" }} size="large"><TiTick  /> </IconButton> 
                      </Tooltip> : <Tooltip title="Full Price List">
                     <IconButton   sx={{color:"#dd2c00" }} size="large"><IoClose /> </IconButton> 
                      </Tooltip>}
                    
                  </Box>
                );
              },
            };
            
            listviewData.Data.columns.push(obj1);
            const obj2 = {
              field: "CustomPriceList",
              headerName: "Custom Price List",
              width:200,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {/* // <Stack direction="row" spacing={1}> */}
                    { params.row.CustomPriceList=="Y" ? 
                     <Tooltip title="Custom Price List">
                        <IconButton   sx={{color:"#174c4f" }} size="large"><TiTick  /> </IconButton> 
                      </Tooltip> : <Tooltip title="Custom Price List">
                     <IconButton   onClick={()=>{dispatch(pdfOpen({}));
                         }} sx={{color:"#dd2c00" }} size="large"><IoClose /> </IconButton> 
                      </Tooltip>}
                  </Box>
                );
              },
            };
            listviewData.Data.columns.push(obj2);
           const  obj3 = {
              field: "action",
              headerName: "Action",
              flex:1,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
               
                return (
                  <Box>
                    {/* // <Stack direction="row" spacing={1}> */}
                    <Tooltip title="Print Full Price Book">
                    <IconButton   onClick={()=>{dispatch(pdfOpen({HashtokenI:params.row.HashtokenI,HashtokenP:params.row.HashtokenP,Type:'L',PriceListID:'',Brand:'',Classdesc:'',Commodity:''}));
                        }} sx={{color:"#dd2c00" }} size="large"><IoPrintOutline /> </IconButton> 
                     </Tooltip>
                    <Tooltip title="Email Full Price Book">
                    <IconButton    sx={{color:"#174c4f" }} size="large"  onClick={() => {
                          dispatch(
                            mailOpen({HashtokenI:params.row.HashtokenI,HashtokenP:params.row.HashtokenP,Type:'L',PriceListID:'',Brand:'',Classdesc:'',Commodity:''})
                          );
                        }}><IoMailOpenOutline /> </IconButton> 
                     </Tooltip>
                     {params.row.FullPriceItems=="N" && params.row.CustomPriceList=="Y" ?
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.ppc_RunGroup}/${params.row.CUSTNMBR}/('PC')`}
                    >
                      <Tooltip title="Item Price List">
                      <Button variant="contained"  sx={{
                  backgroundColor: '#174c4f',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#82ada5', // Custom hover color
                  },
                }} startIcon={<GrView />}>View Price List ({params.row.PriceListCount}) </Button> 
                      </Tooltip>                      
                    </Link>
                   : params.row.FullPriceItems=="Y" && params.row.CustomPriceList=="N" ?
                   <Link
                     to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.ppc_RunGroup}/${params.row.CUSTNMBR}/('PF')`}
                   >                     
                     <Tooltip title="Price List">
                     <Button variant="contained"  sx={{
                 backgroundColor: '#174c4f',
                 color: 'white',
                 '&:hover': {
                   backgroundColor: '#82ada5', // Custom hover color
                 },
               }} startIcon={<GrView />}>View Price List ({params.row.PriceListCount}) </Button> 
                     </Tooltip>                      
                   </Link>: <Link
                     to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.ppc_RunGroup}/${params.row.CUSTNMBR}/('PF','PC')`}
                   >                     
                     <Tooltip title="Price List">
                     <Button variant="contained"  sx={{
                 backgroundColor: '#174c4f',
                 color: 'white',
                 '&:hover': {
                   backgroundColor: '#82ada5', // Custom hover color
                 },
               }} startIcon={<GrView />} onClick={()=>{dispatch(currentPDF({HashtokenI:params.row.HashtokenI,HashtokenP:params.row.HashtokenP,Type:'L',PriceListID:'',Brand:'',Classdesc:'',Commodity:''}));dispatch(
                currentMail({HashtokenI:params.row.HashtokenI,HashtokenP:params.row.HashtokenP,Type:'L',PriceListID:'',Brand:'',Classdesc:'',Commodity:''}))}}>View Price List ({params.row.PriceListCount}) </Button> 
                     </Tooltip>                      
                   </Link>}
                  </Box>
                );
               
              },
            };
       
            listviewData.Data.columns.push(obj3);
          } 
         if (AccessID == "TR203") {
            obj = {
              field: "action",
              headerName: "Action",
              flex:1,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  
                  
                    <Link
                      to={`./${params.row.ChildID1}/${params.row.ChildName1}/${params.row.ppc_PriceListID}`}
                    >
                      {/* <Button variant="contained">View Items</Button> */}
                      <Tooltip title="Items Count">
                      <Button variant="contained" sx={{
                  backgroundColor: '#174c4f',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#82ada5', // Custom hover color
                  },
                }} startIcon={<GrView />}>View Items  ({params.row.ItemCount}) </Button> 
                      </Tooltip>
                    </Link>
                  
                );
              },
            };
          } 
          if (AccessID == "PM207") {
            obj = {
              field: "action",
              headerName: "Action",
              flex:1,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  
                  
                    <Link
                      to={`./${params.row.ChildID}/${params.row.ChildName}/${params.row.ppc_PriceListID}`}
                    >
                       <Tooltip title="Items Count">
                      <Button variant="contained" sx={{
                  backgroundColor: '#174c4f',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#82ada5', // Custom hover color
                  },
                }} startIcon={<GrView />}>View Items ({params.row.itemscount}) </Button> 
                      </Tooltip>
                   
                    </Link>
                  
                );
              },
            };
          }    if (AccessID == "PM210") {
            obj = {
              field: "action",
              headerName: "Action",
              flex:1,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  
                  
                    <Link
                    to={`./${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                       <Tooltip title="Item Price List">
                      <Button variant="contained" sx={{
                  backgroundColor: '#174c4f',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#82ada5', // Custom hover color
                  },
                }} startIcon={<GrView />}>View Price List </Button> 
                      </Tooltip>
                   
                    </Link>
                  
                );
              },
            };
          } 
          // if (AccessID == "TR204")  {
          //   obj = {
          //     field: "action",
          //     headerName: "Action",
          //     minWidth: 250,
          //     sortable: false,
          //     filterable: false,
          //     headerAlign: "center",
          //     align: "center",
          //     disableColumnMenu: true,
          //     disableExport: true,
          //     renderCell: (params) => {
          //       return (
          //         <Box>
          //           {/* // <Stack direction="row" spacing={1}> */}
          //           <CheckBox/>
          //         </Box>
          //       );
          //     },
          //   };
          // } 
          if(AccessID != "TR202")
            {
              listviewData.Data.columns.push(obj);
            }
        
          dispatch(
            Success({
              columndata: listviewData.Data.columns,
              rowdata: listviewData.Data.rows,
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
//   export const fnFetchList =
//   (AccessID, screenName, filter, any, CompId) => async (dispatch, getState) => {
//     // const navigate = useNavigate();;
//     var url ="";
//     if(screenName ==  'Company' ) {
//       var url = store.getState().globalurl.companyListViewUrl;
//     }
//    else if(screenName ==  'Driver' ) {
//       var url= store.getState().globalurl.driverListViewUrl;
//     }
//     else if(screenName == 'Route'){
//       var url = store.getState().globalurl.routeListViewUrl;
//     }
//    else if(screenName == 'Truck'){
//     var url = store.getState().globalurl.truckListViewUrl;
//    }
 
//    console.log("---url call" , url);

   
//     // var idata = {
//     //   Query: {
//     //     AccessID: AccessID,
//     //     ScreenName: screenName,
//     //     Filter: filter,
//     //     Any: any,
//     //     CompId,
//     //   },
//     // };

//     // idata = JSON.stringify(idata);

     
//     // console.log("data--" + idata);

//     dispatch(pending());
//     axios
//       .get(url, {
//         params: {
          
//         },
//         headers: {
//           Authorization:
// "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODFlMTVlODVmZDhmYzMxMzk3NWY3MGNiODEwMjc3YWVhODRmODlkNjc4Y2I0ZDFkNTM2NGUyMjFlNWY4YzMxODQyYmYyMjY4MmJkMDYyZGMiLCJpYXQiOjE3MjI1MTk3NDAuMTk2OTg1LCJuYmYiOjE3MjI1MTk3NDAuMTk2OTk2LCJleHAiOjE3NTQwNTU3NDAuMTUyOTYzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.F4lOKPPewIKjbJKK-HPgBfK_mnG2Rzw4AUv4w87HGXLSXl3GYfGurHAlTriVQ-KkpOftCv_QGDDflCB2MG4D0bV6rcGsD7Ayvr40yk_m3Fyz1AhB2w70Y7gMpfhd_3hEDNWZ-V9lAgH24s-UCdFqKFwZkd9icQ84NfRij9bay3M7mjJ_KR06-cfuVMGhZFGnw89jiFr5FDt1DpWeqzAOjFIBtCfywV0CvNFMJtDrNvtjAzRAbR0vDVaXZBk0xa6aMyxBhhFX4fC9FaRAU15a9oQh2RH4OheNOvqH54v32BBXHx305g-S1DLYXQWlPUZROoTiaDrJezHPog3QKZlC3J7cscLIt-nd4XlYVe9ntMOGk7rzXvEAhcai1-yTkHZZfNfy7EIifi0hXcJrR9NbRjdloPjfGCo3BsH425V3PhUyr_OaC9KxxUHHLwmEnyCWlFIfAzyMpC9g7NqpSVDYcVt--mzxGkdY6_PF-g0e43h9d1g8uxbD6iZtLVAejpsmqoEWaJxKJNrESLiYOoYu0QFGFl46bkbuTwhepswe5Pwjs54S-ps7DB2igPgT9rABF-eotflzG-zruLGQNSO-fjRY5KjSE97n2W348DKjPxHF3U1q9BW2KhGAdb-h4bOKOT6Lu4cpN7v1eRnMxucEZV3a5kIrWc2xg-7H_s3zXi4"
//           },
//       })
//       .then((response) => {
//         console.log("without authorization---" + JSON.stringify(response));
//         var listviewData = response.data;

//         console.log(listviewData,'=====================listviewData');
        
//         if (listviewData.Status == "Y") {
               
//           console.log("listviewData.headers" + JSON.stringify(listviewData.headers));
//           console.log("listviewData.rows" + JSON.stringify(listviewData.rows));
        
//           dispatch(
//             Success({
//               columndata: listviewData.headers,
//               rowdata: listviewData.rows,
//             })
//           );
//         } else {
//           dispatch(Success({ columndata: [], rowdata: [] }));
//         }
//       })
//     };
     



  export function fetchEncryption(FilterData) {
    return async (dispatch) => {
      function onSuccess(success) {
        console.log("2---" + success.data);
  
        const datawait = dispatch(
          Success({
            action: "",
            Status: "Y",
            // data:success.
            apiResponse: {},
            Msg: "Mail sent Successfully",
          })
        );
        return datawait;
      }
      function onError(error) {
        //dispatch({ type: ERROR_GENERATED, error });
        return error;
      }
      try {
        var url = store.getState().globalurl.EncryptionUrl;
        var idata = {
          Query: {
            StrData:FilterData,
          },
        };
    
        idata = JSON.stringify(idata);
        dispatch(pending());
        const success = await axios.get(url, {
          params: {
            data: idata,
          },
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        console.log(
          "🚀 ~ file: Formapireducer.js:335 ~ return ~ success:",
          success
        );
        return onSuccess(success);
      } catch (error) {
        return onError(error);
      }
    };
  }


