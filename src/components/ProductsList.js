import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from './BackButton';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoadingScreen from './LoadingScreen';
import ProductCard from './ProductCard';


const APP_BASE_URL= "https://brapi.buybold.in"
const ProductsList = ({ userID, BASE_URL ,isAdmin,user,isapproved}) => {
    const [uploadedProducts, setUploadedProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const filteredProducts = uploadedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ||product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

    useEffect(()=>{},[userID])
    useEffect(() => {
        fetchUploadedProducts();
    }, []);
        async function fetchUploadedProducts() {
            try {
               
                const response = await axios.get(`${APP_BASE_URL}/products/getAllProducts`);
                console.log("resp",response.data);
                const { status, allProducts } = response.data;
                if(response.data.status==="Success")
                setUploadedProducts([...uploadedProducts, ...allProducts]);
            } catch (error) {
                console.error('Error fetching uploaded products:', error);
            }
        }
        
      
    
    const handleLoadMore = () => {
        fetchUploadedProducts();
      };
    
    
    if(!userID) return <LoadingScreen></LoadingScreen>
    return (<>
    {!isapproved? (<p>You are not approved yet..</p>):
    (<>
        <TextField
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth  // Makes the input box take the full width of its container
            variant="outlined"  // Adds an outlined border to the input box
            InputProps={{
                startAdornment: ( // Adds a search icon as a prefix
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                ),
                className: 'custom-input', // Add your custom CSS class
            }}
            />

        <div style={styles.productGrid}>
            {uploadedProducts.length === 0 ? (
                <Typography>No uploaded products yet.</Typography>
            ) : (
                <div style={styles.gridContainer}>
                    {filteredProducts.map((product) => (
                        <ProductCard product={product} isAdmin={isAdmin} user={user} BASE_URL={BASE_URL} />
                    ))}
                     {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handleLoadMore}>Load More</button>
      )}
                </div>
            )}
        </div>
</>)
}
</>
    );
};

const styles = {
    productGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: "50px"
    },
    gridContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '16px',
    },
};

export default ProductsList;