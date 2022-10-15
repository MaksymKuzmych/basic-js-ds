const { NotImplementedError } = require('../extensions/index.js')

const { Node } = require('../extensions/list-tree.js')

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.head = null
  }

  root() {
    return this.head
  }

  add(data) {
    this.head = addWithin(this.head, data)

    function addWithin(node, value) {
      if (!node) {
        return new Node(value)
      }

      if (node.data === value) {
        return node
      }

      if (value < node.data) {
        node.left = addWithin(node.left, value)
      } else {
        node.right = addWithin(node.right, value)
      }

      return node
    }
  }

  has(data) {
    return searchWithin(this.head, data)

    function searchWithin(node, value) {
      if (!node) {
        return false
      }

      if (node.data === value) {
        return true
      }

      return value < node.data ? searchWithin(node.left, value) : searchWithin(node.right, value)
    }
  }

  find(data) {
    return searchWithin(this.head, data)

    function searchWithin(node, value) {
      if (!node) {
        return null
      }

      if (node.data === value) {
        return node
      }

      return value < node.data ? searchWithin(node.left, value) : searchWithin(node.right, value)
    }
  }

  remove(data) {
    this.head = removeNode(this.head, data)

    function removeNode(node, value) {
      if (!node) {
        return null
      }

      if (value < node.data) {
        node.left = removeNode(node.left, value)
        return node
      } else if (node.data < value) {
        node.right = removeNode(node.right, value)
        return node
      } else {
        // equal - should remove this item
        if (!node.left && !node.right) {
          // put null instead of item
          return null
        }

        if (!node.left) {
          // set right child instead of item
          node = node.right
          return node
        }

        if (!node.right) {
          // set left child instead of item
          node = node.left
          return node
        }

        // both children exists for this item
        let minFromRight = node.right
        while (minFromRight.left) {
          minFromRight = minFromRight.left
        }
        node.data = minFromRight.data

        node.right = removeNode(node.right, minFromRight.data)

        return node
      }
    }
  }

  min() {
    if (!this.head) {
      return
    }

    let node = this.head
    while (node.left) {
      node = node.left
    }

    return node.data
  }

  max() {
    if (!this.head) {
      return
    }

    let node = this.head
    while (node.right) {
      node = node.right
    }

    return node.data
  }
}

module.exports = {
  BinarySearchTree,
}
