#BST
##概念描述
BST(二叉查找树)有如下特性：

* 若任意节点的左子树不空，则左子树上所有结点的值均小于它的根结点的值
* 若任意节点的右子树不空，则右子树上所有结点的值均大于它的根结点的值
* 任意节点的左、右子树也分别为二叉查找树

##数据结构
``` swift
class TreeNode {
    var value : Int
    var leftNode : TreeNode?
    var rightNode : TreeNode?
    var parentNode : TreeNode?
    
    init(_ node : Int) {
        value = node
    }
    
}
```

##插入算法
``` swift
func insertTreeNode(rootNode: inout TreeNode? , value : Int) {
        guard let root = rootNode else {
            rootNode = TreeNode(value)
            return
        }
        var currentNode : TreeNode? = root
        var parentNode : TreeNode? = nil
        
        while let tempNode = currentNode {
            if tempNode.value > value {
                parentNode = tempNode
                currentNode = tempNode.leftNode
            }
            else {
                parentNode = tempNode
                currentNode = tempNode.rightNode
            }
        }
        if let targetNode = parentNode {
            let addNode = TreeNode(value)
            addNode.parentNode = targetNode
            if targetNode.value > addNode.value {
                targetNode.leftNode = addNode
            }
            else {
                targetNode.rightNode = addNode
            }
        }
        
    }
```
> 插入算法的时间复杂度为O(lg n)

##创建BST
``` swift
func createBST(nodes : [Int]) -> TreeNode? {
        guard nodes.count > 0 else {
            return nil
        }
        var root : TreeNode? = nil
        
        for node in nodes {
            self.insertTreeNode(rootNode: &root, value: node)
        }
        return root
    }
```
> 创建算法的时间复杂度为O（n * lg n）