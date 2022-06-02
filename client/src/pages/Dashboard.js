import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ReactLoader from '../components/Loader';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';


const Sidebar = lazy(() => import('../components/Sidebar'));
const Home = lazy(() => import('../components/HomeTab'));
const NotFound = lazy(() => import('./NotFound'));
const Courses = lazy(() => import('../components/CoursesTab'));
const Timer = lazy(() => import('../components/TimerTab'));
const Profile = lazy(() => import('../components/ProfileTab'));


export default function Dashboard({ user, setToken }) {
  //   const { user, setActiveUser } = useUser(loggedInUser);
  const history = useHistory();
  useEffect(() => {
    document.title = 'Dashboard';
    console.log("Current token in Dashboar", user.token_string);
  }, []);

  return (
    <UserContext.Provider value={user.token_string}>
      <div className="bg-gray-background">
        <Router>
          <div className="Dashboard">
            <Sidebar/>
            <div className='tab'>
              <Suspense fallback={<ReactLoader />}>
                <Switch>
                  <Route exact path={ROUTES.DASHBOARD}>
                    <Home/>
                  </Route>
                  <Route exact path={ROUTES.COURSES}>
                    <Courses />
                  </Route>
                  <Route exact path={ROUTES.TIMER}>
                    <Timer />
                  </Route>
                  <Route exact path={ROUTES.PROFILE}>
                    <Profile />
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              </Suspense>
            </div>
          </div>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};
