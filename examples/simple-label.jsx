import React from 'react';
import {start, stop, render, Window, VerticalBox, Label, Button} from '../';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hidden: false
        };
    }

    render() {
        return (<Window title="Simple Label" onClosing={ stop }>
                    <VerticalBox>
                        { this.state.hidden ? null : (<Label key="label">Good Job!</Label>) }
                        <Button onClicked={ () => this.setState({
                                                hidden: !this.state.hidden
                                            }) }>Toggle (hidden:
                            { ' ' + this.state.hidden })</Button>
                    </VerticalBox>
                </Window>);
    }

}

render(<App/>);
start();
