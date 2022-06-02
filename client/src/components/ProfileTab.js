import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user';
import Alert from '@mui/material/Alert';
import { getProfile, updateProfile, updatePass } from '../service/profileService';


export default function Profile() {
    const [detail, setDetail] = useState({ email: "", name: "", studentID: "", school: "" });
    const [pass, setPass] = useState({ curPass: "", newPass: "", confirmNewPass: "" });
    const [detailErr, setDetailErr] = useState({ result: null, msg: null });
    const [passErr, setPassErr] = useState({result: null, msg: null});
    const token = useContext(UserContext);

    const history = useHistory();
    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        updateProfile(token, detail).then(data => {
            console.log(data);
            setDetailErr(data);
        })
    };

    const handleUpdatePass = async (event) => {
        event.preventDefault();
        updatePass(token, pass).then(data => {
            setPassErr(data);
        })
    };

    useEffect(() => {
        document.title = 'Profile';
        getProfile(token).then(data => {
            setDetail(data);
        })
    }, []);


    return (
        <div className="profileTab">
                <div className="App-header">
                    <h1 className='App-title'>Profile</h1>
                    <br />
                    {detailErr.result !== null &&
                        <Alert 
                        severity={detailErr.result ? "success" : "error"}
                        sx={{
                            width: 1,
                          }}>
                            <strong>{detailErr.result ? "Profile updated" : detailErr.msg}</strong>
                        </Alert>
                    }
                    <br />
                    <form onSubmit={handleUpdateProfile}>
                        <b>Your name</b>
                        <input
                            className='App-input'
                            type="text"
                            placeholder="Enter name"
                            value={detail.name}
                            onChange={(e) => setDetail({ ...detail, name: e.target.value })}
                            required />

                        <b>Your university</b>
                        <input
                            className='App-input'
                            type="text"
                            placeholder="Enter university name"
                            value={detail.school}
                            onChange={(e) => setDetail({ ...detail, school: e.target.value })}
                            required />

                        <b>Your student ID</b>
                        <input
                            className='App-input'
                            type="text"
                            placeholder="Enter your student number"
                            value={detail.studentID}
                            onChange={(e) => setDetail({ ...detail, studentID: e.target.value })}
                            required />

                        <b>Your email</b>
                        <input
                            className='App-input'
                            type="email"
                            placeholder="Enter Email"
                            value={detail.email}
                            onChange={(e) => setDetail({ ...detail, email: e.target.value })}
                            required />
                        <button className="buttonApp" type="submit">Update</button>
                    </form>
            </div>
                <div className="App-header">
                    <h1 className='App-title'>Change Password</h1>
                    <br />
                    {passErr.result !== null &&
                        <Alert severity={passErr.result ? "success" : "error"}>
                            <strong>{passErr.result ? "Password updated" : passErr.msg}</strong>
                        </Alert>
                    }
                    <br />
                    <form onSubmit={handleUpdatePass}>
                        <b>Current Password</b>
                        <input
                            className='App-input'
                            type="password"
                            placeholder="Enter Current Password"
                            onChange={(e) => setPass({ ...pass, curPass: e.target.value })}
                            required />

                        <b>New Password</b>
                        <input
                            className='App-input'
                            type="password"
                            placeholder="Enter New Password"
                            onChange={(e) => setPass({ ...pass, newPass: e.target.value })}
                            required />

                        <b>Confirm New Password</b>
                        <input
                            className='App-input'
                            type="password"
                            placeholder="Confirm New Password"
                            onChange={(e) => setPass({ ...pass, confirmNewPass: e.target.value })}
                            required />
                        <button className="buttonApp" type="submit">Update</button>
                    </form>
                </div>
        </div>
    );
}