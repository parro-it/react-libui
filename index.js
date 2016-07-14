import * as libui from 'libui-node';
import * as React from 'react';

export default React;
export { Children, Component, createElement, cloneElement, isValidElement, PropTypes, createClass, createFactory, createMixin } from 'react';
export { render } from './src/render/render';
export { Button } from './src/components/Button';
export { Checkbox } from './src/components/Checkbox';
export { Combobox } from './src/components/Combobox';
export { EditableCombobox } from './src/components/EditableCombobox';
export { Entry } from './src/components/Entry';
export { Group } from './src/components/Group';
export { HorizontalBox } from './src/components/HorizontalBox';
export { Label } from './src/components/Label';
export { MultilineEntry } from './src/components/MultilineEntry';
export { PasswordEntry } from './src/components/PasswordEntry';
export { ProgressBar } from './src/components/ProgressBar';
export { RadioButtons } from './src/components/RadioButtons';
export { SearchEntry } from './src/components/SearchEntry';
export { Slider } from './src/components/Slider';
export { Spinbox } from './src/components/Spinbox';
export { Tabs } from './src/components/Tabs';
export { VerticalBox } from './src/components/VerticalBox';
export { Window } from './src/components/Window';

export function stop() {
    libui.stopLoop();
}
export function start() {
    if (process.platform === 'darwin') {
        libui.Ui.main(); // not really sure why the loop doesn't work on mac
    } else {
        libui.startLoop();
    }
}

libui.Ui.init();
