import {Component} from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" size={300} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
        <h1>dncdncd</h1>
        <Typography variant="caption" component="div" color="text.secondary">
          {`${props.timeleft}`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired
};


let intervalId;
export default class CircularStatic extends Component {
  constructor(props) {
    super(props);
    this.maxValue = 10;
    this.state = {
      seconds: props.secondSpent,
      buttonText: "Start progress",
      inProgress: false
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.timer = this.timer.bind(this);
  }

  formatTime(value) {
    return new Date(value * 1000).toISOString().substr(11, 8);
  }

  statusFormat(value) {
    return `Loading: ${value * 100}%`;
  }

  timer() {
    const state = {
      seconds: this.state.seconds + 1
    };

    if (state.seconds === this.maxValue) {
      state.buttonText = "Restart progress";
      state.inProgress = !this.state.inProgress;
      clearInterval(intervalId);
    }

    this.setState(state);
  }

  onButtonClick() {
    const state = {
      inProgress: !this.state.inProgress
    };

    if (this.state.inProgress) {
      state.buttonText = "Continue progress";
      clearInterval(intervalId);
    } else {
      state.buttonText = "Stop progress";

      if (this.state.seconds === this.maxValue) {
        state.seconds = 0;
      }

      intervalId = setInterval(() => this.timer(), 1000);
    }

    this.setState(state);
  }

  render() {
    return (
      <div>
        <button id="button" className="buttonApp" onClick={this.onButtonClick}>
          {this.state.buttonText}
        </button>
        <CircularProgressWithLabel
          value={(this.state.seconds / this.maxValue) * 100}
          timeleft={this.formatTime(this.maxValue-this.state.seconds)}
        />
      </div>
    );
  }
}
