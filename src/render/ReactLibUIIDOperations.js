import { processChildrenUpdates } from './ReactLibUIChildrenOperations';

const nodes = {};
const stretchy = [];

// inspired by https://github.com/Yomguithereal/react-blessed/blob/master/src/ReactBlessedIDOperations.js
class ReactLibUIIDOperations {
    add(id, node, props) {
        nodes[id] = node;
        if (props && props.stretchy) {
            stretchy.push(node);
        }
        return this;
    }

    get(id) {
        return nodes[id];
    }

    getStretchy(node) {
        return stretchy.indexOf(node) > -1;
    }

    getParent(id) {
        if (id.match(/\./g).length === 1) {
            return this.screen;
        }

        const parentId = id.split('.').slice(0, -1).join('.');
        return this.get(parentId);
    }

    drop(id) {
        const index = stretchy.indexOf(nodes[id]);
        if (index > -1) {
            stretchy.splice(index, 1);
        }
        delete nodes[id];
        return this;
    }

    dangerouslyProcessChildrenUpdates(updates, components) {
        for (let i = 0; i < updates.length; i++) {
            updates[i].parentNode = this.get(updates[i].parentID);
        }

        processChildrenUpdates(updates, components);
    }

    dangerouslyReplaceNodeWithMarkupByID(id, markup) {
        const node = get(id);

        //       ReactLibUIChildrenOperations.replaceNode(node, markup);
    }
}

const instance = new ReactLibUIIDOperations();
export default instance;
