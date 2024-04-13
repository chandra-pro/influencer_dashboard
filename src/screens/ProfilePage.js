import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Button,
  Link,
  ThemeProvider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import StoreIcon from '@mui/icons-material/Store';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007acc',
    },
    secondary: {
      main: '#ff9100',
    },
  },
});

const styles = {
  container: {
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '10px 20px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  content: {
    padding: '20px',
  },
  section: {
    marginBottom: '20px',
  },
  icon: {
    fontSize: '24px',
    marginRight: '10px',
    verticalAlign: 'middle',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
};

const SellerProfile = ({ BASE_URL, userID, isapproved }) => {
  const [profileData, setProfileData] = useState({});
  const [approved, setApproved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const influencerInfoResponse = await axios.get(`${BASE_URL}/api/influencer/getInfluencerInfo/${userID}`);
        const socialMediaResponse = await axios.get(`${BASE_URL}/api/influencer/getSocialMedia/${userID}`);

        const influencerInfo = influencerInfoResponse.data;
        const socialMedia = socialMediaResponse.data;

        const Data = {
          name: influencerInfo.name || '',
          phoneNumber: influencerInfo.phoneNumber || '',
          email: influencerInfo.email || '',
          address: influencerInfo.address || '',
          twitter: socialMedia.twitter || '',
          facebook: socialMedia.facebook || '',
          instagram: socialMedia.instagram || '',
        };

        setProfileData(Data);
        setApproved(influencerInfo.isProfileApproved);
        isapproved(approved);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        return null;
      }
    };

    fetchData();
  }, [BASE_URL, userID, isapproved, approved]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm"> 
        <Paper elevation={3} style={styles.container}>
          <Typography variant="h5" style={styles.heading}>
            <StoreIcon style={styles.icon} />
            Influencer Profile
          </Typography>
          <Box style={styles.content}>
            <div style={styles.section}>
              <Typography variant="h6">
                <StoreIcon style={styles.icon} />
                Influencer Information
                <Box
                  sx={{
                    border: 1,
                    borderColor: approved ? 'success.main' : 'error.main',
                    backgroundColor: approved ? 'success.main' : 'error.main',
                    padding: 1,
                    textAlign: 'center',
                    width: 150,
                    height: 50,
                    margin: 3,
                  }}
                >
                  <Typography variant="h6">
                    {approved ? 'Approved' : 'Not approved'}
                  </Typography>
                </Box>
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    <StoreIcon style={styles.icon} />
                    Name: {profileData.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    <PhoneIcon style={styles.icon} />
                    Phone Number: {profileData.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <EmailIcon style={styles.icon} />
                    Email: {profileData.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <LocationOnIcon style={styles.icon} />
                    Address: {profileData.address}
                  </Typography>
                </Grid>
              </Grid>
            </div>

            <div style={styles.section}>
              <Typography variant="h6">
                <TwitterIcon style={styles.icon} />
                Social Media Information
              </Typography>
              <Box style={styles.socialIcons}>
                <Link href={profileData.twitter}>
                  <Button variant="contained" color="primary">
                    Twitter
                  </Button>
                </Link>
                <Link href={profileData.facebook}>
                  <Button variant="contained" color="primary">
                    Facebook
                  </Button>
                </Link>
                <Link href={profileData.instagram}>
                  <Button variant="contained" color="primary">
                    Instagram
                  </Button>
                </Link>
              </Box>
            </div>
            <Button onClick={() => navigate('edit')}>
              <EditIcon />
              Edit
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SellerProfile;
