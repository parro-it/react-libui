const React = require('react');
const LibUIReact = require('../index');
const {Label, Entry, SearchEntry, PasswordEntry, Button, Combobox, EditableCombobox, Checkbox, RadioButtons, Slider, ProgressBar, MultilineEntry, Tabs, HorizontalBox, VerticalBox, Group, Window} = LibUIReact;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 'Initial value',
            numberEntry: 42,
            selected: 1,
            comboValue: 'One',
            checked: true,
            radio: 1,
            slider: 50,
            tabs: ['Tab Number 1!', 'Tab Number 2!', 'Tab Number 3!'],
            seconds: 2 // start at 2 so we don't have to use the singular form of seconds
        };
    }

    componentWillMount() {
        this._timer = setInterval(() => this.setState({
            seconds: this.state.seconds + 1
        }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    render() {
        return (
            <Window title={ "Running for " + this.state.seconds + " Seconds" } margined={ true } onClosing={ () => this.componentWillUnmount() || LibUIReact.stop() } ref="main">
                <HorizontalBox stretch={ true }>
                    <VerticalBox>
                        <Group title="Input Example">
                            <VerticalBox>
                                <Label>A Simple Input</Label>
                                <HorizontalBox stretch={ true }>
                                    <Entry value={ this.state.value } onChanged={ value => this.setState({
                                                                                      value
                                                                                  }) } />
                                    <Button onClicked={ () => this.setState({
                                                            value: ''
                                                        }) }>Clear</Button>
                                </HorizontalBox>
                                <SearchEntry value={ this.state.value } onChanged={ value => this.setState({
                                                                                        value
                                                                                    }) } />
                                <PasswordEntry value={ this.state.value } onChanged={ value => this.setState({
                                                                                          value
                                                                                      }) } />
                                <Label>Numbers Only</Label>
                                <Entry value={ this.state.numberEntry } onChanged={ value => this.setState({
                                                                                        numberEntry: isNaN(+value) ? this.state.numberEntry : value
                                                                                    }) } />
                            </VerticalBox>
                        </Group>
                        <Group title="Form Example">
                            <VerticalBox>
                                <Label>Selected index:
                                    { ' ' + this.state.selected }
                                </Label>
                                <Combobox onSelected={ selected => this.setState({
                                                           selected
                                                       }) } selected={ this.state.selected }>
                                    <Combobox.Item>Item 1</Combobox.Item>
                                    <Combobox.Item>Item 2</Combobox.Item>
                                    <Combobox.Item>Item 3</Combobox.Item>
                                    <Combobox.Item>Item 4</Combobox.Item>
                                    <Combobox.Item>Item 5</Combobox.Item>
                                </Combobox>
                                <HorizontalBox stretch={ true }>
                                    <Button onClicked={ () => this.setState({
                                                            selected: 0
                                                        }) }>Select First</Button>
                                    <Button onClicked={ () => this.setState({
                                                            selected: 2
                                                        }) }>Select Middle</Button>
                                    <Button onClicked={ () => this.setState({
                                                            selected: 4
                                                        }) }>Select Last</Button>
                                </HorizontalBox>
                                <EditableCombobox onChanged={ comboValue => this.setState({
                                                                  comboValue
                                                              }) } value={ this.state.comboValue }>
                                    <EditableCombobox.Item>One</EditableCombobox.Item>
                                    <EditableCombobox.Item>Two</EditableCombobox.Item>
                                    <EditableCombobox.Item>Three</EditableCombobox.Item>
                                    <EditableCombobox.Item>Four</EditableCombobox.Item>
                                    <EditableCombobox.Item>Five</EditableCombobox.Item>
                                </EditableCombobox>
                                <Checkbox checked={ this.state.checked } onToggled={ checked => this.setState({
                                                                                         checked
                                                                                     }) }>Show Radio?</Checkbox>
                                { this.state.checked && <RadioButtons selected={ 2 }>
                                                            <RadioButtons.Item>One</RadioButtons.Item>
                                                            <RadioButtons.Item>Two</RadioButtons.Item>
                                                            <RadioButtons.Item>Three</RadioButtons.Item>
                                                        </RadioButtons> }
                            </VerticalBox>
                        </Group>
                    </VerticalBox>
                    <VerticalBox>
                        <Group title="Slider Example">
                            <VerticalBox>
                                <Slider value={ this.state.slider } onChanged={ slider => this.setState({
                                                                                    slider
                                                                                }) } />
                                <Slider max={ 10000 } value={ this.state.slider * 100 } onChanged={ slider => this.setState({
                                                                                                        slider: Math.floor(slider / 100)
                                                                                                    }) } />
                                <ProgressBar value={ this.state.slider } />
                            </VerticalBox>
                        </Group>
                        <Group title="Window Functions">
                            <VerticalBox>
                                <Button onClicked={ () => this.refs.main.alert('Files', 'You opened ' + this.refs.main.openFile()) }>Open Dummy File</Button>
                                <Button onClicked={ () => this.refs.main.error('Files', 'You saved ' + this.refs.main.saveFile()) }>Save Dummy File</Button>
                            </VerticalBox>
                        </Group>
                        <Group title="Tabs">
                            <VerticalBox>
                                <Tabs stretch={ true }>
                                    { this.state.tabs.map((text, index) => (<Tabs.Tab title={ "Tab " + (index + 1) } key={ index } margined={ true }>
                                                                                <VerticalBox>
                                                                                    <Entry value={ text } onChanged={ text => {
                                                                                                                          const tabs = this.state.tabs.slice(0);
                                                                                                                          tabs[index] = text;
                                                                                                                          this.setState({
                                                                                                                              tabs
                                                                                                                          });
                                                                                                                      } } />
                                                                                    <Label>
                                                                                        { 250 - this.state.tabs[index].length } Characters Left</Label>
                                                                                </VerticalBox>
                                                                            </Tabs.Tab>)) }
                                </Tabs>
                                <Button onClicked={ () => {
                                                        this.setState({
                                                            tabs: [...this.state.tabs, '']
                                                        });
                                                    } }>Add Tab</Button>
                            </VerticalBox>
                        </Group>
                    </VerticalBox>
                </HorizontalBox>
            </Window>);
    }
}

LibUIReact.render(<App/>);
LibUIReact.start();
