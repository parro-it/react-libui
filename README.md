# React Native LibUI
Create UIs for every platform using the best view framework.

## Quick Start

First off, you'll need to have node-gyp setup.

After that make sure you have all the dependencies installed for libui.

```
npm install --save react-native-libui
```

Then inside your package.json, add a few scripts to handle building:

```json
"watch": "rn-libui <my entry file> --watch",
"build": "rn-libui-build <my entry file> <my output folder> --platform <linux|darwin|windows>",
```

When you want to work on your project, do `npm run watch`. This will automatically watch your files and restart the GUI when needed.
When you're ready to release your project, do `npm run build`. This will produce everything you need to package your program with no dependencies.

## To Do

We've got a lot of stuff left that needs to be finished. Check the issues for more.

## License

MIT

