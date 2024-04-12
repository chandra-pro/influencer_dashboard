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

    // const handleAuthChange = async (user) => {
    //     console.log("AUTH STATE CHANGED")

    //     if (user) {
    //         console.log("user authenticated", user)
    //         await populateCache(user, navigate)
    //     }
    // }

    // useEffect(() => {
    //     const subscriber = auth.onAuthStateChanged(handleAuthChange);
    //     return subscriber; // unsubscribe on unmount
    // }, [])

    // useEffect(() => {
    //     setCaptcha()
    // }, [])

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

// import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
// import { CgSpinner } from "react-icons/cg";

// import OtpInput from "otp-input-react";
// import { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { auth } from "../firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { toast, Toaster } from "react-hot-toast";

//  const Login = ({ BASE_URL, setShowSnackbar, setSnackbarMessage, setSnackbarSeverity }) => {
//   const [otp, setOtp] = useState("");
//   const [ph, setPh] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);
//   const [user, setUser] = useState(null);

//   function onCaptchVerify() {
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

//   function onSignup() {
//     setLoading(true);
//     onCaptchVerify();

//     const appVerifier = window.recaptchaVerifier;

//     const formatPh = "+" + ph;

//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOTP(true);
//         toast.success("OTP sended successfully!");
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }

//   function onOTPVerify() {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then(async (res) => {
//         console.log(res);
//         setUser(res.user);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }

//   return (
//     <section className="bg-emerald-500 flex items-center justify-center h-screen">
//       <div>
//         <Toaster toastOptions={{ duration: 4000 }} />
//         <div id="recaptcha-container"></div>
//         {user ? (
//           <h2 className="text-center text-white font-medium text-2xl">
//             👍Login Success
//           </h2>
//         ) : (
//           <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
//             <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
//               Welcome to <br /> CODE A PROGRAM
//             </h1>
//             {showOTP ? (
//               <>
//                 <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//                   <BsFillShieldLockFill size={30} />
//                 </div>
//                 <label
//                   htmlFor="otp"
//                   className="font-bold text-xl text-white text-center"
//                 >
//                   Enter your OTP
//                 </label>
//                 <OtpInput
//                   value={otp}
//                   onChange={setOtp}
//                   OTPLength={6}
//                   otpType="number"
//                   disabled={false}
//                   autoFocus
//                   className="opt-container "
//                 ></OtpInput>
//                 <button
//                   onClick={onOTPVerify}
//                   className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                 >
//                   {loading && (
//                     <CgSpinner size={20} className="mt-1 animate-spin" />
//                   )}
//                   <span>Verify OTP</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//                   <BsTelephoneFill size={30} />
//                 </div>
//                 <label
//                   htmlFor=""
//                   className="font-bold text-xl text-white text-center"
//                 >
//                   Verify your phone number
//                 </label>
//                 <PhoneInput country={"in"} value={ph} onChange={setPh} />
//                 <button
//                   onClick={onSignup}
//                   className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                 >
//                   {loading && (
//                     <CgSpinner size={20} className="mt-1 animate-spin" />
//                   )}
//                   <span>Send code via SMS</span>
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Login;
