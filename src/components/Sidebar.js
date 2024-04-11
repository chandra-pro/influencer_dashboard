import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import { AddBox, Person, HelpOutline, QueryBuilder, Feedback, } from '@mui/icons-material';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import CollapsibleOption from './CollapsibleOption';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SellIcon from '@mui/icons-material/Sell';


const Sidebar = () => {
    const navigate=useNavigate()
  return (
    <>
      <List style={{ paddingTop: '64px', backgroundColor: "#f0f0f0",color: '#333',transition: "background-color 0.3s" }}>
        <ListItem style={styles.sideBarMenuItem}>
          <ListItemIcon><Person/></ListItemIcon>
            <ListItemText primary="Profile" onClick={()=>{navigate('/profile')}}></ListItemText>
        </ListItem>
        <></>
        
        <CollapsibleOption style={styles.sideBarMenuItem} title={"Products"} icon={<InventoryIcon/>} subCategories={[{title:'List',target:"/products/list",icon:<FormatListNumberedRtlIcon/>}]}/>
        <CollapsibleOption style={styles.sideBarMenuItem} title={"Sells"} icon={<SellIcon/>} subCategories={[{title:'Orders',target:"/sells/orders/list",icon:<ShoppingBagIcon/>}]}/>
      <Divider />
      <CollapsibleOption style={styles.sideBarMenuItem} title={"Help"} icon={<HelpOutline/>} subCategories={[{title:'Feedback',target:"",icon:<Feedback/>},{title:'Query',target:"",icon:<QueryBuilder/>}]}/>
      
      {/* </List>
      <List> */}
      </List>
    </>
  );
};

export default Sidebar;
const styles={
  sideBarMenuItem:{
    
  }
}