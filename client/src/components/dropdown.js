import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 130,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hours, setHours] = React.useState(null);
  const open = Boolean(anchorEl);
  const date = props.name
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    if (event.currentTarget.textContent == "2hr"){

        props.handleNewDate_and_hours(date, 2)}
        
    else if (event.currentTarget.textContent == "3hr"){


       props.handleNewDate_and_hours(date, 3)}    
    
    else if (event.currentTarget.textContent === "4hr"){


       props.handleNewDate_and_hours(date, 4)}

    else if (event.currentTarget.textContent === "5hr"){


       props.handleNewDate_and_hours(date, 5)}    // props.handleNewDate_and_hours(event.currentTarget.value)
  };

  return (
    <div>
      <Button
      sx={{ width: 0.9 }}
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {props.display}
      </Button >
      <StyledMenu
        
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <AccessTimeIcon />
          2hr
        </MenuItem>

        <MenuItem onClick={handleClose} disableRipple>
          <AccessTimeIcon />
          3hr
        </MenuItem>

        <MenuItem onClick={handleClose} disableRipple>
          <AccessTimeIcon />
          4hr
        </MenuItem>

        <MenuItem onClick={handleClose} disableRipple>
          <AccessTimeIcon />
          5hr
        </MenuItem>

      </StyledMenu>
    </div>
  );
}
