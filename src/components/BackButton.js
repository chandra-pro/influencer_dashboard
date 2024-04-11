import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Button
            style={{ marginLeft: "20px", marginTop: "20px", }}
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIosNewOutlined />}
            onClick={handleBack}
        >
            Back
        </Button>
    );
};

export default BackButton;