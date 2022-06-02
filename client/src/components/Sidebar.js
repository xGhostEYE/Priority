import { FaBars } from "react-icons/fa";
import { AiOutlineClose, AiOutlineLogout, AiFillHome, AiFillBook, AiFillClockCircle, AiFillProfile } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as ROUTES from "../constants/routes";
import {logout} from '../service/tokenService';

function Sidebar() {
  const Sidebardata = [
    {
      title: "Home",
      path: ROUTES.DASHBOARD,
      icon: <AiFillHome />,
      classname: "nav-text"
    },
    {
      title: "Courses",
      path: ROUTES.COURSES,
      icon: <AiFillBook />,
      classname: "nav-text"
    },
    {
      title: "Timer",
      path: ROUTES.TIMER,
      icon: <AiFillClockCircle />,
      classname: "nav-text"
    },
    {
      title: "Profile",
      path: ROUTES.PROFILE,
      icon: <AiFillProfile />,
      classname: "nav-text"
    },
  ];

  const [sidebar, setSideBar] = useState(false);
  const showSidebar = () => setSideBar(!sidebar);
  return (
    <div className="sidebar">
      <div>
        <Link to="#" className="menu-bars">
          <FaBars onClick={showSidebar} />
        </Link>
      </div>
      <div className={sidebar ? "nav-menu active" : 'nav-menu'}>
        <div className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bar">
              <AiOutlineClose />
            </Link>
          </li>
          {Sidebardata.map((item, index) => {
            return (
              <li key={index} className={item.classname}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
            <li className="nav-text">
                <a onClick={logout}>
                  <AiOutlineLogout/>
                  <span>Log out</span>
                </a>
            </li>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;
