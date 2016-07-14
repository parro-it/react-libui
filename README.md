# React LibUI
Create UIs for every platform using the best view framework.

## Quick Start

First off, you'll need to have node-gyp setup.

After that make sure you have all the dependencies installed for [libui-node](https://github.com/parro-it/libui-node).

Then you can go ahead and install react-libui:
```
npm install --save --production react-libui
```
**Do not install React. We require a specific version, so we bundle it with our package.**

Then to use:
```javascript
import React, {
    createClass,
    render,
    start,

    Label,
    VerticalBox,
    Window
} from 'react-libui';

const MyApp = React.createClass({
    render: function() {
        return (<Window title="My Window">
            <VerticalBox>
                <Label>Hello World!</Label>
            </VerticalBox>
        </Window>);
    }
});
render(<MyApp/>);
start();
```

We follow semvar versioning.
We have no plans at this time to make a v2, so we'll try our best to make your applications run on all versions of react-libui.

## Examples

// todo

## Contributing

Looking to contribute? That's great! We use the issues to keep track of features requested and features in progress. Check the "Help Wanted" or "Enhancement" labels.

When you're ready to build your code, you have two options:

#### Watch

You can automatically have a file built to be ran by doing:
```
npm run watch
```

#### Build

Want to build a file to distribute? Just run:
```
npm run build
```

## License

MIT

