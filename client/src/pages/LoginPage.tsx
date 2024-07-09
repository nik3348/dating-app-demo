import React from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router";
import { isLoggedIn } from "../utils/jwt-utils";

const LoginPage = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    const data = await response.json();
    if (response.ok) {
      Cookies.set('token', data.token, { expires: 1 });
      navigate("/dashboard")
    } else {
      console.log('Login failed');
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{
        border: '1px solid black',
        borderRadius: '10px',
        width: '800px',
        height: '600px',
        display: 'flex',
      }}>
        <img src="https://via.placeholder.com/400" alt="logo" style={{ width: '400px', height: '600px', objectFit: 'cover' }} />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          padding: '20px',
        }}>
          <h1>Login</h1>
          <p style={{
            margin: '0'
          }}>Username</p>
          <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }}></input>
          <p style={{
            margin: '10px 0 0'
          }}>Password</p>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
          <button style={{
            margin: '10px 0 0'
          }}
            onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
