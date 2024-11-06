import * as React from "react";
import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  ProSidebarProvider,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  useTheme,
  Tooltip,
  ListItem,
  Button,
  Icon,
  Chip,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import { useHref, Link } from "react-router-dom";
// import avatar from "../../assets/img/avatar.jpg";
import { tokens } from "../../Theme";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { useNavigate } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LgemsLogo from "../../assets/img/LgemsLogo.png";
import logo from "../../assets/img/logo.png";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LanguageIcon from "@mui/icons-material/Language";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AirlinesIcon from "@mui/icons-material/Airlines";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GradeIcon from "@mui/icons-material/Grade";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DescriptionIcon from "@mui/icons-material/Description";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import { ReactComponent as UomIcon } from "../../assets/icon/uom.svg";
import { ReactComponent as ProformaInvoiceIcon } from "../../assets/icon/proformainvoice.svg";
import { ReactComponent as SupplierIcon } from "../../assets/icon/supplier.svg";
import { ReactComponent as CustomerIcon } from "../../assets/icon/customer.svg";
import { ReactComponent as MaterialIcon } from "../../assets/icon/material.svg";
import { ReactComponent as BatchIcon } from "../../assets/icon/batch.svg";
import { ReactComponent as ProductIcon } from "../../assets/icon/products.svg";
import { ReactComponent as SubstanceIcon } from "../../assets/icon/substance.svg";
import { Details } from "@mui/icons-material";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FactoryIcon from "@mui/icons-material/Factory";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
// import BusinessIcon from '@mui/icons-material/Business';
import RouterIcon from '@mui/icons-material/Router';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
const child = {
  data: [
    
     
    {
    
      name: "Setup",
      id: 6,
      Tooltipname: "Setup",
      MenuID: "ST100",
      icon: (
        <Tooltip title="Setup">
          <SettingsInputSvideoIcon color="info" />
        </Tooltip>
      ),
      children: [
        {
          name: "Company",
          id: 230,
          url: "./EditCompany",
          icon: (
            <Tooltip title="Company">
              <BusinessIcon color="info" />
            </Tooltip>
          ),
         
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "PM211",
        },
        {
          name: "Route",
          id: 231,
          url: "./EditRoute",
         
          icon: (
            <Tooltip title="Route">
              <RouterIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "PM212",
        },
        {
          name: "Truck",
          id: 232,
          url: "./EditTruck",
         
          icon: (
            <Tooltip title="Truck">
              <AirportShuttleIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "PM213",
        },
        {
          name: "Driver",
          id: 233,
          url: "./EditDriver",
         
          icon: (
            <Tooltip title="Driver">
              <AirlineSeatReclineNormalIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "PM214",
        },

      ],
    },

    {
    
      name: "Price Book",
      id: 9,
      Tooltipname: "Price Book",
      MenuID: "PB100",
      icon: (
        <Tooltip title="Costing">
          <MonetizationOnIcon color="info" />
        </Tooltip>
      ),
      children: [
        {
          name: "Prepare Price Book",
          id: 237,
          url: "./TR201/Run Group",
          icon: (
            <Tooltip title="User">
              <CollectionsBookmarkIcon color="info" />
            </Tooltip>
          ),
         
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR201",
        },
        {
          name: "Print Price Book",
          id: 238,
          url: "./EditPrint",
         
          icon: (
            <Tooltip title="User Group">
              <CollectionsBookmarkIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR202",
        },
      ],
    },
    {
      name: "Truck Tracking",
      id: 10,
      Tooltipname: "Truck Tracking",
      MenuID: "TK100",
      icon: (
        <Tooltip title="Truck Tracking">
          <LocalShippingOutlinedIcon color="info" />
        </Tooltip>
      ),
      children: [
        {
          name: "Assign Truck and Driver",
          id: 250,
          url: "./EditAddtruck",
          icon: (
            <Tooltip title="Assign Truck and Driver">
              <LocalShippingIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "PM301",
        },
        {
          name: "Enquiry",
          id: 251,
          url: "./EditEnquiryTruck",
          icon: (
            <Tooltip title="Enquiry Truck">
              <LocalShippingIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "PM302",
        },
      ],
    },
    {
      name: "Security",
      id: 8,
      Tooltipname: "Security",
      MenuID: "SE100",
      icon: (
        <Tooltip title="Security">
          <SecurityOutlinedIcon color="info"  />
        </Tooltip>
      ),
      children: [
        {
          name: "User",
          id: 235,
          url: "./TR094/User",
          icon: (
            <Tooltip title="User">
              <PermIdentityOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR094",
        },
        {
          name: "User Group",
          id: 236,
          url: "./TR099/Companies",
          icon: (
            <Tooltip title="User Group">
              <Diversity3Icon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR099",
        },
      ],
    },
    
    // {
    
      // name: "Truck Tracking",
      // id: 10,
      // Tooltipname: "Truck Tracking",
      // MenuID: "TK100",
      // icon: (
      //   <Tooltip title="Truck Tracking">
      //     <MonetizationOnIcon color="info" />
      //   </Tooltip>
      // ),
    // },
   
  ],
};

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const colors = tokens(theme.palette.mode);

  function cal() {
    setSelected(title);
    navigate(to);
  }

  return (
    <MenuItem active={selected === title} icon={icon} onClick={cal}>
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebars = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Product Category");

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const [collapse, setCollapsed] = useState(false);
  const [openTruckTracking, setOpenTruckTracking] = useState(false);

  const toggleTruckTracking = () => {
    setOpenTruckTracking(!openTruckTracking);};
  
  
    const company = sessionStorage.getItem("company");
  const year = sessionStorage.getItem("year");
  // const Groupaccess = JSON.parse(sessionStorage.getItem("Groupaccess")) || [];
  // const Modules = JSON.parse(sessionStorage.getItem("Modules")) || [];
  // console.log("🚀 ~ file: Sidebar.jsx:773 ~ Sidebars ~ Modules:", Modules);
  // console.log("🚀 ~ file: Sidebar.jsx:772 ~ Sidebars ~ Groupaccess:", Groupaccess)

  const handleClicks = (item) => {
    let newData = { ...menu, [item]: !menu[item] };
    setMenu(newData);
  };
  const [menu, setMenu] = useState({});
  // const handleMenu = (children, accessRow) => {
  //   // console.log("🚀 ~ file: Sidebar.jsx:780 ~ handleMenu ~ accessRow:", accessRow)

  //   return children.map(
  //     ({
  //       children,
  //       name,
  //       url,
  //       icon,
  //       Tooltipname,
  //       id,
  //       UGA_ACCESSIDS,
  //       MenuID,
  //     }) => {
  //       if (!children) {
  //         return accessRow.map(
  //           ({
  //             UGA_ADD,
  //             UGA_DEL,
  //             UGA_MOD,
  //             UGA_PRINT,
  //             UGA_PROCESS,
  //             UGA_VIEW,
  //             UGA_ACCESSID,
  //           }) => {
  //             if (
  //               UGA_ACCESSID === UGA_ACCESSIDS &&
  //               (UGA_ADD ||
  //                 UGA_DEL ||
  //                 UGA_MOD ||
  //                 UGA_PRINT ||
  //                 UGA_PROCESS ||
  //                 UGA_VIEW)
  //             ) {
  //               return (
  //                 <List component="div" disablePadding key={id}>
  //                   <ListItem
  //                     disableGutters
  //                     style={{ padding: "0px" }}
  //                     key={id}
  //                   >
  //                     <Item
  //                       title={name}
  //                       to={url}
  //                       icon={icon}
  //                       selected={selected}
  //                       setSelected={setSelected}
  //                     />
  //                   </ListItem>
  //                 </List>
  //               );
  //             }
  //           }
  //         );
  //       }

  //       return Modules.map(({ PPD, SM_PMENU }) => {
  //         if (PPD && SM_PMENU === MenuID) {
  //           return (
  //             <div key={id}>
  //               <ListItem
  //                 disableGutters
  //                 key={id}
  //                 onClick={() => handleClicks(name)}
  //               >
  //                 {!collapsed && (
  //                   <Tooltip title={Tooltipname}>
  //                     <ListItemButton>
  //                       <ListItemIcon>{icon}</ListItemIcon>
  //                       <ListItemText primary={name} />

  //                       {menu[name] ? (
  //                         <ExpandMore />
  //                       ) : (
  //                         <ChevronRightOutlinedIcon />
  //                       )}
  //                     </ListItemButton>
  //                   </Tooltip>
  //                 )}
  //                 {collapsed && (
  //                   <ListItemButton>
  //                     <ListItemIcon>
  //                       {icon}{" "}
  //                       {menu[name] ? (
  //                         <ExpandMore />
  //                       ) : (
  //                         <ChevronRightOutlinedIcon />
  //                       )}
  //                     </ListItemIcon>
  //                   </ListItemButton>
  //                 )}
  //               </ListItem>
  //               <Collapse
  //                 in={menu[name] ? true : false}
  //                 timeout="auto"
  //                 unmountOnExit
  //               >
  //                 {handleMenu(children, Groupaccess)}
  //               </Collapse>
  //             </div>
  //           );
  //         }
  //       });

  //       //
  //       // }
  //     }
  //   );
  // };
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

  return (
    // <Box
    //   sx={{
    //     position: "sticky",
    //     display: "flex",
    //     height: "100vh",
    //     top: 0,
    //     bottom: 0,
    //     zIndex: 7,
    //     "& .sidebar": {
    //       border: "none",
    //     },
    //     "& .menu-icon": {
    //       backgroundColor: "transparent !important",
    //     },
    //     "& .menu-item": {
    //       backgroundColor: "transparent !important",
    //     },
    //     "& .menu-anchor": {
    //       color: "inherit !important",
    //       backgroundColor: "transparent !important",
    //     },
    //     "& .menu-item:hover": {
    //       color: `${colors.blueAccent[500]} !important`,
    //       backgroundColor: "transparent !important",
    //     },
    //     "& .menu-item.active": {
    //       color: `${colors.greenAccent[500]} !important`,
    //       backgroundColor: "transparent !important",
    //     },
    //   }}
    // >
    //   <Sidebar breakPoint="md" backgroundColor={colors.primary[400]}>
    //     <Menu>
    //       <MenuItem
    //         icon={
    //           collapsed ? (
    //             <IconButton onClick={() => collapseSidebar()}>
    //               <MenuOutlinedIcon />
    //             </IconButton>
    //           ) : undefined
    //         }
    //         style={{
    //           margin: "10px 0 3px 0",
    //           color: colors.grey[100],
    //         }}
    //       >
    //         {!collapsed && (
    //           <Box
    //             display="flex"
    //             justifyContent="space-between"
    //             alignItems="center"
    //             ml="15px"
    //           >
    //             <Avatar
    //               variant="rounded"
    //               src={logo}
                  
    //               sx={{height:"100%" ,width: "100px", p:"10px" }}
    //               onClick={() => {
    //                 navigate("./Chart");
    //               }}
    //             ></Avatar>

    //             <IconButton
    //               onClick={
    //                 broken ? () => toggleSidebar() : () => collapseSidebar()
    //               }
    //             >
    //               <CloseOutlinedIcon />
    //             </IconButton>
    //           </Box>
    //         )}
    //       </MenuItem>
    //       {!collapsed && (
    //         <Box
    //           display="flex"
    //           flexDirection={"column"}
    //           justifyContent="space-around"
    //           width="91%"
    //           height="67px"
    //           mt="16px"
    //           p="7px"
    //           ml="8px"
    //           borderRadius="4px"
    //           boxShadow="0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 5px 8px 0px rgba(0, 0, 0, 0.042),0px 1px 14px 0px rgba(0, 0, 0, 0.036)"
    //         >
    //           <Box display="flex" flexDirection="row">
    //             <Typography variant="subtitle2">{company}</Typography>
    //           </Box>
    //           <Box display="flex" flexDirection="row">
    //             <Typography variant="subtitle2">{year}</Typography>
    //           </Box>
    //         </Box>
    //       )}

    //       <Box paddingBottom={3}>
    //         {handleMenu(child.data, Groupaccess)}

         
    //         <Tooltip title="Logout">
    //           <ListItemButton
    //             onClick={() => {
    //               navigate("/");
    //             }}
    //           >
    //             <ListItemIcon>
    //               <PowerSettingsNewIcon color="error" />
    //             </ListItemIcon>

    //             {!collapsed && <ListItemText primary="Logout" />}
    //           </ListItemButton>
    //         </Tooltip>
    //         <Divider sx={{ mt: 1 }} variant="middle" />
    //         <Grid mt={1} p={1} container direction={"column"} spacing={2}>
    //           <Grid item>
    //             <Chip
    //               color="primary"
    //               variant="outlined"
    //               sx={{ width: "100%", background:"#ffffff" }}
    //               size="medium"
    //               label="Text"
    //             />
    //             {/* "#DFDDDD */}
    //           </Grid>
    //           <Grid item>
    //             <Chip
    //               color="primary"
    //               size="medium"
    //               variant="outlined"
    //               sx={{ width: "100%", background: "#F0E8B8" }}
    //               label="Numeric"
    //             />
    //           </Grid>
    //           <Grid item>
    //             <Chip
    //               color="primary"
    //               size="medium"
    //               variant="outlined"
    //               sx={{ width: "100%", background: "#F0CDB5" }}
    //               label="Calculation"
    //             />
    //           </Grid>
    //           <Grid item>
    //             <Chip
    //               color="primary"
    //               variant="outlined"
    //               sx={{ width: "100%",  background: "#DFDDDD" }}
    //               size="medium"
    //               label="Read Only"
    //             />
    //             {/* "#DFDDDD */}
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Menu>
    //   </Sidebar>
    // </Box>
//     <Box
//   sx={{
//     position: "sticky",
//     display: "flex",
//     height: "100vh",
//     top: 0,
//     bottom: 0,
//     zIndex: 7,
//     "& .sidebar": {
//       border: "none",
//     },
//     "& .menu-icon": {
//       backgroundColor: "transparent !important",
//     },
//     "& .menu-item": {
//       backgroundColor: "transparent !important",
//     },
//     "& .menu-anchor": {
//       color: "inherit !important",
//       backgroundColor: "transparent !important",
//     },
//     "& .menu-item:hover": {
//       color: `${colors.blueAccent[500]} !important`,
//       backgroundColor: "transparent !important",
//     },
//     "& .menu-item.active": {
//       color: `${colors.greenAccent[500]} !important`,
//       backgroundColor: "transparent !important",
//     },
//   }}
// >
//   <Sidebar breakPoint="md" backgroundColor={colors.primary[400]}>
//     <Menu>
//       <MenuItem
//         icon={
//           collapsed ? (
//             <IconButton onClick={() => collapseSidebar()}>
//               <MenuOutlinedIcon />
//             </IconButton>
//           ) : undefined
//         }
//         style={{
//           margin: "10px 0 3px 0",
//           color: colors.grey[100],
//         }}
//       >
//        {!collapsed && (
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 ml="15px"
//               >
//                 <Avatar
//                   variant="rounded"
//                   src={logo}
                  
//                   sx={{height:"100%" ,width: "100px", p:"10px" }}
//                   onClick={() => {
//                     navigate("./Chart");
//                   }}
//                 ></Avatar>

//                 <IconButton
//                   onClick={
//                     broken ? () => toggleSidebar() : () => collapseSidebar()
//                   }
//                 >
//                   <CloseOutlinedIcon />
//                 </IconButton>
//               </Box>
//             )}
//           </MenuItem>
//           {!collapsed && (
//             <Box
//               display="flex"
//               flexDirection={"column"}
//               justifyContent="space-around"
//               width="91%"
//               height="67px"
//               mt="16px"
//               p="7px"
//               ml="8px"
//               borderRadius="4px"
//               boxShadow="0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 5px 8px 0px rgba(0, 0, 0, 0.042),0px 1px 14px 0px rgba(0, 0, 0, 0.036)"
//             >
//               <Box display="flex" flexDirection="row">
//                 <Typography variant="subtitle2">Ply-Mouth</Typography>
//               </Box>
//               <Box display="flex" flexDirection="row">
//                 <Typography variant="subtitle2">2024</Typography>
//               </Box>
//             </Box>
//           )}
      

//       {/* Truck Tracking Static Menu */}
//       <Menu>
//           {/* Truck Tracking Parent Item */}
//           <MenuItem
//             icon={
//               <Tooltip title="Truck Tracking">
//                 <LocalShippingOutlinedIcon color="info" />
//               </Tooltip>
//             }
//             onClick={toggleTruckTracking}
//           >
//             Truck Tracking
//             {openTruckTracking ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//           </MenuItem>

//           {/* Truck Tracking Child Items - Collapsible */}
//           <Collapse in={openTruckTracking} timeout="auto" unmountOnExit>
//             <MenuItem
//               icon={
//                 <Tooltip title="Assign Truck and Driver">
//                   <LocalShippingIcon color="info" />
//                 </Tooltip>
//               }
//               sx={{ pl: 4 }}
//               onClick={() => navigate("./EditAddtruck")}
//             >
//               Assign Truck and Driver
//             </MenuItem>
//             <MenuItem
//               icon={
//                 <Tooltip title="Enquiry Truck">
//                   <LocalShippingIcon color="info" />
//                 </Tooltip>
//               }
//               sx={{ pl: 4 }}
//               onClick={() => navigate("./EditEnquiryTruck")}
//             >
//               Enquiry
//             </MenuItem>
//           </Collapse>

//       {/* Rest of the sidebar items and logout button */}
//       <Box paddingBottom={3}>
//         <Tooltip title="Logout">
//           <ListItemButton
//             onClick={() => {
//               navigate("/");
//             }}
//           >
//             <ListItemIcon>
//               <PowerSettingsNewIcon color="error" />
//             </ListItemIcon>
//             {!collapsed && <ListItemText primary="Logout" />}
//           </ListItemButton>
//         </Tooltip>

//         <Divider sx={{ mt: 1 }} variant="middle" />

//         <Grid mt={1} p={1} container direction={"column"} spacing={2}>
//           <Grid item>
//             <Chip
//               color="primary"
//               variant="outlined"
//               sx={{ width: "100%", background: "#ffffff" }}
//               size="medium"
//               label="Text"
//             />
//           </Grid>
//           <Grid item>
//             <Chip
//               color="primary"
//               size="medium"
//               variant="outlined"
//               sx={{ width: "100%", background: "#F0E8B8" }}
//               label="Numeric"
//             />
//           </Grid>
//           <Grid item>
//             <Chip
//               color="primary"
//               size="medium"
//               variant="outlined"
//               sx={{ width: "100%", background: "#F0CDB5" }}
//               label="Calculation"
//             />
//           </Grid>
//           <Grid item>
//             <Chip
//               color="primary"
//               variant="outlined"
//               sx={{ width: "100%", background: "#DFDDDD" }}
//               size="medium"
//               label="Read Only"
//             />
//           </Grid>
//         </Grid>
//       </Box>
//     </Menu>
//   </Sidebar>
// </Box>
<Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 7,
        "& .sidebar": { border: "none" },
        "& .menu-icon, .menu-item, .menu-anchor": {
          backgroundColor: "transparent !important",
          color: "inherit !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar breakPoint="md" backgroundColor={colors.primary[400]}>
        <Menu>
          
        <MenuItem
        icon={
          collapsed ? (
            <IconButton onClick={() => collapseSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          ) : undefined
        }
        style={{
          margin: "10px 0 3px 0",
          color: colors.grey[100],
        }}
      >
       {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Avatar
                  variant="rounded"
                  src={logo}
                  
                  sx={{height:"100%" ,width: "100px", p:"10px" }}
                  onClick={() => {
                    navigate("./Chart");
                  }}
                ></Avatar>

                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="space-around"
              width="91%"
              height="67px"
              mt="16px"
              p="7px"
              ml="8px"
              borderRadius="4px"
              boxShadow="0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 5px 8px 0px rgba(0, 0, 0, 0.042),0px 1px 14px 0px rgba(0, 0, 0, 0.036)"
            >
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle2">Ply-Mouth</Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle2">2024</Typography>
              </Box>
            </Box>
          )}
          {/* Truck Tracking Parent Item */}
          <ListItemButton onClick={toggleTruckTracking}>
            <ListItemIcon>
              <Tooltip title="Truck Tracking">
                <LocalShippingOutlinedIcon color="info" />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Truck Tracking" />
            {openTruckTracking ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>

          {/* Truck Tracking Child Items - Collapsible */}
          <Collapse in={openTruckTracking} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("./EditAddtruck")}>
                <ListItemIcon>
                  <Tooltip title="Assign Truck and Driver">
                    <LocalShippingIcon color="info" />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Assign Truck and Driver" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("./EditEnquiryTruck")}>
                <ListItemIcon>
                  <Tooltip title="Enquiry Truck">
                    <LocalShippingIcon color="info" />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Enquiry" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Logout and other sidebar items */}
          <Box paddingBottom={3}>
            <Tooltip title="Logout">
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <PowerSettingsNewIcon color="error" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Logout" />}
              </ListItemButton>
            </Tooltip>

            <Divider sx={{ mt: 1 }} variant="middle" />

          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebars;
