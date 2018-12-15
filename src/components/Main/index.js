import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShowChart from '@material-ui/icons/ShowChart';
import TableChart from '@material-ui/icons/TableChart';

import test_data from '../../test_data/test_data.json';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: '20px',
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    bottomNav: {
        margin: '5px',
        float: 'left'
    }
});

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            line: '',
            lines: null,
            name: '',
            labelWidth: 0,
            navValue: 0
        }
    }

    componentDidMount() {
    
        // This is where xhr would be made to api for data
        // Instead using test_data object from test_data.json
        
        this.setState({
            lines: test_data.lines,
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleNavChange = (event, value) => {
        this.setState({ navValue: value });
    }

    render() {
        const { classes } = this.props;
        const { navValue } = this.state;

        let lineOptions;
        this.state.lines !== null ? lineOptions = (
            this.state.lines.map(line => (
                <MenuItem key={line.id} id={line.id} value={line.name}>{line.name}</MenuItem>
            ))
        ) : lineOptions = null;

        let selectedLine;
        this.state.line !== '' ? selectedLine = (
            <h2>{this.state.line}</h2>
        ) : selectedLine = null;

        return (
            <div>
                <form className={classes.root} autoComplete="off">
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                        this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-line-simple"
                    >
                        Select Line
                    </InputLabel>
                    <Select
                        value={this.state.line}
                        onChange={this.handleChange}
                        input={
                        <OutlinedInput
                            labelWidth={this.state.labelWidth}
                            name="line"
                            id="outlined-line-simple"
                        />
                        }
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        {lineOptions}
                    </Select>
                    </FormControl>
                </form>
                <h1>Options Toggle</h1>
                <h1>Chart or Grid</h1>
                {selectedLine}

                <BottomNavigation
                    value={navValue}
                    onChange={this.handleNavChange}
                    showLabels
                    className={classes.bottomNav}
                >
                    <BottomNavigationAction label="Chart" icon={<ShowChart />} />
                    <BottomNavigationAction label="Grid" icon={<TableChart />} />
                </BottomNavigation>

            </div>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);