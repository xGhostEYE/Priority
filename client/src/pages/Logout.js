import {useHistory} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function Logout(){
    const history = useHistory();
    localStorage.setItem("token", null);
    console.log("delete token");
    console.log(localStorage.getItem("token"));
    history.push(ROUTES.LANDINGPAGE);
    return null;
}


