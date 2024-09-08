const { Tree } = require("./tree");

/** BinaryTreeNode: node for a general tree. 
 * Each node contains a value and two children (left and right).
*/
class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * BinaryTree: Represents a binary tree structure with a root node.
 */
class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf.
   * @returns {number} The minimum depth of the tree.
   */

  minDepth() {
    if (!this.root) return 0;

    function minDepthHelper(node) {
      if (!node) return Infinity;
      if (!node.left && !node.right) return 1;
      return 1 + Math.min(minDepthHelper(node.left), minDepthHelper(node.right));
    }

    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. 
   * @returns {number} The maximum depth of the tree.
   */
  maxDepth() {
    if (!this.root) return 0;

    function maxDepthHelper(node){
      if (!node) return 0;
      return 1 + Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right));
    }

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. 
   * @returns {number} The maximum path sum in the tree.
   */
  maxSum() {
    if (!this.root) return 0;

    let result = { max: -Infinity };

    function maxPathSumHelper(node) {
      if (!node) return 0;

      // Get the maximum path sum for the left and right children
      let leftMax = Math.max(0, maxPathSumHelper(node.left));
      let rightMax = Math.max(0, maxPathSumHelper(node.right));

      // Calculate the maximum sum of the current node plus left and right paths
      let currentMax = node.val + leftMax + rightMax;

      // Update the result with the maximum value found so far
      result.max = Math.max(result.max, currentMax);

      // Return the maximum sum of one side plus the current node
      return node.val + Math.max(leftMax, rightMax);
    }

    maxPathSumHelper(this.root);
    return result.max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. 
   * @param {number} lowerBound - The value to compare node values against.
   * @returns {number | null} The smallest value greater than lowerBound, or null if none exists.
   */
  nextLarger(lowerBound) {
    if (!this.root) return null;

    let closest = null;

    function findNextLargerHelper(node) {
      if (!node) return;

      if (node.val > lowerBound && (closest === null || node.val < closest)) {
        closest = node.val;
      }

      findNextLargerHelper(node.left);
      findNextLargerHelper(node.right);
    }

    findNextLargerHelper(this.root);
    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) 
   * * @param {BinaryTreeNode} node1 - The first node.
   * @param {BinaryTreeNode} node2 - The second node.
   * @returns {boolean} True if the nodes are cousins, otherwise false.
   */
  areCousins(node1, node2) {
    if (!this.root || node1 === this.root || node2 === this.root) return false;

    // Helper function to find both parent and depth of a node
    function findParentAndDepth(node, target, depth = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { parent, depth };

      let leftResult = findParentAndDepth(node.left, target, depth + 1, node);
      if (leftResult) return leftResult;

      return findParentAndDepth(node.right, target, depth + 1, node);
    }

    const node1Info = findParentAndDepth(this.root, node1);
    const node2Info = findParentAndDepth(this.root, node2);

    // Check if both nodes exist and have the same depth but different parents
    if (!node1Info || !node2Info) return false;
    return (
      node1Info.depth === node2Info.depth && node1Info.parent !== node2Info.parent
    );
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. 
   * This method converts the tree into an array-like format for easy storage or transmission.
   * @returns {string} The serialized tree as a string.
   */

  static serialize(tree) {
    const result = [];

    function serializeHelper(node) {
      if (!node) {
        result.push('null');
        return;
      }
      result.push(node.val);
      serializeHelper(node.left);
      serializeHelper(node.right);
    }

    serializeHelper(tree.root);
    return JSON.stringify(result);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. 
   * This method reconstructs the original binary tree from the serialized format.
   * @param {string} data - The serialized tree string.
   * @returns {BinaryTree} The deserialized binary tree.
   */
  static deserialize(data) {
    const values = JSON.parse(data);

    function deserializeHelper() {
      if (values.length === 0) return null;
      let val = values.shift();
      if (val === 'null') return null;

      let node = new BinaryTreeNode(val);
      node.left = deserializeHelper();
      node.right = deserializeHelper();
      return node;
    }

    let root = deserializeHelper();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. 
   * The LCA is the lowest node that has both p and q as descendants (where a node can be a descendant of itself).
   * @param {BinaryTreeNode} p - The first node.
   * @param {BinaryTreeNode} q - The second node.
   * @returns {BinaryTreeNode} The LCA of the two nodes.
   */
  lowestCommonAncestor(node1, node2) {
    function lcaHelper(node) {
      if (!node || node === node1 || node === node2) return node;

      let left = lcaHelper(node.left);
      let right = lcaHelper(node.right);

      if (left && right) return node;
      return left || right;
    }

    return lcaHelper(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
