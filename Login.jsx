import React, { useState,useEffect }  from 'react';
import {Select, Avatar,Stack, Grid,Paper, FormLabel, TextField, Button, Autocomplete,Box,Link,IconButton,FormControl,InputLabel,OutlinedInput,InputAdornment,FormHelperText,FormGroup,MenuItem, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon  from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Tabss from '../../ui-components/tabs';
import logo from '../../assets/img/logo.png'
import '../../index.css';
import { useFormik } from "formik";
import basicSchema from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { authentication, fetchApidata } from "../../store/reducers/LoginReducer"; 
import { fetchComboData1 } from "../../store/reducers/Comboreducer";
import { fetchyearComboData } from "../../store/reducers/LoginReducer";
import store from '../../index';
import { toast } from "react-hot-toast";
import {  useParams } from "react-router-dom";
import { Field, Form, Formik,ErrorMessage} from 'formik';
import PlybackGround from '../../assets/img/PlybackGround.jpg'
import { LoadingButton } from '@mui/lab';
import { Margin } from '@mui/icons-material';



const style = {
  height:'55px',
  border:'2px solid #1769aa ',
  borderRadius:'5px'
};

const Login=()=>{
  const navigate = useNavigate();
  const Data=useSelector((state) => state.loginApi.Data);
  const Status=useSelector((state) => state.loginApi.Status);
  const Msg=useSelector((state) => state.loginApi.msg);
  const isLoading=useSelector((state) => state.loginApi.loading);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const CompanyCombo = useSelector((state)=>state.comboApi.company);
  const YearCombo = useSelector((state)=>state.comboApi.year);


              
  React.useEffect(() => {
    dispatch(fetchComboData1('TR014','getall','-1','Company'));
    dispatch(fetchComboData1('TR015','getall','-1','Year'));
   
    }, []);


  const [value, setValues] = React.useState({
     
      showPassword: false,
    });
      
  
    const handleChanges = (prop) => (event) => {
      setValues({ ...value, [prop]: event.target.value });
    };
  
  
    const handleClickShowPassword = () => {
      setValues({
        ...value,
        showPassword: !value.showPassword,
      });
    };


    
  const [company,setCompanycombo] =React.useState()
  const [year,setYearcombo] =React.useState()


    const initialValues = {
      username:'',
      password:'',
      company:company,
      year:year
  };
  const clear =  async (values) =>
  {
    setCompanycombo('');
    setYearcombo('');
  }
    const fnLogin =  async (values) =>
    {
      // setLoading(true);


      // if ((values.company == "")||(values.company == undefined)) {
      //   toast.error("Please select company");
      //   setLoading(false);
      //   return;
      // }
      if (values.username == "") {
        toast.error("UserName should not be empty");
        setLoading(false);
        return;
      }
      if (values.password == "") {
        toast.error("Password shoud not be empty");
        setLoading(false);
        return;
      }
      // if ((values.year == "")||(values.year == undefined)) {
      //   toast.error("Please select year");
      //   setLoading(false);
      //   return;
      // }
      // var idata = {
      //   Query: {
      //     username: values.username,
      //     password: values.password,
      //     yearrecordid:values.year,
      //     companyrecordid: values.company,
      //   },
      // };
   
      // idata = JSON.stringify(idata);
    //  const data = await dispatch(fetchApidata(values.username,values.password,values.company,values.year));  
    const idata = { 
      "Query": {
        "username": values.username,
        "password": values.password
      }
    };
    
  
     const data = await dispatch(authentication({idata}));
    //  console.log("🚀 ~ file: Login.jsx:126 ~ Login ~ data:", data)
     
     
     
     if(data.payload.Status == "Y")
     {  
       var loginrecordID = data.payload.Data.Recordid
      // var company = data.payload.Data.Company
      // var year = data.payload.Data.Year
      // var YearFlag = data.payload.Data.YearFlag
      // var CompanyRecordid = data.payload.Data.CompanyRecordid
      // var stockflag = data.payload.Data.Process
      // var Cifbysea = data.payload.Data.Cifbysea
      // var Cifbyair = data.payload.Data.Cifbyair
      // var Fob = data.payload.Data.Fob
      // var Overhead = data.payload.Data.Overhead
      // var YearRecorid = data.payload.Data.YearRecorid
      // var Groupaccess = data.payload.Data.Groupaccess
      var UserName = data.payload.Data.Name
      // var labourCharge = data.payload.Data.Labourcharges
      
      // var Modules = data.payload.Data.Modules
      
      sessionStorage.setItem("loginRecid", loginrecordID);
      sessionStorage.setItem("UserName",UserName);
      // sessionStorage.setItem("labourCharge",labourCharge);
      // sessionStorage.setItem("company", company);
      // sessionStorage.setItem("year", year);
      // sessionStorage.setItem("YearFlag", YearFlag);
      // sessionStorage.setItem("compID", CompanyRecordid);
      // sessionStorage.setItem("stockflag", stockflag);
      // sessionStorage.setItem("currentPage", 0);
      // sessionStorage.setItem("secondaryCurrentPage", 0);
      // sessionStorage.setItem("Cifbysea",Cifbysea)
      // sessionStorage.setItem("Cifbyair",Cifbyair)
      // sessionStorage.setItem("Fob",Fob)
      // sessionStorage.setItem("Overhead",Overhead)
      // sessionStorage.setItem("YearRecorid",YearRecorid)
      // sessionStorage.setItem("Groupaccess",JSON.stringify(Groupaccess))
      // sessionStorage.setItem("Modules",JSON.stringify(Modules))
      navigate("/Apps/Chart");
     }
     else {
      setLoading(false);
      toast.error(data.payload.message);
    }
  }
    return(
      <div className='wrapper'>
          
      <Box display={'table'} height='99vh' width='100%' >
      <IconButton sx={{position:"absolute" ,right:'20px'}} color={'info'}><HelpOutlineOutlinedIcon/></IconButton>
       <Grid container sx={{display:'table-cell',verticalAlign:'middle',}}  rowSpacing={5}  columnSpacing={{ xs: 1, sm: 2, md: 3 }}   >
       <Formik
        // onSubmit={handleFormSubmit}
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={basicSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm
        }) => (
          <form onSubmit={handleSubmit}>
    <Stack
  component="form"
  height={{ sm: '500px', md: '500px' }}
  width={{ sm: '400px', md: '400px' }}

  sx={{
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    borderRadius: '10px',
    backgroundColor: '#e0e0e0',
    padding: '15px',
    opacity:'20px',
    margin: "20px auto",
    // marginTop:50
  }}>

<Stack
    sx={{
      width: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundImage: `url(${PlybackGround})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      padding: 1,
      borderRadius: '5px',
    }}
  >
    <Avatar variant='rounded' src={logo} sx={{width:'150px',height:'150px'}}></Avatar>
   </Stack>
   <Typography marginLeft={12}  sx={{marginTop:3}} variant="h5" component="h2" color={'#dd2c00'}>
<b>PLYMOUTH E-PORTAL</b> 
</Typography>
   <Stack
    sx={{
      width: '100%',
    //   height:'100%'
    marginTop:3
      
    }}
    spacing={2}
    
  >
 

    <FormControl fullWidth>
      <TextField
        margin='normal'
        focused
        label='Username'
        id='username'
        value={values.username}
        onBlur={handleBlur}
        onChange={handleChange}
        onSubmit={handleSubmit}
        fullWidth
        required
        error={!!touched.username && !!errors.username}
        helperText={touched.username && errors.username}
      />
    </FormControl>

    <FormControl focused margin='normal' fullWidth required>
      <InputLabel>Password</InputLabel>
      <OutlinedInput
        id="password"
        type={value.showPassword ? 'text' : 'password'}
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {value.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {/* {errors.password && <FormHelperText sx={{ color: "red" }}>{errors.password}</FormHelperText>} */}
    </FormControl>

    

    <Stack direction={'row'} justifyContent='end' gap={'10px'}>
      <LoadingButton
        onClick={() => { fnLogin(values) }}
        sx={{backgroundColor:"#174c4f",marginLeft:'5px',marginTop:'5px',
          color: 'white','&:hover': {
                  backgroundColor: '#82ada5', // Custom hover color
                }, }}
        loading={isLoading}
        variant="contained"
      >
        Ok
      </LoadingButton>
      <Button
        variant="contained"
        sx={{backgroundColor:"#dd2c00",marginLeft:'5px',marginTop:'5px',
          color: 'white','&:hover': {
                  backgroundColor: '#ff9e80', // Custom hover color
                }, }}
        onClick={() => { clear(values); resetForm() }}
      >
        Cancel
      </Button>
    </Stack>
  </Stack>
</Stack>

            
        </form>
        )}
      </Formik>
        </Grid> 
        </Box>
        </div>

    )

}

export default Login;
