import * as React from 'react';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import {Select, Avatar,Stack,Paper, FormLabel,Typography, 
    Tooltip,  TextField, Button, Autocomplete,Box,Link,IconButton,FormControl,Checkbox,InputLabel,OutlinedInput,InputAdornment,FormHelperText,FormGroup,MenuItem, 
    Grid} from '@mui/material'
import { blue, green, grey, pink, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import RefreshIcon from '@mui/icons-material/Refresh';
import SyncIcon from '@mui/icons-material/Sync';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../../Theme";
import Listviewpopup from "../LookupNew";
import Popup from "../popupNew";
import { useTheme } from "@emotion/react";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import plylogo from '../assets/plylogo.png';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { useProSidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { FaEdit } from "react-icons/fa";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {  fetchExplorelitview } from '../../../store/reducers/Explorelitviewapireducer';
import{ useEffect, useState } from "react";
import popupimage from '../../../assets/img/icons8-popup-48 (3).png';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-hot-toast";
// import refreshImage from '.../assets/img/refresh.png';

// import { Formik } from 'formik';
// import {  fetchExplorelitview } from '../../../store/reducers/Explorelitviewapireducer';
// import{ useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { fetchEncryption } from '../../../store/reducers/Formapireducer';
import { mailOpen } from '../../../store/reducers/Listviewapireducer';
import Mailpopup from '../Mailpopup';
import Swal from 'sweetalert2';
export default function EditEnquiryTruck() {
    const navigate = useNavigate();
    const theme = useTheme();
    let params = useParams();
    console.log(params);
    const dispatch = useDispatch();
    var recID = params.id;
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const colors = tokens(theme.palette.mode);
    const [pageSize, setPageSize] = React.useState(10);
    const EnquiyTruckData = useSelector((state) => state.formApi.enquiryTruckData);
    console.log("EnquiyTruckData", EnquiyTruckData);
    //Grid Laading before display GridList 
    const exploreLoading = useSelector((state) => state.exploreApi.loading);

    const explorelistViewData = useSelector(
      (state) => state.exploreApi.explorerowData
    );
    const explorelistViewcolumn = useSelector(
      (state) => state.exploreApi.explorecolumnData
    );
    const open = useSelector((state) => state.listviewApi.mailOpen);
    function filterByID(item) {
      if (item.hide !== true) {
        return true;
      }
    }
    
    const columns = React.useMemo(
      () => explorelistViewcolumn.filter(filterByID),
      [explorelistViewcolumn]
    );

const [isShowOnlyAssignChecked, setIsShowOnlyAssignChecked] = React.useState(false);

const handleCheckboxChange  = (event) => {
  console.log("Test---",event.target.checked);
  
  setIsShowOnlyAssignChecked(event.target.checked);
 
};


//display fromdate and todate
    const [currentDate, setCurrentDate] = useState('');
  const[fromDate,setFromDate]=useState('');
  const[toDate,setToDate]=useState('');

  const [yesterdayDate, setYesterdayDate] = useState('');

   

    useEffect(() => {
      const today = new Date();
      today.setDate(today.getDate());

      console.log(today,'-------formattedYesterday')
      const formattedToday = formatDate(today);
      setCurrentDate(formattedToday); // 1. it is used to set fromdate and todate both are filled by current date. 2.it is used to restrict user cannot select more then current date(max property)
      setFromDate(formattedToday); // to display fromdate by deafult current date
      setToDate(formattedToday);  // to display toDate by deafult current date

      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const formattedYesterday = formatDate(yesterday);
      setYesterdayDate(formattedYesterday); // It is used to restrict user cannot select minimum date more then yesterday Date using Min property
      fnEnquirySave(formattedToday, formattedToday);
    }, []);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
   
    




      const [openPopup, setIsOpenPopup] = React.useState(false);
      const [openCompanyPopup, setOpenCompanyPopup] = useState(false);
      const [openRoutePopup,setOpenRoutePopup]=React.useState(false);
      const [openTruckPopup,setOpenTruckPopup]=React.useState(false);
      const [openDriverPopup,setOpenDriverPopup]=React.useState(false);
      const [openDoorPopup,setOpenDoorPopup]=React.useState(false);
      function handleShow(type) {
        if (type == "COM") {
          setOpenCompanyPopup(true);
        }
        if (type == "Route") {
          setOpenRoutePopup(true);
        }
        if (type == "Truck") {
          setOpenTruckPopup(true);
        }
        if (type == "Driver") {
          setOpenDriverPopup(true);
        }
        if (type == "Door") {
          setOpenDoorPopup(true);
        }
      };

      const handleExportToExcel = () => {
        // Convert DataGrid data to a format suitable for export
        const ws = XLSX.utils.json_to_sheet(explorelistViewData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
        // Generate timestamp in yyyy-mm-dd-hh-mm-ss format
        const now = new Date();
        const timestamp = now.toISOString().replace(/T/, '-').replace(/:/g, '-').replace(/\..+/, '');
        
        // Create filename with timestamp
        const filename = `RoutingDetail-${timestamp}.xlsx`;
    
        // Generate the file and trigger download
        XLSX.writeFile(wb, filename);
    };
    

      const [rowCount, setRowCount] = React.useState(0);
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
          <Typography variant="h4">Enquiry Truck</Typography>
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
       
     </Box>
   </GridToolbarContainer>
    );
  }
  const [companyLookupData, setcompanyLookupData] = React.useState({
    companylookupRecordid: "",
    companylookupCode: "",
    companylookupName: "",
  });
  const [routeLookupData, setrouteLookupData] = React.useState({
    routelookupRecordid: "",
    routelookupCode: "",
    routelookupName: "",
  });
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
    
    
         /////==================CHILD TO PARENT========================////

  const childToParent = (childdata, type) => {
    console.log(
      "🚀 ~ file: Editproduct.jsx:288 ~ childToParent ~ childdata:",
      childdata
    );
    if (type == "Company") {
      setcompanyLookupData({
        companylookupRecordid: childdata.RecordID,
        companylookupCode: childdata.Code,
        companylookupName: childdata.Name,
      });
      setOpenCompanyPopup(false);
      setIsOpenPopup(true);
    }
    if (type == "Route") {
                setrouteLookupData({
                  routelookupRecordid: childdata.RecordID,
                  routelookupCode: childdata.Code,
                  routelookupName: childdata.Name
                });
                setOpenRoutePopup(false);
                setIsOpenPopup(true);
              }
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


  const fnClearSave = () => {
    setcompanyLookupData({
    companylookupRecordid: "",
    companylookupCode: "",
    companylookupName: "",
  });
  setrouteLookupData({
    routelookupRecordid: "",
    routelookupCode: "",
    routelookupName: "",
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
  }
 
 
  const fnCompanyClearSave = () => {
    setcompanyLookupData({
    companylookupRecordid: "",
    companylookupCode: "",
    companylookupName: "",
  });
  }
  const fnRouteClearSave = () => {
    setrouteLookupData({
      routelookupRecordid: "",
      routelookupCode: "",
      routelookupName: "",
    });
  }
  const fnTruckClearSave = () => {
    settruckLookupData({
      trucklookupRecordid: "",
      trucklookupCode: "",
      trucklookupName: "",
    });
  }
  const fnDriverClearSave = () => {
    setdriverLookupData({
      driverlookupRecordid: "",
      driverlookupCode: "",
      driverlookupName: "",
    });
  }
  const fnDoorClearSave = () => {
    setdoorLookupData({
      doorlookupRecordid: "",
      doorlookupCode: "",
      doorlookupName: "",
    });
  }
    
  // };
  const [pdf, setPdf] = React.useState(false);

    //Apply
    const fnEnquirySave = async(defaultFromDate, defaultToDate)=>{
     
var pdfFilter=''
      var filter="";
     
      const startDate = fromDate || defaultFromDate;
      const endDate = toDate || defaultToDate;
  
      if (startDate && endDate) {
          filter += `Date BETWEEN '${startDate}' AND '${endDate}'`;
          pdfFilter += `TRDate BETWEEN '${startDate}' AND '${endDate}'`;
      } else if (startDate) {
          filter += `Date <= '${startDate}'`;
          pdfFilter += `TRDate <= '${startDate}'`;
      } else if (endDate) {
          filter += `Date >= '${endDate}'`;
          pdfFilter += `TRDate >= '${endDate}'`;
      }
      // if((fromDate!='') && (toDate!=''))
      // {
      //     filter+=`Date BETWEEN '${fromDate}' AND '${toDate}'`
      //     pdfFilter+=`TRDate BETWEEN '${fromDate}' AND '${toDate}'`
      // }

      // if((fromDate!='') && (toDate==''))
      //   {
      //       filter+=`Date<='${fromDate}'`
      //       pdfFilter+=`TRDate<='${fromDate}'`
      //   }
     
      //   if((fromDate=='') && (toDate!=''))
      //     {
      //         filter+=`Date>='${toDate}'`
      //         pdfFilter+=`TRDate>='${toDate}'`
      //     }
          if(companyLookupData.companylookupRecordid!='')  
            {
              filter+=` AND CompanyID='${companyLookupData.companylookupRecordid}'`
              pdfFilter+=`&CompanyID='${companyLookupData.companylookupRecordid}'`
            } 
            else{
              pdfFilter+=`&CompanyID=${0}`
           }

      if(routeLookupData.routelookupRecordid!='')  
        {
          filter+=`AND RouteID='${routeLookupData.routelookupRecordid}'`
          pdfFilter+=`&RouteID='${routeLookupData.routelookupRecordid}'`
        }  else{
          pdfFilter+=`&RouteID=${0}`
       }

        if(truckLookupData.trucklookupRecordid!='')  
          {
            filter +=` AND TruckID='${truckLookupData.trucklookupRecordid}'`
            pdfFilter +=`&TruckID='${truckLookupData.trucklookupRecordid}'`

          } else{
            pdfFilter+=`&TruckID=${0}`
         }

          if(driverLookupData.driverlookupRecordid!='')  
            {
              filter+=` AND DriverID='${driverLookupData.driverlookupRecordid}'`
              pdfFilter+=`&DriverID='${driverLookupData.driverlookupRecordid}'`
            }  else{
               pdfFilter+=`&DriverID=${0}`
            }
            if(doorLookupData.doorlookupRecordid!='')  
              {
                filter+=` AND DoorNO='${doorLookupData.doorlookupRecordid}'`
                pdfFilter+=`&DoorNO='${doorLookupData.doorlookupRecordid}'`
              }  else{
                 pdfFilter+=`&DoorNO=${0}`
              }

            console.log(filter, "given filter");
         
          

var allfilter = ''
if(isShowOnlyAssignChecked == true){
  allfilter = "Y"
  pdfFilter+=`&Assigned=Y`
}
else{
 allfilter = "N"
 pdfFilter+=`&Assigned=N`
}
console.log(pdfFilter, "given TCPDF");
// var result  = await dispatch(fetchEncryption(pdfFilter));
// console.log("---",result.payload.apiResponse);

// setPdf(result.payload.apiResponse);
console.log(allfilter, "display allfilter" );

            console.log(response,"----given response");
            var response = await
            dispatch(
             
              fetchExplorelitview(
                "",
               "EnquiryTruck",   
                filter,
               "",
               allfilter,
              )
              
            );
            // if (response.payload.Status == "Y") {
            //   toast.success(response.payload.Msg);
            //  // dispatch(fetchExplorelitview("",'EditEnquiryTruck',"","",""));
           
            // } else {
            //   toast.error(response.payload.Msg);
             
            // }

    };

// const fnEnquirySave = async (defaultFromDate, defaultToDate) => {
//   let pdfFilter = '';
//   let filter = '';

//   // Use the date values passed in or fallback to state
//   const startDate = fromDate || defaultFromDate;
//   const endDate = toDate || defaultToDate;

//   if (startDate && endDate) {
//       filter += `Date BETWEEN '${startDate}' AND '${endDate}'`;
//       pdfFilter += `TRDate BETWEEN '${startDate}' AND '${endDate}'`;
//   } else if (startDate) {
//       filter += `Date <= '${startDate}'`;
//       pdfFilter += `TRDate <= '${startDate}'`;
//   } else if (endDate) {
//       filter += `Date >= '${endDate}'`;
//       pdfFilter += `TRDate >= '${endDate}'`;
//   }

//   // Handle company, route, truck, driver filters similarly...

//   const allfilter = isShowOnlyAssignChecked ? "Y" : "N";
//   pdfFilter += `&Assigned=${allfilter}`;

//   try {
//       const encryptionResult = await dispatch(fetchEncryption(pdfFilter));
//       setPdf(encryptionResult.payload.apiResponse);

//       const response = await dispatch(
//           fetchExplorelitview("", "EnquiryTruck", filter, "", allfilter)
//       );
      
//       // Handle the response as needed
//       console.log(response, "----given response");

//   } catch (error) {
//       console.error("Error fetching data:", error);
//   }
// };
    function handleClickPDF(){

     window.open(`https://plymouth.beyondexs.com/tcpdf/Enquirys.php?Token=${pdf}`, "_blank");
    }

    const fnLogOut = (props) => {
      Swal.fire({
        title: `Do you want ${props}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#174c4f",
        cancelButtonColor: "#d33",
        confirmButtonText: props,
      }).then((result) => {
        if (result.isConfirmed) {
          if (props === "Logout") {
            navigate("/");
          }
          if (props === "Close") {
            navigate(
              `/Apps`
            );
          }
        } else {
          return;
        }
      });
    };
   

const [isShowField,setIsShowField]=React.useState(false);
const [isShowdataGrid,setIsShowdataGrid]=React.useState(true);

const handleClick = async () => {
  await fnEnquirySave();
  setIsShowdataGrid(true);
  setIsShowField(false);
};

      return (
        <React.Fragment>
      {/* {getLoading ? <LinearProgress /> : false} */}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
          {broken && !rtl && (
            <IconButton onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Typography variant="h3" color="#174c4f">Enquiry</Typography>
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
      <Formik
          // initialValues={initialValues}
          onSubmit={(values, setSubmitting) => {
            // setTimeout(() => {
            
              // fnEnquirytruckSave(values)

            // }, 100);
          }}
          // validationSchema={addTruckSchema}
          enableReinitialize={true}
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
    <Grid item xs={12} md={5}>
      <FormControl fullWidth>
        <TextField
          name="fromDate"
          type="date"
          id="fromDate"
          label="From Date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          inputFormat="YYYY-MM-DD"
          focused
          fullWidth
        />
      </FormControl>
    </Grid>

    <Grid item xs={12} md={5}>
      <FormControl fullWidth>
        <TextField
          name="toDate"
          type="date"
          id="toDate"
          label="To Date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          inputFormat="YYYY-MM-DD"
          focused
          fullWidth
        />
      </FormControl>
    </Grid>

    <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Button
        variant="contained"
        sx={{
          height: 40,
          backgroundColor: '#174c4f',
          color: 'white',
          '&:hover': {
            backgroundColor: '#82ada5', // Custom hover color
          },
        }}
        onClick={() => {
          setIsShowField(true);
          setIsShowdataGrid(false);
        }}
      >
        Filter
      </Button>
    </Grid>
  </Grid>
</Box>

    <Box
  height="100vh"
  display="flex"
  flexDirection={{ xs: 'column', md: 'row' }} // Responsive for smaller screens
  alignItems="flex-start"
  justifyContent="flex-start"
  minHeight="100vh"
  marginLeft="10px"
>
  
  {/* Left section for filters */}
  {isShowField && (<Box
  width={{ xs: '100%', sm: '80%', md: '300px' }} // Full width on small screens, 80% on medium, 300px on larger screens
  mb={2}
>
 
  <Stack
    component="form"
    sx={{ marginTop: { xs: '5px', md: '10px' } }} // Adjust margin based on screen size
    spacing={2}
    autoComplete="off"
    direction="column"
  >
         
       
              
                  <FormControl
                        sx={{
                       
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="ID"
                          variant="filled"
                          value={companyLookupData.companylookupRecordid}
                          focused
                          sx={{ display: "none" }}
                        />

                        <TextField
                          id="outlined-basic"
                          label="Company code/Company Name"
                          variant="filled"
                          value={
                            companyLookupData.companylookupCode && companyLookupData.companylookupName
                              ? `${companyLookupData.companylookupCode} / ${companyLookupData.companylookupName}`
                              : companyLookupData.companylookupCode || companyLookupData.companylookupName
                          }

                          fullWidth
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          
                        />
                      
                      <Stack style={{ display: 'flex-wrap', justifyContent:"flex-end"}}>
                    <Button
                    variant="contained"
                      sx={{ height: 25, width: 20, marginLeft:1,padding: 0,marginBottom:1,
                        backgroundColor: '#174c4f',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#82ada5', // Custom hover color
                        },
                      }}
                      onClick={() => handleShow("COM")}
                    >
                    Select
                    </Button>
                    <Button  variant="contained" sx={{  backgroundColor: '#ba000d',
                       height: 25, width: 25 , padding: 0, marginLeft:1 }}
                       justifyContent="flex-end" onClick={()=>fnCompanyClearSave()}>
                        Clear
                      
                      </Button>
                      </Stack>
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
                          label="ID"
                          variant="filled"
                          value={routeLookupData.routelookupRecordid}
                          focused
                          sx={{ display: "none" }}
                        />

                        <TextField
                          id="outlined-basic"
                          label="Route code/Route Name"
                          variant="filled"
                          value={
                            routeLookupData.routelookupCode && routeLookupData.routelookupName
                              ? `${routeLookupData.routelookupCode} / ${routeLookupData.routelookupName}`
                              : routeLookupData.routelookupCode || routeLookupData.routelookupName
                          }

                          fullWidth
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          
                        />
                          <Stack style={{ display: 'flex-wrap', justifyContent:"flex-end"}}>
                    <Button
                    variant="contained"
                      sx={{ height: 25, width: 20, marginLeft:1,padding: 0,marginBottom:1,
                        backgroundColor: '#174c4f',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#82ada5', // Custom hover color
                        },
                      }}
                      onClick={() => handleShow("Route")}
                    >
                    Select
                    </Button>
                    <Button  variant="contained" sx={{  backgroundColor: '#ba000d',
                       height: 25, width: 25 , padding: 0, marginLeft:1 }}
                       justifyContent="flex-end" onClick={()=>fnRouteClearSave()}>
                        Clear
                      
                      </Button>
                      </Stack>


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
                          label="ID"
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
                            truckLookupData.trucklookupCode && truckLookupData.trucklookupName
                              ? `${truckLookupData.trucklookupCode} / ${truckLookupData.trucklookupName}`
                              : truckLookupData.trucklookupCode || truckLookupData.trucklookupName
                          }

                          fullWidth
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          
                        />
                        <Stack style={{ display: 'flex-wrap', justifyContent:"flex-end"}}>
                    <Button
                    variant="contained"
                      sx={{ height: 25, width: 20, marginLeft:1,padding: 0,marginBottom:1,
                        backgroundColor: '#174c4f',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#82ada5', // Custom hover color
                        },
                      }}
                      onClick={() => handleShow("Truck")}
                    >
                    Select
                    </Button>
                    <Button  variant="contained" sx={{  backgroundColor: '#ba000d',
                       height: 25, width: 25 , padding: 0, marginLeft:1 }}
                       justifyContent="flex-end" onClick={()=>fnTruckClearSave()}>
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
                          label="ID"
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
                            driverLookupData.driverlookupCode && driverLookupData.driverlookupName
                              ? `${driverLookupData.driverlookupCode} / ${driverLookupData.driverlookupName}`
                              : driverLookupData.driverlookupCode || driverLookupData.driverlookupName
                          }

                          fullWidth
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          
                        />
                        
                        <Stack style={{ display: 'flex-wrap', justifyContent:"flex-end"}}>
                    <Button
                    variant="contained"
                      sx={{ height: 25, width: 20, marginLeft:1,padding: 0,marginBottom:1,
                        backgroundColor: '#174c4f',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#82ada5', // Custom hover color
                        },
                      }}
                      onClick={() => handleShow("Driver")}
                    >
                    Select
                    </Button>
                    <Button  variant="contained" sx={{  backgroundColor: '#ba000d',
                       height: 25, width: 25 , padding: 0, marginLeft:1 }}
                       justifyContent="flex-end" onClick={()=>fnDriverClearSave()}>
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
                            doorLookupData.doorlookupCode && doorLookupData.doorlookupName
                              ? `${doorLookupData.doorlookupCode} / ${doorLookupData.doorlookupName}`
                              : doorLookupData.doorlookupCode || doorLookupData.doorlookupName
                          }

                          fullWidth
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          
                        />
                        
                        <Stack style={{ display: 'flex-wrap', justifyContent:"flex-end"}}>
                    <Button
                    variant="contained"
                      sx={{ height: 25, width: 20, marginLeft:1,padding: 0,marginBottom:1,
                        backgroundColor: '#174c4f',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#82ada5', // Custom hover color
                        },
                      }}
                      onClick={() => handleShow("Door")}
                    >
                    Select
                    </Button>
                    <Button  variant="contained" sx={{  backgroundColor: '#ba000d',
                       height: 25, width: 25 , padding: 0, marginLeft:1 }}
                       justifyContent="flex-end" onClick={()=>fnDoorClearSave()}>
                        Clear
                      
                      </Button>
                      </Stack>
                      </FormControl>
       
                 
          <Stack direction="row" justifyContent="flex-end" gap={2}>
       
          <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        checked={isShowOnlyAssignChecked}
        onChange={handleCheckboxChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <span style={{ marginLeft: '8px' }}>Assigned</span>
    </div>
    
          <Button variant="contained"     sx={{
                  backgroundColor: '#ba000d',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#82ada5', // Custom hover color
                  },
                }} justifyContent="flex-end"
                
                onClick={()=>fnClearSave()}
                >
              Clear
            </Button>
            <Button variant="contained"     sx={{
                  backgroundColor: '#174c4f',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#82ada5', // Custom hover color
                  },
                }} justifyContent="flex-end"
                onClick={handleClick}
                >
              Apply
            </Button>
           
          </Stack>
                     
        </Stack>
      </Box>)}

      {isShowdataGrid && (<Box 
    width={{ xs: '100%', sm: '90%', md: '70%' }} // Responsive width: 100% on small screens, 90% on small to medium, 70% on larger
    sx={{ 
      padding: { xs: '10px', md: '20px' }, 
      marginLeft: { xs: '5px', md: '20px' },
      display: 'flex', 
      flexDirection: 'column',
      flexGrow: 1 // Allows the box to grow and fill available space
    }}
  >
    <Box
      height="500px" // Allows DataGrid to take up available space
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
        '& .MuiDataGrid-row:nth-child(even)': {
          backgroundColor: colors.orange[100],
        },
        '& .MuiDataGrid-row:nth-child(odd)': {
          backgroundColor: colors.white[100],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
      <DataGrid 
        rows={explorelistViewData}
        columns={columns}
        loading={exploreLoading}
        disableSelectionOnClick
        getRowId={(row) => row.RecordID}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        onCellClick={(params) => {
          const currentRow = params.row;
          const currentcellField = params.field;
          // selectcelldata(currentRow, "E", currentcellField);
          console.log(JSON.stringify(params));
        }}
        components={{
          Toolbar: secondaryCustomToolbar,
        }}
        onStateChange={(stateParams) => setRowCount(stateParams.pagination.rowCount)}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
    <Stack direction="row" justifyContent="flex-end" gap={2} mt={3}>
      <Button variant="contained" color="error" onClick={handleClickPDF}>
        PDF
      </Button>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => {
          dispatch(
            mailOpen({
              HashtokenI: pdf,
              HashtokenP: '',
              Type: 'ET',
              PriceListID: '',
              Brand: '',
              Classdesc: '',
              Commodity: ''
            })
          );
        }}
      >
        Email
      </Button>
    </Stack>
  </Box>)}
      <Popup
                  title="Company"
                  openPopup={openCompanyPopup}
                  setOpenPopup={setOpenCompanyPopup}
                >
                  <Listviewpopup
                    accessID=""
                    screenName="Company"
                    childToParent={childToParent}
                  />
         </Popup>         
      <Popup
            title="Route"
            openPopup={openRoutePopup}
            setOpenPopup={setOpenRoutePopup}
          >
            <Listviewpopup
              accessID=""
              screenName="Route"
              childToParent={childToParent}
              filterName={"Company"}
              filterValue={`${companyLookupData.companylookupRecordid}`}
            />
          </Popup>
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
              filterValue={`${companyLookupData.companylookupRecordid}`}
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
              filterValue={`${companyLookupData.companylookupRecordid}`}
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
              filterValue={`${companyLookupData.companylookupRecordid}`}
            />
          </Popup>
          <Mailpopup  open={open}/>
    </Box>
    </form>
    )}
    </Formik>
        </React.Fragment>
      );
}
