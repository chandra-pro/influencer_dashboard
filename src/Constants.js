import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// colors
export const LIGHT_GREY = "lightgrey"
export const YELLOW = "#F7B61B"
export const WHITE = "white"
export const BLACK = "black"

// user mode
export const SELLER = "SELLER"
export const INFLUENCER = "INFLUENCER"
export const END = "END_USER"

// components
export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));