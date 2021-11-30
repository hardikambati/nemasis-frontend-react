import Cookies from 'universal-cookie';
import { useEffect, useState } from "react";
import { NavLink, Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';

export default function UserDetail() {

    const [email, setEmail] = useState('');
    const [isSuperuser, setIsSuperuser] = useState('False');
    const [isStaff, setIsStaff] = useState('False');
    const [isActive, setIsActive] = useState('False');
    const [dateJoined, setDateJoined] = useState('');
    const [address, setAddress] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    // create cookie instance
    const cookie = new Cookies();

    useEffect(() => {
        const auth = {headers: {
            "Authorization":  'Bearer ' + cookie.get('JWT-token')
        }}

        axios
        .get('http://127.0.0.1:8000/user-details/', auth)
        .then(response => {
          if(response.data.email) {
            setEmail(response.data.email);
            if(response.data.is_superuser) {
                setIsSuperuser('True');
            }
            if(response.data.is_staff) {
                setIsStaff('True');
            }
            if(response.data.isActive) {
                setIsActive('True');
            }
            setDateJoined(response.data.date_joined);
            setAddress(response.data.address);
            console.log(response.data);
          } else {
                alert('Invalid Credentials');
            return;
          }
        })
        .catch(error => {
          alert('Error Fetching Data');
        })
    }, [[]]);

    function updateAddress(e) {
        e.preventDefault();

        if(!setEditAddress) {
            alert('Make Changes to address to update it!');
            return;
        }

        const data = {
            "address": editAddress
        }

        const auth = {headers: {
            "Authorization":  'Bearer ' + cookie.get('JWT-token')
        }}

        setLoading(true);

        axios
            .put('http://127.0.0.1:8000/user-details/', data, auth)
            .then(response => {
                setMsg('Address Saved Successfully!');
                setTimeout(function() {setMsg('')}, 3000);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                alert(error);
            });
    }

    return (
        <div className="userdetail-main">
            <div class="card" style={{"boxShadow": "0px 10px 40px 0px rgba(0,0,0,0.2)"}}>
            <div class="card-body">
                <h5 class="card-title">USER DETAILS</h5>
                
                <div id="userdetails-data-main">
                    <div id="ud-inner-data">
                        <div>Email</div>
                        <div>{email}</div>
                    </div>
                    <hr />

                    <div id="ud-inner-data">
                        <div>Date Joined</div>
                        <div>{dateJoined}</div>
                    </div>
                    <hr />


                    <div id="ud-inner-data">
                        <div>Is Active</div>
                        <div>{isActive}</div>
                    </div>
                    <hr />

                    <div id="ud-inner-data">
                        <div>Is Staff</div>
                        <div>{isStaff}</div>
                    </div>
                    <hr />

                    <div id="ud-inner-data">
                        <div>Is Superuser</div>
                        <div>{isSuperuser}</div>
                    </div>
                    <hr />

                    <div id="ud-inner-data">
                        <div>Address</div>
                        <Input
                            tabIndex={2}
                            type="text"
                            id="ud-input"
                            defaultValue={address}
                            onChange={(e) => setEditAddress(e.target.value)}
                        />
                    </div>
                    
                    <div id="ud-inner-data">
                        {msg ?
                            <div id="msg">{msg}</div>
                            :
                            <div></div>
                        }
                        <Button
                            tabIndex={3}
                            color="primary"
                            className="col-md-2 col-sm-10 mt-5"
                            onClick={updateAddress}
                            disabled={loading}
                            >{loading ? <div>Saving...</div>:<div>Save</div>}
                        </Button>
                    </div>

                    <div id="empty">

                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}