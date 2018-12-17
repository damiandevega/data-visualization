import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShowChart from '@material-ui/icons/ShowChart';
import TableChart from '@material-ui/icons/TableChart';

import test_data from '../../test_data/test_data.json';

// import GridDisplay from '../GridDisplay';
import SimpleGridDisplay from '../SimpleGridDisplay';
import Chart from '../Chart';

const styles = theme => ({
    container: {

    },
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
    },
    button: {
        marginLeft: '20px',
        color: 'gray',
        textTransform: 'none'
        // marginBottom: '20px'
    }
});

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            line: '',
            lines: null,
            times: [],
            values: [],
            name: '',
            labelWidth: 0,
            navValue: 0,
            toggleOptions: false,
            checkedA: false,
            checkedB: false,
            checkedC: false,
            checkedD: false,
            checkedE: false,
            checkedF: false
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
        if (event.target.value) {
            let name = event.target.value;
            let lines = this.state.lines;
            let times = [];
            let values = [];

            for (var i = 0; i < lines.length; i++) {
                if (name === lines[i].name) {
                    for (var j = 0; j < lines[i].times.length; j++) {
                        times.push(lines[i].times[j]);
                    }
                    for (var k = 0; k < lines[i].values.length; k++) {
                        values.push(lines[i].values[k]);
                    }
                }
            }
    
            this.setState({ 
                [event.target.name]: event.target.value,
                times: times,
                values: values
            });
        } 
    };

    handleToggle = event => {
        let toggle = this.state.toggleOptions;
        this.setState({ toggleOptions: !toggle })
    }

    handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked });
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

        let options;
        this.state.toggleOptions ? options = (
        <FormGroup row style={{ marginLeft: '20px', marginTop: '5px' }}>
            <FormControlLabel
            control={
                <Checkbox
                checked={this.state.checkedA}
                onChange={this.handleCheckboxChange('checkedA')}
                value="checkedA"
                color="primary"
                />
            }
            label="Retail"
            />
            <FormControlLabel
            control={
                <Checkbox
                checked={this.state.checkedB}
                onChange={this.handleCheckboxChange('checkedB')}
                value="checkedB"
                color="primary"
                />
            }
            label="Technology"
            />
            <FormControlLabel
            control={
                <Checkbox
                checked={this.state.checkedC}
                onChange={this.handleCheckboxChange('checkedC')}
                value="checkedC"
                color="primary"
                />
            }
            label="Services"
            />
            <FormControlLabel
            control={
                <Checkbox
                checked={this.state.checkedD}
                onChange={this.handleCheckboxChange('checkedD')}
                value="checkedD"
                color="primary"
                />
            }
            label="Food"
            />
            <FormControlLabel
            control={
                <Checkbox
                checked={this.state.checkedE}
                onChange={this.handleCheckboxChange('checkedE')}
                value="checkedE"
                color="primary"
                />
            }
            label="Education"
            />
            <FormControlLabel
            control={
                <Checkbox
                checked={this.state.checkedF}
                onChange={this.handleCheckboxChange('checkedF')}
                value="checkedF"
                color="primary"
                />
            }
            label="Security"
            />
        </FormGroup>
        ) : options = null;

        let chartOrGrid;
        this.state.navValue === 0 ? 
            this.state.line !== '' ? chartOrGrid = (
                <div style={{ margin: "20px" }}>
                    <Chart 
                        line={this.state.line} 
                        lines={this.state.lines}
                        times={this.state.times}
                        values={this.state.values}
                    />
                </div>
            ) : chartOrGrid = (<h2 style={{ color: 'orange', margin: '20px' }}>No line selected</h2>)
            : chartOrGrid = (
                <div style={{ margin: "20px" }}>
                    <SimpleGridDisplay 
                        line={this.state.line} 
                        lines={this.state.lines} 
                        style={{ margin: '20px' }} 
                    />
                </div>
            )

        return (
            <div>
                <div className={classes.container}>
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
                    
                    <Button 
                        variant="outlined" 
                        className={classes.button}
                        onClick={this.handleToggle}
                    >
                        Toggle Options
                    </Button>
                    {options}
                </div>

                {chartOrGrid}

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