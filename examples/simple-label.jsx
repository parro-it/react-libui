const React = require('react');

const LibUIReact = require('../index');
const Window = require('../src/components/Window');
const VerticalBox = require('../src/components/VerticalBox');
const Label = require('../src/components/Label');
const Button = require('../src/components/Button');

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hidden: false
        };
    }

    render() {
        return (<Window title="Simple Label" onClosing={ LibUIReact.stop }>
                    <VerticalBox>
                        { this.state.hidden ? null : (<Label key="label">Wow!</Label>) }
                        <Button onClicked={ () => this.setState({
                                                hidden: !this.state.hidden
                                            }) }>Toggle (hidden:
                            { this.state.hidden })</Button>
                    </VerticalBox>
                </Window>);
    }
}

LibUIReact.render(<App/>);
