import {
  TextField,
  Box,
  Typography,
  useTheme,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Stack,
  FormControlLabel,
  Tooltip,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  LinearProgress,
  Chip,
  Grid,
} from "@mui/material";
import basicSchema, {
  addTruckSchema,
  DailyHoursTaskSchema,
} from "../../Security/validation";
import EditIcon from "@mui/icons-material/Edit";
import Listviewpopup from "../LookupNew";
import Popup from "../popupNew";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
  explorePostData,
  addtruckFetchapiData,
  assigntruckFetchapiData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { HsnSchema } from "../../Security/validation";
import { DailytaskSchema } from "../../Security/validation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import { tokens } from "../../../Theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FaEdit } from "react-icons/fa";
import { IoPrintOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import popupimage from "../../../assets/img/icons8-popup-48 (3).png";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CloseIcon from "@mui/icons-material/Close";
const EditAddtruck = () => {
  //Date
  const [currentDate, setCurrentDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [yesterdayDate, setYesterdayDate] = useState("");

  //   useEffect(() => {
  //     const today = new Date();
  //     today.setDate(today.getDate);
  //     const formattedToday = formatDate(today);
  //     setCurrentDate(formattedToday); // 1. it is used to set fromdate and todate both are filled by current date. 2.it is used to restrict user cannot select more then current date(max property)
  //     setFromDate(formattedToday); // to display fromdate by deafult current date
  //     setToDate(formattedToday);  // to display toDate by deafult current date
  //     console.log("-------setToDate",formattedToday);
  //     const yesterday = new Date();
  //     yesterday.setDate(today.getDate()- 1);
  //     const formattedYesterday = formatDate(yesterday);
  //     setYesterdayDate(formattedYesterday); // It is used to restrict user cannot select minimum date more then yesterday Date using Min property
  // console.log("-------setYesterdayDate",formattedYesterday);

  //   }, []);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate());

    console.log(today, "-------formattedYesterday");
    const formattedToday = formatDate(today);
    setCurrentDate(formattedToday); // 1. it is used to set fromdate and todate both are filled by current date. 2.it is used to restrict user cannot select more then current date(max property)
    setFromDate(formattedToday); // to display fromdate by deafult current date
    setToDate(formattedToday); // to display toDate by deafult current date

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const formattedYesterday = formatDate(yesterday);
    setYesterdayDate(formattedYesterday); // It is used to restrict user cannot select minimum date more then yesterday Date using Min property
  }, []);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  console.log(params);
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const parentID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const loading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  /***EditAddTruckListview rows and columns***/
  const [editmode, setEditmode] = useState("");
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );

  function filterByID(item) {
    if (item.hide !== true) {
      return true;
    }
  }

  const columns = React.useMemo(
    () => explorelistViewcolumn.filter(filterByID),
    [explorelistViewcolumn]
  );

  console.log("rowdata", explorelistViewData);

  // console.log("columndata" + explorelistViewcolumn);

  const YearFlag = sessionStorage.getItem("YearFlag");
  const EMPID = sessionStorage.getItem("EmpId");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();

  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [show, setScreen] = React.useState("0");
  const [showButton, setShowButton] = useState(false);
  const [headerid, setHeaderid] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("1");

  // const handleCompanyChange = async (event) => {
  //   const newCompany = event.target.value;

  //   const result = await Swal.fire({
  //     title: 'Are you sure you want to change the company?',
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Confirm",
  //   });

  //   if (result.isConfirmed) {
  //     setSelectedCompany(newCompany); // Update the state with the new company value
  //     setIsFieldVisible(false); // Manage field visibility if needed
  //   }
  // };

  // useEffect(() => {
  //   const saveData = async () => {
  //     if (selectedCompany && fromDate) {
  //       try {
  //         await headerSave(selectedCompany, fromDate); // Use the updated selectedCompany state
  //       } catch (error) {
  //         console.error("Error saving data:", error);
  //       }
  //     }
  //   };

  //   saveData();
  // }, [selectedCompany, fromDate]); // Ensure `fromDate` is included
  // const [pendingDateChange, setPendingDateChange] = useState('');

  // const handleDateChange = async (event) => {
  //   const newDate = event.target.value;

  //   const result = await Swal.fire({
  //     title: 'Are you sure you want to change the Date?',
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Confirm",
  //   });

  //   if (result.isConfirmed) {
  //     setFromDate(newDate);
  //     setIsFieldVisible(false);
  //   }
  // };

  // const headerSave = async (companyID, fromDate) => {
  //   console.log("Selected date:", fromDate);

  //   try {
  //     var response = await dispatch(
  //       addtruckFetchapiData(
  //         "",
  //         companyID,
  //         fromDate,
  //         ""
  //       )
  //     );

  //     console.log("response", response);
  //     console.log(response.payload.apiResponse.RecordID, "apiresponse");

  //     setHeaderid(response.payload.apiResponse.RecordID);

  //     if (response.payload.apiResponse.RecordID !== "") {
  //       dispatch(
  //         fetchExplorelitview(
  //           "",
  //           "EditAddTruck",
  //           response.payload.apiResponse.RecordID,
  //           ""
  //         )
  //       );
  //       setShowButton(!showButton);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handleCompanyChange = async (event) => {
    const newCompany = event.target.value;

    const result = await Swal.fire({
      title: "Are you sure to Reload Routes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#174c4f",
      cancelButtonColor: "#F0A72D",
      confirmButtonText: "Confirm",
      customClass: {
        container: "my-swal",
      },
    });

    if (result.isConfirmed) {
      setSelectedCompany(newCompany); // Update the state with the new company value
      setIsFieldVisible(false); // Manage field visibility if needed
    }
  };

  useEffect(() => {
    const saveData = async () => {
      if (selectedCompany && fromDate) {
        try {
          await headerSave(selectedCompany, fromDate); // Use the updated selectedCompany state
        } catch (error) {
          console.error("Error saving data:", error);
        }
      }
    };

    saveData();
  }, [selectedCompany, fromDate]); // Ensure `fromDate` is included

  // const handleDateChange = async (event) => {
  //   const newDate = event.target.value;

  //   const result = await Swal.fire({
  //     title: 'Are you sure you want to change the Date?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Confirm',
  //   });

  //   if (result.isConfirmed) {
  //     setFromDate(newDate); // Update the date only if confirmed
  //     setIsFieldVisible(false); // Manage field visibility if needed
  //   }
  // };
  const handleDateChange = async (newDate) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure to Reload Routes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#174c4f",
      cancelButtonColor: "#F0A72D",
      confirmButtonText: "Confirm",
      customClass: {
        container: "my-swal",
      },
    });

    if (result.isConfirmed) {
      setFromDate(newDate); // Update the date only if confirmed
      setIsFieldVisible(false); // Manage field visibility if needed
    }
  };
  const headerSave = async (companyID, Date) => {
    console.log("Selected date:", Date);

    try {
      const response = await dispatch(
        addtruckFetchapiData("", companyID, Date, "")
      );

      console.log("response", response);
      console.log(response.payload.apiResponse.RecordID, "apiresponse");

      setHeaderid(response.payload.apiResponse.RecordID);

      if (response.payload.apiResponse.RecordID !== "") {
        dispatch(
          fetchExplorelitview(
            "",
            "EditAddTruck",
            response.payload.apiResponse.RecordID,
            ""
          )
        );
        setShowButton(!showButton);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const headerDetailSave = async (values) => {
    // console.log("display truck lookup" + truckLookupData.trucklookupRecordid)
    console.log(editmode, "display mode");
    console.log("--checking recordid", trucksUpdate.RecordID);

    const idata = {
      RecordID: trucksUpdate.RecordID,
      HeaderID: headerid,
      // RouteID:  values.RouteID,
      TruckID: truckLookupData.trucklookupRecordid,
      DoorNO: doorLookupData.doorlookupRecordid,
      DriverID: driverLookupData.driverlookupRecordid,
    };

    const response = await dispatch(
      assigntruckFetchapiData({ idata, editmode })
    );

    console.log("response data" + response);
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      dispatch(fetchExplorelitview("", "EditAddTruck", headerid, ""));
      selectcelldata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
    }
  };

  const [trucksUpdate, settruckUpdate] = useState({
    RecordID: "",
    HeaderID: "",
    RouteCode: "",
    TruckID: "",
    DoorNO: "",
    DriverID: "",
    // RouteCode:""
  });
  const initialValues = {
    RouteCode: trucksUpdate.RouteCode,
    // DoorNO:trucksUpdate.DoorNO
  };
  //--------------------POPUP---------------------------//
  const [openPopup, setIsOpenPopup] = useState(false);
  const [openCompanyPopup, setOpenCompanyPopup] = useState(false);
  const [openTruckPopup, setOpenTruckPopup] = useState(false);
  const [openDriverPopup, setOpenDriverPopup] = useState(false);
  const [openDoorPopup, setOpenDoorPopup] = useState(false);
  function handleOpen(type) {
    // if (type == "COM") {
    //   setOpenCompanyPopup(true);
    // }
    if (type == "Truck") {
      setOpenTruckPopup(true);
    }
    if (type == "Driver") {
      setOpenDriverPopup(true);
    }
    if (type == "Door") {
      setOpenDoorPopup(true);
    }
  }

  const [truckLookupData, settruckLookupData] = React.useState({
    trucklookupRecordid: "",
    trucklookupCode: "",
    trucklookupName: "",
  });
  const [driverLookupData, setdriverLookupData] = React.useState({
    driverlookupRecordid: "",
    driverlookupCode: "",
    driverlookupName: "",
  });
  const [doorLookupData, setdoorLookupData] = React.useState({
    doorlookupRecordid: "",
    doorlookupCode: "",
    doorlookupName: "",
  });
  /****************** Assign Truck Values assign Grid******************** */
  const selectcelldata = (data, Mode, field) => {
    console.log("selectdata" + JSON.stringify(data));
    setEditmode(Mode);

    if (Mode == "A") {
      settruckUpdate({
        RecordID: "",
        HeaderID: "",
        RouteCode: "",
        TruckID: "",
        DriverID: "",
        DoorNO: "",
      });
      settruckLookupData({
        trucklookupRecordid: "",
        trucklookupCode: "",
        trucklookupName: "",
      });

      setdriverLookupData({
        driverlookupRecordid: "",
        driverlookupCode: "",
        driverlookupName: "",
      });
      setdoorLookupData({
        doorlookupRecordid: "",
        doorlookupCode: "",
        doorlookupName: "",
      });
    } else {
      // if (field == "action") {
      settruckUpdate({
        RecordID: data.RecordID,
        HeaderID: data.HeaderID,
        RouteCode: data.RouteCode,
        TruckID: data.TruckID,
        DoorNO: data.DoorNO,
        DriverID: data.DriverID,
      });
      if (data.TruckID > 0) {
        // console.log(recID, companyLookupData.companylookupRecordid,data.RouteCode,truckLookupData.trucklookupRecordid,data.DoorNO,driverLookupData.driverlookupRecordid,  +  "action editData")
        settruckLookupData({
          trucklookupRecordid: data.TruckID,
          trucklookupCode: data.TruckCode,
          trucklookupName: data.TruckName,
        });
      } else {
        fnTruckClearSave();
      }
      if (data.DriverID > 0) {
        setdriverLookupData({
          driverlookupRecordid: data.DriverID,
          driverlookupCode: data.DriverCode,
          driverlookupName: data.DriverName,
        });
      } else {
        fnDriverClearSave();
      }
      if (data.DoorNO > 0) {
        setdoorLookupData({
          doorlookupRecordid: data.DoorNO,
          doorlookupCode: data.DoorCode,
          doorlookupName: data.DoorName,
        });
      } else {
        fnDoorClearSave();
      }

      // }
    }
  };

  /////==================CHILD TO PARENT========================////
  const childToParent = (childdata, type) => {
    console.log(
      "🚀 ~ file: Editproduct.jsx:288 ~ childToParent ~ childdata:",
      childdata
    );
    if (type == "Truck") {
      settruckLookupData({
        trucklookupRecordid: childdata.RecordID,
        trucklookupCode: childdata.Code,
        trucklookupName: childdata.Name,
      });
      setOpenTruckPopup(false);
      setIsOpenPopup(true);
    }
    if (type == "Driver") {
      setdriverLookupData({
        driverlookupRecordid: childdata.RecordID,
        driverlookupCode: childdata.Code,
        driverlookupName: childdata.Name,
      });
      setOpenDriverPopup(false);
      setIsOpenPopup(true);
    }
    if (type == "Door") {
      setdoorLookupData({
        doorlookupRecordid: childdata.RecordID,
        doorlookupCode: childdata.Code,
        doorlookupName: childdata.Name,
      });
      setOpenDoorPopup(false);
      setIsOpenPopup(true);
    }
  };
  const [isFieldVisible, setIsFieldVisible] = useState(false);

  const handleRowClick = (params) => {
    const currentRow = params.row;
    const currentcellField = params.field;

    selectcelldata(currentRow, "E", currentcellField);
    setIsFieldVisible(true);
  };

  // *********ScreenChange Function********
  // const screenChange = (event) => {
  //   setScreen(event.target.value);
  //   if (event.target.value == "1") {
  //     dispatch(
  //       fetchExplorelitview("TR134", "DailyHourTask", `parentID=${recID}`, "")
  //     );
  //   }
  // };
  const [rowCount, setRowCount] = useState(0);
  function secondaryCustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="h4">List of Routes</Typography>
          <Typography variant="h5">{`(${rowCount})`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
          <Tooltip title="ADD">
            <IconButton onClick={() => selectcelldata("", "A", "")}>
              {/* <AddOutlinedIcon /> */}
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }

  // ************** INITIALVALUE  ************** //

  const fnLogOut = (props) => {
    Swal.fire({
      title: `Do you want ${props}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: props,
    }).then((result) => {
      if (result.isConfirmed) {
        if (props === "Logout") {
          navigate("/");
        }
        if (props === "Close") {
          navigate(
            `/Apps/Secondarylistview/TR132/DailyTask/${params.filtertype}`
          );
        }
      } else {
        return;
      }
    });
  };

  const fnTruckClearSave = () => {
    settruckLookupData({
      trucklookupRecordid: "",
      trucklookupCode: "",
      trucklookupName: "",
    });
  };
  const fnDriverClearSave = () => {
    setdriverLookupData({
      driverlookupRecordid: "",
      driverlookupCode: "",
      driverlookupName: "",
    });
  };
  const fnDoorClearSave = () => {
    setdoorLookupData({
      doorlookupRecordid: "",
      doorlookupCode: "",
      doorlookupName: "",
    });
  };
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" p={2} flexWrap="wrap">
        <Box display="flex" alignItems="center" mb={{ xs: 2, md: 0 }}>
          {broken && !rtl && (
            <IconButton onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Typography variant="h5" color="#0000D1">
            Assign Truck and Driver
          </Typography>
        </Box>
        <Box display="flex">
          <Tooltip title="Close">
            <IconButton onClick={() => fnLogOut("Close")} color="error">
              <ResetTvIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton color="error" onClick={() => fnLogOut("Logout")}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {!getLoading ? (
        <Box m={2} >
          <Formik
            initialValues={initialValues}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                headerSave(values);
              }, 100);
            }}
            enableReinitialize
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              values,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="company-label">Company</InputLabel>
                        <Select
                          labelId="company-label"
                          id="CompanyID"
                          name="CompanyID"
                          value={selectedCompany}
                          label="Company"
                          onChange={handleCompanyChange}
                        >
                          <MenuItem value="1">PlyMouth</MenuItem>
                          <MenuItem value="2">S and J</MenuItem>
                          <MenuItem value="3">Nicky</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name="date"
                        type="date"
                        id="date"
                        label="Date"
                        inputFormat="YYYY-MM-DD"
                        value={fromDate}
                        onChange={(e) => {
                          const newDate = e.target.value;
                          handleDateChange(newDate);
                        }}
                        sx={{
                          background: "#ffffff",
                        }}
                        // variant="filled"
                        focused
                        fullWidth
                        inputProps={{ min: yesterdayDate, max: currentDate }}
                      />
                    </Grid>
                  </Grid>

                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                   p={2}
                  >
                    <Box
                      height="450px"
                      width='100%'
                      
                      sx={{
                    
                        "& .MuiDataGrid-root": {},
                        "& .MuiDataGrid-cell": {},
                        "& .name-column--cell": {
                          color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: colors.greenAccent[700],
                        },
                        "& .MuiDataGrid-virtualScroller": {
                          backgroundColor: colors.white[100],
                        },
                        "& .MuiDataGrid-footerContainer": {
                          backgroundColor: colors.greenAccent[700],
                        },
                        "& .MuiDataGrid-row:nth-child(even)": {
                          backgroundColor: colors.orange[100],
                        },
                        "& .MuiDataGrid-row:nth-child(odd)": {
                          backgroundColor: colors.white[100],
                        },
                        "& .MuiCheckbox-root": {
                          color: `${colors.greenAccent[200]} !important`,
                        },
                        "& .Mui-selected": {
                          backgroundColor: `${colors.greenAccent[1000]} !important`,
                          color: colors.white[100],
                          fontWeight: "bold",
                        },
                      }}
                    >
                      <DataGrid
                        rows={explorelistViewData}
                        columns={columns}
                        loading={exploreLoading}
                        getRowId={(row) => row.RecordID}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        onRowClick={handleRowClick}
                        components={{
                          Toolbar: secondaryCustomToolbar,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                      />
                    </Box>
                    {isFieldVisible && !getLoading ? (
                      <Stack sx={{p: 1}}
                        spacing={{ xs: 1, sm: 2, md: 4, lg: 6 }}
                        width={'100%'}
                        //  mt={{ xs: 2, md: 0 }}
                      >
                        <FormControl fullWidth>
                          <TextField
                            name="RouteCode"
                            type="text"
                            id="RouteCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.RouteCode}
                            error={!!touched.RouteCode && !!errors.RouteCode}
                            helperText={touched.RouteCode && errors.RouteCode}
                            label="Selected Route"
                            variant="filled"
                            inputProps={{
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                              readOnly: true,
                            }}
  
                            focused
                          />
                        </FormControl>

                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="TruckID"
                            variant="filled"
                            value={truckLookupData.trucklookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />

                          <TextField
                            id="outlined-basic"
                            label="Truck code/Truck Name"
                            variant="filled"
                            value={
                              truckLookupData.trucklookupCode &&
                              truckLookupData.trucklookupName
                                ? `${truckLookupData.trucklookupCode} / ${truckLookupData.trucklookupName}`
                                : truckLookupData.trucklookupCode ||
                                  truckLookupData.trucklookupName
                            }
                            fullWidth
                            focused
                            required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <Stack
                            style={{
                              display: "flex-wrap",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                height: 25,
                                width: 20,
                                marginLeft: 1,
                                padding: 0,
                                marginBottom: 1,
                                backgroundColor: "#174c4f",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#82ada5", // Custom hover color
                                },
                              }}
                              onClick={() => handleOpen("Truck")}
                            >
                              Select
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#ba000d",
                                height: 25,
                                width: 25,
                                padding: 0,
                                marginLeft: 1,
                              }}
                              justifyContent="flex-end"
                              onClick={() => fnTruckClearSave()}
                            >
                              Clear
                            </Button>
                          </Stack>
                        </FormControl>

                        <FormControl
                          sx={{
                            gridColumn: "span 4",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="DriverID"
                            variant="filled"
                            value={driverLookupData.driverlookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />

                          <TextField
                            id="outlined-basic"
                            label="First Name/Last Name"
                            variant="filled"
                            value={
                              driverLookupData.driverlookupCode &&
                              driverLookupData.driverlookupName
                                ? `${driverLookupData.driverlookupCode} / ${driverLookupData.driverlookupName}`
                                : driverLookupData.driverlookupCode ||
                                  driverLookupData.driverlookupName
                            }
                            fullWidth
                            focused
                            required
                            inputProps={{ tabIndex: "-1" }}
                          />

                          <Stack
                            style={{
                              display: "flex-wrap",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                height: 25,
                                width: 20,
                                marginLeft: 1,
                                padding: 0,
                                marginBottom: 1,
                                backgroundColor: "#174c4f",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#82ada5", // Custom hover color
                                },
                              }}
                              onClick={() => handleOpen("Driver")}
                            >
                              Select
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#ba000d",
                                height: 25,
                                width: 25,
                                padding: 0,
                                marginLeft: 1,
                              }}
                              justifyContent="flex-end"
                              onClick={() => fnDriverClearSave()}
                            >
                              Clear
                            </Button>
                          </Stack>
                        </FormControl>
                        <FormControl
                          sx={{
                            gridColumn: "span 4",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="DoorNO"
                            variant="filled"
                            value={doorLookupData.doorlookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />

                          <TextField
                            id="outlined-basic"
                            label="Door Code/Door Name"
                            variant="filled"
                            value={
                              doorLookupData.doorlookupCode &&
                              doorLookupData.doorlookupName
                                ? `${doorLookupData.doorlookupCode} / ${doorLookupData.doorlookupName}`
                                : doorLookupData.doorlookupCode ||
                                  doorLookupData.doorlookupName
                            }
                            fullWidth
                            focused
                            required
                            inputProps={{ tabIndex: "-1" }}
                          />

                          <Stack
                            style={{
                              display: "flex-wrap",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                height: 25,
                                width: 20,
                                marginLeft: 1,
                                padding: 0,
                                marginBottom: 1,
                                backgroundColor: "#174c4f",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#82ada5", // Custom hover color
                                },
                              }}
                              onClick={() => handleOpen("Door")}
                            >
                              Select
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#ba000d",
                                height: 25,
                                width: 25,
                                padding: 0,
                                marginLeft: 1,
                              }}
                              justifyContent="flex-end"
                              onClick={() => fnDoorClearSave()}
                            >
                              Clear
                            </Button>
                          </Stack>
                        </FormControl>
                        <Box display="flex" justifyContent="flex-end" >
                        <Button 
                          variant="contained"
                          sx={{
                            backgroundColor: "#174c4f",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#82ada5",
                            },
                          }}
                          onClick={() => headerDetailSave(values)}
                        >
                          Assign Truck and Driver
                        </Button>
                        </Box>
                      </Stack>
                    ) : (
                      false
                    )}
                    ;
                  </Box>

                  <Popup
                    title="Truck"
                    openPopup={openTruckPopup}
                    setOpenPopup={setOpenTruckPopup}
                  >
                    <Listviewpopup
                      accessID=""
                      screenName="Truck"
                      childToParent={childToParent}
                      filterName={"Company"}
                      filterValue={`${selectedCompany}`}
                    />
                  </Popup>
                  <Popup
                    title="Driver"
                    openPopup={openDriverPopup}
                    setOpenPopup={setOpenDriverPopup}
                  >
                    <Listviewpopup
                      accessID=""
                      screenName="Driver"
                      childToParent={childToParent}
                      filterName={"Company"}
                      filterValue={`${selectedCompany}`}
                    />
                  </Popup>
                  <Popup
                    title="Door"
                    openPopup={openDoorPopup}
                    setOpenPopup={setOpenDoorPopup}
                  >
                    <Listviewpopup
                      accessID=""
                      screenName="Door"
                      childToParent={childToParent}
                      filterName={"Company"}
                      filterValue={`${selectedCompany}`}
                    />
                  </Popup>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default EditAddtruck;
