import ReactLibUIIDOperations from './ReactLibUIIDOperations';
import libui from '../../libui-node';

export function processChildrenUpdates(updates, components) {
    for (let i = 0; i < updates.length; i++) {
        const update = updates[i];
        if (update.type === 'INSERT_MARKUP') {
            const component = components[update.markupIndex];
            const parent = update.parentNode;
            if (parent instanceof libui.UiVerticalBox || parent instanceof libui.UiHorizontalBox) {
                parent.append(component, ReactLibUIIDOperations.getStretchy(component));
            } else {
                console.warn('Unhandled INSERT_MARKUP inside parent', parent);
            }
        } else if (update.type === 'REMOVE_NODE') {
            const parent = update.parentNode;
            if (parent instanceof libui.UiVerticalBox || parent instanceof libui.UiHorizontalBox) {
                parent.deleteAt(update.fromIndex);
            } else {
                console.warn('Unhandled REMOVE_NODE inside parent', parent);
            }
        } else {
            console.warn('Unhandled update', update);
        }
    }
}
