/** TreeNode: node for a general tree. 
 * Each node contains a value and a array of child nodes.
*/

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

/**
 * Tree: Represents an n-ary tree structure with a root node.
 */
class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. 
   * @returns {number} The sum of all the node values.
  */
  sumValues() {
    if (!this.root) return 0;

    function sumHelper(node) {
      let sum = node.val;
      for (let child of node.children) {
        sum += sumHelper(child);
      }
      return sum;
    }

    return sumHelper(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. 
   * @returns {number} The count of even-valued nodes.
  */
  countEvens() {
    if (!this.root) return 0;

    function countHelper(node) {
      let count = (node.val % 2 === 0) ? 1 : 0;
      for (let child of node.children) {
        count += countHelper(child);
      }
      return count;
    }

    return countHelper(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. 
   *  @param {number} lowerBound - The value to compare node values against.
   * @returns {number} The count of nodes with values greater than lowerBound.
   */
  numGreater(lowerBound) {
    if (!this.root) return 0;

    function countHelper(node) {
      let count = (node.val > lowerBound) ? 1 : 0;
      for (let child of node.children) {
        count += countHelper(child);
      }
      return count;
    }

    return countHelper(this.root);
  }
}

module.exports = { Tree, TreeNode };
