class node{

    constructor(data){
        this.data = data;
        this.right = null;
        this.left=null;
    }
}


class Tree {

    constructor(array) {
        this.root = this.buildTree(array);

    }

    buildTree(array) {
   
        const sortedArray = [...array];
        sortedArray.sort((a, b) => a - b);

        const uniqueArray = [...new Set(sortedArray)];

        const build = (start, end) => {

            if (start > end) {
               return null;
            }

            const mid = Math.floor((start + end) / 2);
            const node = new Node(uniqueArray[mid]);

            node.left = build(start, mid - 1);
            node.right = build(mid + 1, end);

            return node;
        };

        return build(0, uniqueArray.length - 1);
    }

    includes(value) {
    
        let current = this.root;

        while (current !== null) {
            if (value === current.data) {
                return true;
            }

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }

        }
    }


    insert(value) {

        if (this.root === null) {
           this.root = new Node(value);
           return;
        }

        let current = this.root;
        let parent = null;

        while (current !== null) {
          
          parent = current;

          if (value === current.data) {
            return;
          }

          if (value < current.data) {
            current = current.left;
          } else {
            current = current.right;
          }

        }

        const newNode = new Node(value);

        if (value < parent.data) {
            parent.left = newNode;
        } else {
          parent.right = newNode;
        }
    }


    deleteItem(value) {

        let current = this.root;
        let parent = null;

   
        while (current !== null && current.data !== value) {
          
            parent = current;

            if (value < current.data) {
              current = current.left;
            } else {
              current = current.right;
            }
        }

   
        if (current === null) {
          return;
        }


        if (current.left === null && current.right === null) {

        
            if (parent === null) {
              this.root = null;
              return;
            }

            if (parent.left === current) {
              parent.left = null;
            } else {
              parent.right = null;
            }

            return;
        }

 
        if (current.left === null || current.right === null) {

            const child = current.left !== null
              ? current.left
              : current.right;

        
            if (parent === null) {
                this.root = child;
                return;
            }

            if (parent.left === current) {
                parent.left = child;
            } else {
                parent.right = child;
            }

            return;
        }

  
        let successorParent = current;
        let successor = current.right;

        while (successor.left !== null) {
            successorParent = successor;
            successor = successor.left;
        }

    
        current.data = successor.data;

    
        if (successorParent.left === successor) {
           successorParent.left = successor.right;
        } else {
        successorParent.right = successor.right;
        }

    }


    levelOrderForEach(callback) {

   
        if (!callback) {
           throw new Error("Callback is required");
        }

        if (this.root === null) {
           return;
        }

        const queue = [this.root];

        while (queue.length > 0) {
           const current = queue.shift();

           callback(current.data);

            if (current.left !== null) {
              queue.push(current.left);
            }

            if (current.right !== null) {
              queue.push(current.right);
            }
        }
    }


    inOrderForEach(callback) {
   
        if (!callback) {
            throw new Error("Callback is required");
        }

        const traverse = (node) => {
           if (node === null) {
               return;
            }

            traverse(node.left);

            callback(node.data);

            traverse(node.right);
        };

        traverse(this.root);
    }


    preOrderForEach(callback) {
    if (!callback) {
        throw new Error("Callback is required");
    }

    const traverse = (node) => {
        if (node === null) {
            return;
        }

        callback(node.data);

        traverse(node.left);

        traverse(node.right);
    };

    traverse(this.root);
}


postOrderForEach(callback) {
    if (!callback) {
        throw new Error("Callback is required");
    }

    const traverse = (node) => {
        if (node === null) {
            return;
        }

        traverse(node.left);

        traverse(node.right);

        callback(node.data);
    };

    traverse(this.root);
}

height(value) {
    let current = this.root;

    while (current !== null) {
        if (value === current.data) {
            break;
        }

        if (value < current.data) {
            current = current.left;
        } else {
            current = current.right;
        }
    }

    if (current === null) {
        return undefined;
    }

    const getHeight = (node) => {
        if (node === null) {
            return -1;
        }

        const leftHeight = getHeight(node.left);
        const rightHeight = getHeight(node.right);

        return 1 + Math.max(leftHeight, rightHeight);
    };

    return getHeight(current);
}

depth(value) {
    let current = this.root;
    let depth = 0;

    while (current !== null) {
        if (value === current.data) {
            return depth;
        }

        if (value < current.data) {
            current = current.left;
        } else {
            current = current.right;
        }

        depth++;
    }

    return undefined;
}


isBalanced() {
    const checkBalance = (node) => {
        if (node === null) {
            return 0;
        }

        const leftHeight = checkBalance(node.left);

        if (leftHeight === -1) {
            return -1;
        }

        const rightHeight = checkBalance(node.right);

        if (rightHeight === -1) {
            return -1;
        }

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return 1 + Math.max(leftHeight, rightHeight);
    };

    return checkBalance(this.root) !== -1;
}


rebalance() {
    const values = [];

    this.inOrderForEach((value) => {
        values.push(value);
    });

    this.root = this.buildTree(values);
}





}
