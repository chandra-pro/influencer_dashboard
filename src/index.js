import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


import Dashboard from './screens/Dashboard';
import Login  from './screens/login';

// import { initializeFirebase } from './firebase';


// Import the functions you need from the SDKs you need

const queryClient = new QueryClient();

 const BASE_URL = "http://localhost:4000"

export const NoRoute = () => {
  return <>
    <div>
      <h3>Are you lost?</h3>
      <p>Aren't we all? but in this case it is because the path was not listed</p>
    </div>
  </>
}




function Root() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


  // useEffect(() => {
  //   console.log("THIS IS BEING RUN")
  //   firebaseConfig();
  // }, [])


  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };


  return (
    <QueryClientProvider client={queryClient}>
      <>
        <BrowserRouter>
          <Routes>
            <Route index path='/login' element={<Login BASE_URL={BASE_URL} setShowSnackbar={setShowSnackbar} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity} />} ></Route>
            <Route path="/*" element={<Dashboard BASE_URL={BASE_URL} setShowSnackbar={setShowSnackbar} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity} />}>
            </Route >
          </Routes >
        </BrowserRouter >
        <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </>
    </QueryClientProvider>
  );
}
const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();