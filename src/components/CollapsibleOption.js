import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
  ListItemIcon,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const CollapsibleOption=({title,subCategories,style,icon})=>{
    const [open, setOpen] = useState(false);
    const navigate=useNavigate()
  const handleClick = () => {
    setOpen(!open);
  };
  

return (
    <>
    <ListItem onClick={handleClick} style={style}>
      <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subCategories.map((item,index)=>{
                return <ListItem key={index} style={{backgroundColor:'#e0e0e0'}} onClick={()=>{navigate(item.target)}}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
            })}
            
          </List>
        </Collapse></>
)
}
export default CollapsibleOption;