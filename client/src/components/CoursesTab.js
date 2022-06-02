import { useState, useEffect, useContext } from "react";
import Piechart from "./Courses/Piechart";
import NewTable from "./Courses/NewTable";
import PopupTable from "./Courses/PopupTable";
import Popup from "./Courses/Popup";
import { FiSettings } from "react-icons/fi";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import {getDataCoursesTab, getAllTasks } from "../service/coursesService";
import UserContext from "../context/user";

function Courses() {
    const [display, setDisplay] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const token = useContext(UserContext);
    const [courses, setCourses] = useState(null);
    const [coursesData, setCoursesData] = useState(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        updateData();
    }, []);

    useEffect( () =>{
        updateData();
    },[isOpen]);

    function updateData(){
        getDataCoursesTab(token).then(data => {
            setCourses(data.courses);
            setCoursesData(data.coursesData);
        });
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        updateData();
    };

    function change() {
        setDisplay(!display);
    }
    function togglePopup() {
        setIsOpen(!isOpen);
    }

    if (!coursesData || !courses) {
        return <>Still loading...</>;
    }

    return (
        <div className="tabComponent">
            <button onClick={change} className="buttonApp">Switch</button>
            {/* <Box sx={{ width: '100%', typography: 'body1' }}> */}
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            {courses.map((item, index) => {
                                return (
                                    <Tab label={item.courseName} value={index} />
                                )
                            })}
                        </TabList>
                    </Box>
                    <Tab label={ <div> <FiSettings size={25}/> </div> } onClick={togglePopup}/>
                    {courses.map((item, index) => {
                        return (
                            <TabPanel value={index} sx={{ width: '100%', height: '100%' }}>
                                {/* {display ? <Piechart tasks={coursesData[index]} /> : <Table tasks={coursesData[index]} />} */}
                                {display ? <Piechart tasks={coursesData[index]} /> : <NewTable tasks={coursesData[index]}/>}
                            </TabPanel>            
                        )
                    })}

                                        
                </TabContext>
        

            {isOpen && <Popup
                content={<> 
                <PopupTable/>
                </>}
                handleClose={togglePopup}
            />}
            {/* </Box> */}
        </div>
    )
}

export default Courses;


