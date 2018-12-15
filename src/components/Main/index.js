import React, { Component } from 'react';

import Select from '../Utils/Select';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            line: null
        }
    }

    render() {
        return (
            <div>
                <Select />
            </div>
        )
    }
}

export default Main;