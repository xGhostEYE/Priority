import {BsFillPlusSquareFill} from "react-icons/bs"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UserContext from "../../context/user"

import Select, { SelectChangeEvent } from '@mui/material/Select';import React from "react"
// import {Fetching} from "../../service/DummyFetch"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import {getAllDataBaseCourses, deleteCourse, addNewCourse, getAllCourse, setImportance} from '../../service/coursesService'



class PopupTable extends React.Component {

  static contextType = UserContext
  
  state = {
    ActionItemsList: [],

    AllCourses: [] 
  };

  addActionItemToState = (ClassID, Priority) => {
    
    addNewCourse(this.context, ClassID, Priority)
    .then( data => {
      console.log(data)
        if (data === "Successfully added course"){
          alert("Successfully added course");
          let toBeAddedActionItem = {
            ClassID: ClassID,
            Priority: Priority
          };
      
          this.setState(prevState => ({
            ActionItemsList: prevState.ActionItemsList.concat(toBeAddedActionItem)
          }));
          
        }
        else{
          alert("Already in this course")
        }
    })
    
    // let toBeAddedActionItem = {
    //   ClassID: ClassID,
    //   Priority: Priority
    // };

    // this.setState(prevState => ({
    //   ActionItemsList: prevState.ActionItemsList.concat(toBeAddedActionItem)
    // }));
  };
  deleteActionItemFromState = index => {

    const ActionItemsList = [...this.state.ActionItemsList];
    const ID = ActionItemsList[index].ClassID
 
    console.log(ID)
    deleteCourse(this.context, ID)
    .then( data => {
        if (data === "Successfully dropped course"){
          alert("Successfully dropped course")
          ActionItemsList.splice(index, 1);
          this.setState({ ActionItemsList });
        }
        else{
          alert("Fail")
          return;
        }
    })    
  };

  handleNewPriority = (Priority,index) => {
    
    const ActionItemsList = [...this.state.ActionItemsList];
    ActionItemsList[index].Priority = Priority
    this.setState({ActionItemsList})

  }
  

  updateActionItemFromState = (index) =>{
    const ActionItemList = [...this.state.ActionItemsList]
    const item = ActionItemList[index]
    const ID = item.ClassID
    const Priority = item.Priority

    // updateCourse(ID,Priority).then(data)

    setImportance(this.context, ID, Priority)
    .then( data => {
      console.log(data)
        if (data === "Successfully changed importance"){
          alert("Success")
        }
        else{
          alert("Fail")
        }
    })    
  }

  fetchAllCourses(data){
    var arr_courses = []
    data.map((item) => {
        arr_courses.push(item)
    })

    this.setState({
        AllCourses: arr_courses
    })
  }

  fetchRegisteredCourses(data){
    
    let courseInfoCollection = []
    data.map( (item) => {
      let courseInfo = { ClassID: item.courseID, Priority: item.courseImportance
      };
      courseInfoCollection.push(courseInfo)
    })
    this.setState( {ActionItemsList: courseInfoCollection} )
  }
    
  componentDidMount(){
    getAllDataBaseCourses(this.context).then(data => this.fetchAllCourses(data))
    getAllCourse(this.context).then(data => this.fetchRegisteredCourses(data))
  }


  
  render() {
    return (
      <div>
        <ActionItemList
          actionItemsList={this.state.ActionItemsList}
          deleteActionItemFromState={this.deleteActionItemFromState}
          handleNewPriority={this.handleNewPriority}
          updateActionItemFromState={this.updateActionItemFromState}
          allCourses = {this.state.AllCourses}
        />
        <ActionItemPrompt allCourses = {this.state.AllCourses} addActionItemToState={this.addActionItemToState} />
      </div>
    );
  }
}
class ActionItemPrompt extends React.Component {
  state = {
    ClassID: "",
    Priority: "",
    errorClassID: false,
    errorPriority: false
  };

  handleChange = event => {
    // event.persist()
    this.setState(prevState => ({
      ClassID:
        event.target.name === "ClassID"
          ? event.target.value
          : prevState.ClassID,
      Priority:
        event.target.name === "Priority" ? event.target.value : prevState.Priority
    }));
  };
  handleSubmission = event => {
    if (this.state.ClassID === "") {
      this.setState( {errorClassID: true} );
      
      if (this.state.Priority === "") {
        this.setState( {errorPriority: true} );
      }

      return;
    }

    if (this.state.Priority === "") {
      this.setState( {errorPriority: true} );
      
      if (this.state.ClassID === "") {
        this.setState( {errorClassID: true} );
      }
      return;
    }
    
    this.setState( {errorClassID: false, errorPriority: false} );

    event.preventDefault();
    console.log("this is what is sent", this.state.ClassID, this.state.Priority)
    this.props.addActionItemToState(this.state.ClassID, this.state.Priority);
    this.setState(prevState => ({
      ClassID: "",
      Priority: ""
    }));
  };

  render() {
    return (
      <div>
      <FormControl variant="standard" size="small" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Select Course</InputLabel>
        <Select
          id="ClassID"
          name="ClassID"
          value={this.state.ClassID}
          onChange={this.handleChange}
          label="Course"
          error={this.state.errorClassID}
        >
          {this.props.allCourses.map((course) => (
              <MenuItem value={course.courseID}>{course.courseName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" size="small" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Select Priority</InputLabel>
        <Select
          id="Priority"
          name="Priority"
          value={this.state.Priority}
          onChange={this.handleChange}
          label="Priority"
          error={this.state.errorPriority}

        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>

        </Select>
      </FormControl>

        <Button variant="outlined" size="small" endIcon={<BsFillPlusSquareFill />} onClick={this.handleSubmission} >
          ADD
        </Button>
      
      </div>
    );
  }
}

const ActionItemList = props => {
  const emptyList = length => {
    if (length === 0) {
      return (
        <tr style={{ "text-align": "center" }}>
          <td colSpan="3">No Record</td>
        </tr>
      );
    }
  };


  const deleteActionItemFromState = index => () => {
    props.deleteActionItemFromState(index);
  };

  const updateActionItemFromState = index => () => {
    props.updateActionItemFromState (index)
  }

  const handleNewPriority = (Priority,index) => {
    props.handleNewPriority (Priority,index)

  }



  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Sr#</th>
            <th>Course</th>
            <th>Priority</th>
            <th>Delete Course</th>
            <th>Update Priority</th>
          </tr>
        </thead>
        <tbody>
          {emptyList(props.actionItemsList.length)}
          {props.actionItemsList.map((actionItem, i) => (
            <tr key={i + 1}>
              <td>{i + 1}</td>
              <td>
                <FormControl variant="standard" size="small" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-filled-label">Course</InputLabel>
                  <Select
                      labelId="demo-simple-select-readonly-label"
                      id="ClassID"
                      name="ClassID"
                      value={actionItem.ClassID}
                      label="Class"
                      inputProps={{ readOnly: true }}
                  >
                  {props.allCourses.map((course) => (
                    <MenuItem value={course.courseID}>{course.courseName}</MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </td>
              <td>
                <FormControl variant="standard" size="small" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-filled-label">Select New Priority</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={actionItem.Priority}
                    onChange={e => { handleNewPriority(e.target.value,i)} }
                    label="Priority"
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>

                  </Select>
                </FormControl>
              </td>
              <td>
                    <Button variant="outlined" size="small" startIcon={<DeleteIcon />} 
                      onClick={deleteActionItemFromState(i)}>
                      Delete
                    </Button>
              </td>
              <td>
                    <Button variant="contained" size="small" endIcon={<SendIcon />}
                      onClick={updateActionItemFromState(i)}>
                      Confirm Change
                    </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PopupTable;
