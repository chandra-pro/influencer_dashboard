import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';


import { ProfilePage } from './profile';
import InfluencerProfile from './ProfilePage'
import ProductsList from '../components/ProductsList';

import { NoRoute } from '..';
import axios from 'axios';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  Container,
  Hidden,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import { Logout } from '@mui/icons-material';
import LoadingScreen from '../components/LoadingScreen';


const drawerWidth = 240;

const Dashboard = ({ BASE_URL, setShowSnackbar, setSnackbarMessage, setSnackbarSeverity }) => {
    

  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true);
  const [isapproved,setApproved]=useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
        try {
          var response = await axios.post(`${BASE_URL}/api/influencer/create_session?phone=${authUser.phoneNumber}&uid=${authUser.uid}`)
          var influencer = response.data.user

          // window.sessionStorage
          setUserID(influencer._id)
          if (influencer.isAdmin)
            setIsAdmin(true)
          setLoading(false);
        }
        catch (err) {
          console.log(err);
          //snackbar to show failed !!!
        }
      } else {
        // User is signed out
        setUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [BASE_URL]);
  const logout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setSnackbarMessage('Logged Outsuccessfully');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
      setUserID(null)
    
    }
    catch (err) {
      console.log(err)
      setSnackbarMessage('Something went wrong');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  if (!user) {
    // setSnackbarMessage('Please Login first');
    // setSnackbarSeverity('error');
    // setShowSnackbar(true);
    navigate('/login')
  }
  if (isAdmin) navigate('/admin')

  if (!userID || !user || loading) return <LoadingScreen />

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{
          width: '100%',
          marginLeft: mobileOpen ? drawerWidth : 0,
          transition: 'margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          zIndex: 1000000,
        }}
      >
        <Toolbar>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              style={{
                marginRight: 16,
                display: mobileOpen ? 'none' : 'block',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6">Influencer Dashboard</Typography>
          <div style={{ position: 'absolute', right: '10px', display: 'flex', flexWrap: 'nowrap' }}>

            <Typography variant="h6" style={{ marginTop: '4px' }}>Logout</Typography>
            <IconButton onClick={logout} >
              <Logout color='error' />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Hidden mdUp implementation="js" >
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          style={{ display: mobileOpen ? 'block' : 'none' }}
        >
          <div style={{ width: drawerWidth }}>
            <Sidebar />
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          style={{
            width: drawerWidth,
            flexShrink: 0,
            display: mobileOpen ? 'none' : 'block'
          }}
        >
          <div style={{ width: drawerWidth }}>
            <Sidebar />
          </div>
        </Drawer>
      </Hidden>
      <main
        style={{
          flexGrow: 1,
          padding: 16,
          marginLeft: mobileOpen ? drawerWidth : 0,
        }}
      >
        <div style={{ minHeight: 64 }} />
        <Container>
          <Routes>
            <Route index element={<Typography variant='h4'>Welcome to the Dashboard</Typography>}></Route>
            <Route path="profile/edit" element={<ProfilePage BASE_URL={BASE_URL} userID={userID} isAdmin={isAdmin} user={user} setShowSnackbar={setShowSnackbar} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity} isapproved={isapproved}/>} />
            <Route path='profile' element={<InfluencerProfile BASE_URL={BASE_URL} userID={userID} isAdmin={isAdmin} user={user} isapproved={isapproved}/>}  ></Route>
            
            <Route path='products/'>
              <Route path='list' element={<ProductsList BASE_URL={BASE_URL} userID={userID} isAdmin={isAdmin} user={user} isapproved={isapproved}/>} />
              {/* <Route path='edit/:productId' element={<ProductDetailsPage BASE_URL={BASE_URL} userID={userID} setShowSnackbar={setShowSnackbar} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity} isAdmin={isAdmin} user={user} />} /> */}
              
            </Route >
            <Route path="*" element={<NoRoute />} />
          </Routes>
          
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;