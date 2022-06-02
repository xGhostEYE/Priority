import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { testToken } from '../service/tokenService';
import * as ROUTES from '../constants/routes';

function Signup({token, setToken}) {
    const [detail, setDetail] = useState({email: "", password: "", passwordConfirm: "",
                                          name: "", studentID: "", school: ""});
    const [err, setErr] = useState(null);

    const history = useHistory();
    const handleSignup = async (event) => {
            event.preventDefault();
            sendRegisterData(detail);
            };

    useEffect(() => {
        document.title = 'Signup - Priori';
        if (token){
            testToken(token.token_string)
            .then(data =>{
                if (data){
                    history.push(ROUTES.DASHBOARD);
                }
            });
        }
    }, []);

    function sendRegisterData(obj){
        var status;
        fetch("/register", {
          method: "POST",
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(obj)
        })
        .then(res => {
            status = res.status;
            console.log(status);
            return res.json();
        })
        .then(data => {
            if(status !== 200){
                console.log(data[0].msg);
                setErr(data[0].msg);
            }
            else{
                console.log("Account created!");
                // redirect to successful page
                let status;
                fetch("/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({email: detail.email, password: detail.password})
                })
                .then(res => {
                    status = res.status
                    return res.json();
                })
                .then(data => {
                    if(status !== 200){
                        console.log(data[0].msg);
                        setDetail({...detail, email:''});
                        setDetail({...detail, password: ''});
                        setDetail({...detail, passwordConfirm: ''});
                        setErr(data[0].msg);
                        localStorage.removeItem("token");
                    }
                    else{
                        // data will be the token upon success
                        console.log("return a token in Login");
                        localStorage.setItem("token", data);
                        setToken(data);
                        history.push(ROUTES.DASHBOARD);
                    }
                })
            }
        })
        
    }

     return (
    <div className="App">
        <div className="App-header">
            <h1 className="header pink">Priori</h1>
            <h1>Start making you a priority</h1>
            <br/>
            {err && <p className="red">{err}</p>} 
            <br/>
            <form onSubmit={handleSignup} method="POST"> 
                <b>Your name?</b>
                    <input 
                        className='App-input'
                        type="text" 
                        placeholder="Enter name" 
                        onChange={(e) => setDetail({...detail, name: e.target.value})}
                        required/>
            
                <b>Your university?</b>
                    <input 
                        className='App-input'
                        type="text" 
                        placeholder="Enter university name" 
                        onChange={(e) => setDetail({...detail, school: e.target.value})}
                        required/>
                
                <b>Your student ID?</b>
                    <input 
                        className='App-input'
                        type="text" 
                        placeholder="Enter your student number" 
                        onChange={(e) => setDetail({...detail, studentID: e.target.value})}
                        required/>

                <b>Your email?</b>
                    <input 
                        className='App-input'
                        type="text" 
                        placeholder="Enter Email"  
                        onChange={(e) => setDetail({...detail, email: e.target.value})}
                        required/>

                <b>Enter a password</b>
                    <input
                        className='App-input'
                        type="password" 
                        placeholder="Enter Password"  
                        onChange={(e) => setDetail({...detail, password: e.target.value})}
                        required/>

                <b>Confirm your password</b>
                    <input 
                        className='App-input'
                        type="password" 
                        placeholder="Enter Password"  
                        onChange={(e) => setDetail({...detail, passwordConfirm: e.target.value})}
                        required/>

                <button className="buttonApp" type="submit">Sign Up</button>
                <div className="login_line"/>
            </form>

            <form className="directing">
            <p type="submit">
                <span>
                    Have an account? 
                    <a className="underline_bold" href={ROUTES.LOGIN}> Log in</a>
                    .
                </span>
            </p>
            </form>
        </div>
    </div>
    );
 }

 export default Signup;