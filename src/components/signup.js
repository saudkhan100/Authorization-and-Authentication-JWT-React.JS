import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './signup.css';

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [showFieldErrors, setShowFieldErrors] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password) {
      setSignupError('All fields are required.');
      setShowFieldErrors(true);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSignupError('Invalid email format.');
      setShowFieldErrors(true);
      return;
    }

    if (password.length < 8 || password.includes(' ')) {
      setSignupError('Password must be at least 8 characters and should not contain spaces.');
      setShowFieldErrors(true);
      return;
    }

    setIsSuccess(false);
    setSignupError('');
    setShowFieldErrors(false);

    try {
      await axios.post('http://localhost:5000/user/signup', {
        firstname,
        lastname,
        email,
        password,
      });
      setIsSuccess(true);
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      window.location.replace('/');
    } catch (error) {
      setSignupError('Email may already be taken.');
    }
  };

  useEffect(() => {
    if (signupError) {
      setTimeout(() => {
        setSignupError('');
      }, 9000);
    }
  }, [signupError]);

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">
            First Name{showFieldErrors && !firstname && <span className="required-field-label">*</span>}
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label htmlFor="lastname">
            Last Name{showFieldErrors && !lastname && <span className="required-field-label">*</span>}
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label htmlFor="email">
            Email{showFieldErrors && (!email || !/\S+@\S+\.\S+/.test(email)) && <span className="required-field-label">*</span>}
          </label>
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">
            Password{showFieldErrors && (!password || password.length < 8 || password.includes(' ')) && <span className="required-field-label">*</span>}
          </label>
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-container">
            <button type="submit" className="signup-button">
              Signup
            </button>
          </div>
        </form>
        {isSuccess && <p className="success-message">Signup successful!</p>}
        {signupError && <p className="error-message">{signupError}</p>}
      </div>
    </div>
  );
};

export default Signup;











// // client/src/components/Signup.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './signup.css';

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/user/signup', {
//         username,
//         password,
//       });
//       console.log('Signup successful');
//     } catch (error) {
//       console.error('Signup failed:', error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
