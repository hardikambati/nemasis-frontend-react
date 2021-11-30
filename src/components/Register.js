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
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    function submitForm(e) {
        e.preventDefault();

        if(!email || !address || !password || !confirmPassword) {
          alert('All fields are mandatory!');
          return;
        }

        if(password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        
        const data = {
            "username": email,
            "email": email,
            "address": address,
            "password": password
        }

        setLoading(true);

        axios
          .post('http://127.0.0.1:8000/signup/', data)
          .then(response => {
            if(response.data === 'success') {
              console.log(response.data);
              setEmail('');
              setAddress('');
              setPassword('');
              setConfirmPassword('');
              setLoading(false);
              window.location.replace('/login');
            } else {
              alert(response.data);
              setLoading(false);
              return;
            }
          })
          .catch(error => {
            setLoading(false);
            alert(error);
          })
    }

    return (
        <div className="register-main">
        <div className="col-md-3 col-sm-12">
          <FormGroup>
            <Label className="mt-5">
              <h3>Sign Up</h3>
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
            <FormGroup>
              <Label for="loginUser">Address</Label>
              <Input
                tabIndex={1}
                type="text"
                id="loginUser"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
            <FormGroup className="text-left">
              <Label for="loginPassword">Confirm Password</Label>
              <Input
                tabIndex={2}
                type="password"
                id="loginPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                >{loading ? <>Submitting...</> : <>Submit</>}
              </Button>
              <NavLink id="login-link">
                <Link to="/login">Login</Link>
              </NavLink>
            </FormGroup>
          </div>
        </div>
        </div>
    );
}