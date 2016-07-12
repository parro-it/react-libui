import ReactLibUIIDOperations from './ReactLibUIIDOperations';
import * as libui from 'libui-node';

function isBox(component) {
    return component instanceof libui.UiVerticalBox ||
            component instanceof libui.UiHorizontalBox;
}

function isTab(component) {
    return component instanceof libui.UiTab;
}

export function processChildrenUpdates(updates, components) {
    for (let i = 0; i < updates.length; i++) {
        const update = updates[i];
        if (update.type === 'INSERT_MARKUP') {
            const component = components[update.markupIndex];
            const parent = update.parentNode;
            if (isBox(parent)) {
                // todo insertAt update.toIndex
                parent.append(component, ReactLibUIIDOperations.getStretchy(component));
            } else if (isTab(parent)) {
                parent.append(component.title, component.node); // special tab stuff
                if (component.margined) {
                    parent.setMargined(update.toIndex, true);
                }
            } else {
                console.warn('Unhandled INSERT_MARKUP inside parent', parent);
            }
        } else if (update.type === 'REMOVE_NODE') {
            const parent = update.parentNode;
            if (isBox(parent) || isTab(parent)) {
                parent.deleteAt(update.fromIndex);
            } else {
                console.warn('Unhandled REMOVE_NODE inside parent', parent);
            }
        } else {
            console.warn('Unhandled update', update);
        }
    }
}
