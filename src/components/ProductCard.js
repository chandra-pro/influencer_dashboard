import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Image from './Image';
import LoadingScreen from './LoadingScreen';

const ProductCard=({product,isAdmin,BASE_URL})=>{
    const navigate=useNavigate()

  
   
return (
    <Card key={product.id} variant="outlined" style={{maxWidth: '300px',boxShadow:'0  2px gray'}}>
        <CardContent>
            <Image imageUrl={product.image} height={140}/>
            <Typography variant="h6" style={styles.productTitle}>{product.name}</Typography>
            
            <Typography variant="body2">
            <span style={{ background: 'linear-gradient(to right, #FF5733, #FFD633)', padding: '2px 6px' , borderRadius: '4px' }}>{product.name}</span>
            </Typography>
            
            <Typography variant="body2" style={{...styles.productDesc,color:'lightgrey'}} >{product.description}</Typography>          
        </CardContent>
        <CardActions style={{display:'flex',justifyContent:'space-between'}}>
            <Typography variant="body2" style={{fontSize:17,color:'InactiveCaptionText'}} >Price: <span style={{color:'black',...styles.prize}}>{product.price}</span> Rs. </Typography>
            <Button
                variant="outlined"
                color="primary"
                onClick={()=>{}}
            >
                Generate link
            </Button>
        </CardActions>
    </Card>
)
}
export default ProductCard;
const styles={
    productDesc:{
        overflow: 'hidden',
        whiteSpace: 'nobreak',
        textOverflow: 'ellipsis',
        color:'lightgray',
        maxWidth: '100%', // Ensure the text doesn't overflow its container
        lineHeight: '1.2em', // Line height for each line of text
        height: '3.6em', // Maximum height for three lines of text (1.2em x 3)
        display: "-webkit-box",
      },
      productTitle:{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: '100%', // Ensure the text doesn't overflow its container
        lineHeight: '1.8em', // Line height for each line of text
        maxHeight: '1.8em',
      },
      prize:{
        fontWeight:'bold',
        fontSize:20,
        // color:''
      }
}