import { useEffect, useState } from "react"

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField, Button, Checkbox } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";

import { auth } from "../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const styles = {
    formInput: {
        minWidth: "100%",
    }
}




// function onCaptchVerify() {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth,
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response) => {
//             onSignup();
//           },
//           "expired-callback": () => {},
//         }
//       );
//     }
//   }

const GetPhone = ({ setStage, setShowSnackbar, setSnackbarMessage, setSnackbarSeverity, phone, setPhone, countryCode, setCountryCode }) => {

    useEffect(() => { }, [phone, countryCode])
    // useEffect(() => {
    //     setCaptcha()
    // }, [])
    const setCaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth,
              "recaptcha-container",
              {
                size: "invisible",
                callback: (response) => {
                  
                },
                "expired-callback": () => {},
              }
            );
          }
    }


    const handleSubmit = () => {
        setCaptcha();

        const phoneNumber = countryCode + phone
        const appVerifier = window.recaptchaVerifier;

        setStage(1)
        setSnackbarMessage('OTP Sent');
        setSnackbarSeverity('success');
        setShowSnackbar(true);
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                setSnackbarMessage(error.message, '- Please Try again after few minutes');
                setSnackbarSeverity('error');
                setShowSnackbar(true);
                setStage(0);
                // window.location.reload()

            });

    }
   

    return <>
        <h3>Login</h3>
       
        <TextField
            name="c-code"
            label="Country Code"
            variant="outlined"
            type="text"
            style={styles.formInput}
            value={countryCode}
            onChange={(val) => setCountryCode(val.target.value)}
        />
        <TextField
            id="storeName"
            name="phone"
            label="Phone Number"
            variant="outlined"
            type="tel"
            style={styles.formInput}
            value={phone}
            onChange={(val) => setPhone(val.target.value)}
        />

        <Box m={2} align="center">
            <Button variant="contained" onClick={handleSubmit}>
                Send OTP
            </Button>
        </Box >
    </>
}

const GetOtp = ({ setShowSnackbar, setSnackbarMessage, setSnackbarSeverity, phone, setStage }) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    const [count, setCount] = useState(30);
    const [resendDisabled, setresendDisabled] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const verifyOtp = () => {

        window.confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log("otp verified", user)
            setSnackbarMessage('Login Successfull');
            setSnackbarSeverity('success');
            setShowSnackbar(true);
            navigate('/')

            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            setSnackbarMessage('Wrong Verification code');
            setSnackbarSeverity('error');
            setShowSnackbar(true);
        });

    }

    const resendOTP = () => {
        const phoneNumber = "+91" + phone
        const appVerifier = window.recaptchaVerifier;

        setSnackbarMessage('OTP Sent');
        setSnackbarSeverity('success');
        setShowSnackbar(true);
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setCount(60);
                // ...
            }).catch((error) => {
                setSnackbarMessage(error.message, '- Please Try again after few minutes');
                setSnackbarSeverity('error');
                setShowSnackbar(true);
            })
    }

    return <>
        <h3>Login</h3>
        <h3>Otp has been sent to {phone} </h3>
        <TextField
            id="otp"
            name="otp"
            label="OTP"
            variant="outlined"
            type="number"
            style={styles.formInput}
            value={otp}
            onChange={(val) => setOtp(val.target.value)}
        />

        < Box m={2} align="center" >
            <Button variant="contained" onClick={verifyOtp}>
                Verify OTP
            </Button>
        </Box>
        <hr />
        {count > 0 && <h5>wait {count}s to resend OTP</h5>}.
        < Box m={2} align="center" >
            <Button variant="outlined" disabled={count > 0} onClick={resendOTP}>
                Resend OTP
            </Button>
        </Box>


    </>
}

 const Login = ({ BASE_URL, setShowSnackbar, setSnackbarMessage, setSnackbarSeverity }) => {
    const [stage, setStage] = useState(0)

    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState("+91");

 

    const populateCache = async (user, navigate) => {

        // call 
        //moved to dashboard :-)
        setSnackbarMessage('Login Successfull');
        setSnackbarSeverity('success');
        setShowSnackbar(true);
        navigate("/")
    }

    return <>
        <Grid container spacing={2} padding={2} direction="row"
            alignItems="center"
            justifyContent="center">
            <Grid item xs={12} md={3}>
            <div id="recaptcha-container"></div>
                <Item>
                    <Box p={2} align='left'>
                        {stage === 0 ? <GetPhone setCountryCode={setCountryCode} countryCode={countryCode} setStage={setStage} setShowSnackbar={setShowSnackbar} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity} phone={phone} setPhone={setPhone} /> : <GetOtp setShowSnackbar={setShowSnackbar} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity} phone={phone} setPhone={setPhone} setStage={setStage} />}
                    </Box>
                </Item>
            </Grid>
        </Grid>
    </>
}
export default Login;


