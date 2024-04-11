import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { textAlign } from '@mui/system';
import { TextField, Button, Checkbox } from '@mui/material';

import LoadingScreen from '../components/LoadingScreen';
import BackButton from '../components/BackButton';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const styles = {
    formInput: {
        minWidth: "100%",
        marginTop: 20
    }
}

const StoreInformationForm = ({ userID, BASE_URL, setShowSnackbar, setSnackbarMessage, setSnackbarSeverity,user,isapproved }) => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
    });

    useEffect(() => {
        fetchStoreInformation(); // Fetch current store information when the component mounts
    }, []);

    const fetchStoreInformation = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/influencer/getInfluencerInfo/${userID}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching store information:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                Authorization: `Bearer ${user.accessToken}`,
                
              };
              console.log("token",user.accessToken);
              console.log("form",formData);
           const data= await axios.post(`${BASE_URL}/api/influencer/updateInfluencerInfo/${userID}`, formData,{headers});
           console.log("dtaa",data);
           fetchStoreInformation();
           setSnackbarMessage("Influencer information updated successfully")
            setSnackbarSeverity('success')
            setShowSnackbar(true)
        } catch (error) {
            setSnackbarMessage("Error updating store information")
            setSnackbarSeverity('error')
            setShowSnackbar(true)
        }
    };

    return <>
        <Card style={{minWidth:'250px',maxWidth:'400px',marginInline:'auto',marginTop:'10px'}} variant="outlined" align="left">
            <Box p={2}>
                <h3>Influencer Information</h3>
                <TextField
                    id="name"
                    name="name"
                    label="Name"
                    variant="standard"
                    style={styles.formInput}
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    variant="standard"
                    style={styles.formInput}
                    value={formData.phoneNumber}
                    // onChange={handleChange}
                    disabled
                />
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    variant="standard"
                    style={styles.formInput}
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    id="address"
                    name="address"
                    label="Address"
                    multiline
                    minRows={3}
                    variant="filled"
                    style={styles.formInput}
                    value={formData.address}
                    onChange={handleChange}
                />
                <Box m={2} align="center">
                    <Button variant="contained" onClick={handleSubmit}>
                        Update
                    </Button>
                </Box>
            </Box>
        </Card>
    </>
}


   
  

const SocialMediaReachForm = ({ userID, BASE_URL, setShowSnackbar, setSnackbarMessage, setSnackbarSeverity ,user}) => {
    const [formData, setFormData] = useState({
        twitter: '',
        facebook: '',
        instagram: '',
    });
    useEffect(() => {
        fetchSocialMediaLinks(); // Fetch current links when the component mounts
    }, []);

    const fetchSocialMediaLinks = async () => {
        try {
            
            const response = await axios.get(`${BASE_URL}/api/influencer/getSocialMedia/${userID}`);
            const { twitter, facebook, instagram } = response.data;
            setFormData({
                twitter: twitter || '',
                facebook: facebook || '',
                instagram: instagram || '',
            });
        } catch (error) {
            console.error('Error fetching social media links:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                Authorization: `Bearer ${user.accessToken}`,
              };
            await axios.post(`${BASE_URL}/api/influencer/updateSocialMediaInfo/${userID}`, formData,{headers});
            fetchSocialMediaLinks();
            setSnackbarMessage("Social media links updated successfully")
            setSnackbarSeverity('success')
            setShowSnackbar(true)
        } catch (error) {
            setSnackbarMessage("Error updating social media links")
            setSnackbarSeverity('error')
            setShowSnackbar(true)
        }
    };
    return <>
        <Card style={{minWidth:'250px',maxWidth:'400px',marginInline:'auto',marginTop:'10px'}} variant="outlined" align="left">
            <Box p={2}>
                <h3>Social Media Information</h3>
                <TextField
                    id="instagram"
                    name="instagram"
                    label="Instagram Profile Link"
                    variant="standard"
                    style={styles.formInput}
                    value={formData.instagram}
                    onChange={handleChange}
                />
                <TextField
                    id="facebook"
                    name="facebook"
                    label="Facebook Profile Link"
                    variant="standard"
                    style={styles.formInput}
                    value={formData.facebook}
                    onChange={handleChange}
                />
                <TextField
                    id="twitter"
                    name="twitter"
                    label="Twitter Profile Link"
                    variant="standard"
                    style={styles.formInput}
                    value={formData.twitter}
                    onChange={handleChange}
                />
                <Box m={2} align="center">
                    <Button variant="contained" onClick={handleSubmit}>
                        Update
                    </Button>
                </Box>
            </Box>
        </Card>
    </>
}

export const ProfilePage = ({ userID, BASE_URL, setShowSnackbar, setSnackbarMessage, setSnackbarSeverity,user }) => {
    console.log("base",BASE_URL);

    useEffect(()=>{},[userID])
    if(!userID) return <LoadingScreen>
        
    </LoadingScreen>
    const styles = {
        card: {
            width: '50%'
        }
    }

    return <>
                        <BackButton/>
        <div style={{display:'flex',flexWrap:'wrap'}}>

                        <StoreInformationForm BASE_URL={BASE_URL} user={user}  userID={userID} setShowSnackbar={setShowSnackbar} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity} />
                           
                            <SocialMediaReachForm BASE_URL={BASE_URL} user={user} userID={userID} setShowSnackbar={setShowSnackbar} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity} />
            {/* <Grid container spacing={2} padding={2}>
                <Grid item xs={6} md={6} sm={12}>
                    <Item>
                    </Item>
                </Grid>
                <Grid item xs={6} md={6} sm={12}>
                    <Item>
                        <Card>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={6} md={6} sm={12}>
                    <Item>
                        <Card>
                        </Card>
                    </Item>
                </Grid>
            </Grid> */}
        </div >
    </>
}