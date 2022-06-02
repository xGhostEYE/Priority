import React from "react"
import "../../App.css"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


function Entry (props) {
    const [Class, setClass] = React.useState(props.Class);
    const [Priority, setPriority] = React.useState(props.Priority);
    const Index = props.Index;

    const handleClassChange = (option) => {
        setClass(option);
    };

    const handlePriorityChange = (option) => {
        setPriority(option);
    };

    const deleteActionItemFromState = () => {
      props.deleteActionItemFromState(Index);
    };

    const updateActionItemFromState = () => {
      props.updateActionItemFromState(Index,Class,Priority);
    };

    return (
    <tr>
        <td>
            <Dropdown
                label="CHOOSE CLASSES"
                options={[
                    { label: 'CMPT 370', value: 'CMPT 370' },
                    { label: 'CMPT 317', value: 'CMPT 317' },
                    { label: 'CMPT IDK', value: 'CMPT IDK' },
                ]}
                value={Class}
                placeholder = "Select Class"
                onChange={handleClassChange}
            /> 
                    
        </td>
        <td>
            <Dropdown
                label="CHOOSE PRIORITY"
                options={[
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                ]}
                value={Priority}
                
                onChange={handlePriorityChange}
                />
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteActionItemFromState}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <button
            type="button"
            className="btn btn-success"
            // onClick={updateActionItemFromState}
          >
            <span aria-hidden="true">&#10003;</span>
          </button>
        </td>
        <td>

        </td>
  </tr>
    );
  };

export default Entry;