// client/src/App.js
import React from 'react';

import { Route , Routes } from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import EditPassword from './components/edituser';
import Header from './components/header/header';

const App = () => {
  return (
 
      <div>
        <Header/>
       
        <Routes>
          <Route  path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/editpassword" element={<EditPassword/>} />
        </Routes>
      </div>
  
  );
};

export default App;

// import React from 'react';
// import { GoogleLogin } from 'react-google-login';
// import axios from 'axios';

// const App = () => {
//   const handleGoogleSuccess = async (response) => {
//     const idToken = response.tokenId;
//     try {
//       const googleResponse = await axios.post(
//         'http://localhost:5000/user/google-login',
//         { idToken }
//       );

//       localStorage.setItem('token', googleResponse.data.token);
//       window.location.replace('/');
//     } catch (error) {
//       console.error('Google login error:', error);
//     }
//   };

//   const handleGoogleFailure = (error) => {
//     console.error('Error logging in with Google', error);
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <GoogleLogin
//         clientId="295429429953-j8ep3ug572q1604m5jis644sbbpuc55d.apps.googleusercontent.com"
//         buttonText="Login with Google"
//         onSuccess={handleGoogleSuccess}
//         onFailure={handleGoogleFailure}
//         cookiePolicy={'single_host_origin'}
//       />
//     </div>

    
//   );
// };

// export default App;

