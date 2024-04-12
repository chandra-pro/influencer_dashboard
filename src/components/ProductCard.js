import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import Image from './Image';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ProductCard = ({ product, isAdmin, BASE_URL, userID }) => {
    const [generatedLink, setGeneratedLink] = useState('');

    const generateLink = (prodId) => {
        const link = `https://buybold.in/prod_specific/${prodId}/${userID}`;
        setGeneratedLink(link);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink)
            .then(() => alert('Link copied to clipboard'))
            .catch((error) => console.error('Failed to copy link: ', error));
    };

    return (
        <Card key={product.id} variant="outlined" style={{ maxWidth: '300px', boxShadow: '0 2px gray' }}>
            <CardContent>
                <Image imageUrl={product.image} height={140} />
                <Typography variant="h6" style={styles.productTitle}>
                    {product.name}
                </Typography>

                <Typography variant="body2">
                    <span style={{ background: 'linear-gradient(to right, #FF5733, #FFD633)', padding: '2px 6px', borderRadius: '4px' }}>
                        {product.name}
                    </span>
                </Typography>

                <Typography variant="body2" style={{ ...styles.productDesc, color: 'lightgrey' }}>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" style={{ fontSize: 17, color: 'InactiveCaptionText' }}>
                    Price: <span style={{ color: 'black', ...styles.prize }}>{product.price}</span> Rs.
                </Typography>
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => generateLink(product._id)} // Wrap generateLink in an arrow function
                    >
                        Generate link
                    </Button>
                    <div style={{marginTop:"3rem"}}>
                    {generatedLink && (
                        <div>
                            <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                            <p>link generated</p>
                            <CheckCircleOutlineIcon />
                            </div>
                          
                            {/* Add copy to clipboard button */}
                            <Button variant="outlined" onClick={copyToClipboard}>
                                Copy Link
                            </Button>
                        </div>
                    )}
                    </div>
                </div>
            </CardActions>
        </Card>
    );
};

const styles = {
    productDesc: {
        overflow: 'hidden',
        whiteSpace: 'nobreak',
        textOverflow: 'ellipsis',
        color: 'lightgray',
        maxWidth: '100%', // Ensure the text doesn't overflow its container
        lineHeight: '1.2em', // Line height for each line of text
        height: '3.6em', // Maximum height for three lines of text (1.2em x 3)
        display: '-webkit-box',
    },
    productTitle: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: '100%', // Ensure the text doesn't overflow its container
        lineHeight: '1.8em', // Line height for each line of text
        maxHeight: '1.8em',
    },
    prize: {
        fontWeight: 'bold',
        fontSize: 20,
    },
};

export default ProductCard;
