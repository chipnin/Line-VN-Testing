export default {
    /**
     * Check parent and child is relative
     * @param  {Object} parent - parent node
     * @param  {Object} child - child node
     * @return {boolean}
     */
    checkIsDescendant(parent, child) {
        let node = child.parentNode;
        while (node != null) {
            if (node === parent) {
                return true;
            }

            node = node.parentNode;
        }

        return false;
    }
}