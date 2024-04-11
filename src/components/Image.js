import React, { useState, useEffect } from 'react';
import { CardMedia } from '@mui/material';
import { useQuery } from 'react-query';
import { fetchResource } from '..';
function Image({ imageUrl,height,sx}) {
 

  return (
    <CardMedia
        component="img"
        height={height?height:''}
        sx={{...sx}}
        image={imageUrl}
        alt={"image"}
    />
  );
}

export default Image;