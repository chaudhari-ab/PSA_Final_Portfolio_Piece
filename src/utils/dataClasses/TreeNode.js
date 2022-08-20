export default class TreeNode {
    constructor(chars=null, freq=null) {
        this.chars = chars;
        this.freq = freq;
        this.children = [];
        this.parent = null;
        this.depthIndex = 1;
        this.localWidthIndex = 0;
    }
    assignChild = childNode => {
        const currentChildren = this.children.length;
        this.children.push(childNode);
        childNode.localWidthIndex = currentChildren;
        childNode.depthIndex = this.depthIndex + 1;
        childNode.parent = this;
        // console.log(`assigning child with chars ${childNode.chars} to parent with chars ${this.chars}.  This = `, this);
    }

    copy = () => {
        const copyNode = new TreeNode(this.chars, this.freq);
        this.children.forEach(child => {
            const newChild = child.copy();
            copyNode.assignChild(newChild);
        });
        copyNode.depthIndex = this.depthIndex;
        copyNode.localWidthIndex = this.localWidthIndex;
        return copyNode;
    }
}