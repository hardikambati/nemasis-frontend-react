import Cookies from 'universal-cookie';
import React, { useState } from 'react';
import { NavLink, Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Switch,
  } from 'react-router-dom';
import axios from 'axios';
  

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // create cookie instance
    const cookie = new Cookies();

    function submitForm(e) {
      e.preventDefault();

      if(!email || !password) {
        alert('All fields are mandatory!');
        return;
      }
      
      const data = {
          "username": email,
          "password": password
      }

      setLoading(true);

      axios
        .post('http://127.0.0.1:8000/api/token/', data)
        .then(response => {
          if(response.data.access) {
            setEmail('');
            setPassword('');
            cookie.set('JWT-token', response.data.access, {path: '/'})
            setLoading(false);
            window.location.reload();
            window.location.replace('/');
          } else {
            alert('Invalid Credentials');
            setLoading(false);
            return;
          }
        })
        .catch(error => {
          setLoading(false);
          alert('Invalid Credentials');
        })
    }

    return (
        <div className="register-main">
        <div className="col-md-3 col-sm-12">
          <FormGroup>
            <Label className="mt-5">
              <h3>Login</h3>
            </Label>
          </FormGroup>
          <div className="text-left">
            <FormGroup>
              <Label for="loginUser">Email</Label>
              <Input
                tabIndex={1}
                type="text"
                id="loginUser"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </FormGroup>
            <FormGroup className="text-left">
              <Label for="loginPassword">Password</Label>
              <Input
                tabIndex={2}
                type="password"
                id="loginPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </FormGroup>
  
            {/* <FormGroup className="text-center">
              <StatusMessage
              loading={loading}
              success={success}
              status={status}
              />
            </FormGroup> */}
            <FormGroup className="text-center col-12 d-flex flex flex-column align-items-center">
              <Button
                tabIndex={3}
                color="primary"
                className="col-md-6 col-sm-12 mt-3"
                onClick={submitForm}
                disabled={loading}
                >Submit
              </Button>
              <NavLink id="login-link">
                <Link to="/register">Sign-Up</Link>
              </NavLink>
            </FormGroup>
          </div>
        </div>
        </div>
    );
}