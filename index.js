const libui = require('./libui-node/index.js');
const os = require('os');

libui.Ui.init();

module.exports.render = require('./src/render/render').render;
module.exports.stop = () => libui.stopLoop();
module.exports.start = () => {
    if (process.platform === 'darwin') {
        libui.Ui.main(); // not really sure why the loop doesn't work on mac
    } else {
        libui.startLoop();
    }
};

module.exports.Button = require('./src/components/Button');
module.exports.Checkbox = require('./src/components/Checkbox');
module.exports.Combobox = require('./src/components/Combobox');
module.exports.EditableCombobox = require('./src/components/EditableCombobox');
module.exports.Entry = require('./src/components/Entry');
module.exports.Group = require('./src/components/Group');
module.exports.HorizontalBox = require('./src/components/HorizontalBox');
module.exports.Label = require('./src/components/Label');
module.exports.MultilineEntry = require('./src/components/MultilineEntry');
module.exports.PasswordEntry = require('./src/components/PasswordEntry');
module.exports.ProgressBar = require('./src/components/ProgressBar');
module.exports.RadioButtons = require('./src/components/RadioButtons');
module.exports.SearchEntry = require('./src/components/SearchEntry');
module.exports.Slider = require('./src/components/Slider');
module.exports.Tabs = require('./src/components/Tabs');
module.exports.VerticalBox = require('./src/components/VerticalBox');
module.exports.Window = require('./src/components/Window');
