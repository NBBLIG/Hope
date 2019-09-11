#BST
##概念描述
BST(二叉查找树)有如下特性：

* 若任意节点的左子树不空，则左子树上所有结点的值均小于它的根结点的值
* 若任意节点的右子树不空，则右子树上所有结点的值均大于它的根结点的值
* 任意节点的左、右子树也分别为二叉查找树

##数据结构
``` swift
class TreeNode : NSObject {
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

##查找节点
``` swift
func searchNode(root : TreeNode? , key : Int) -> TreeNode? {
        
        var currentNode = root
        
        while currentNode != nil && key != currentNode?.value {
            let tempNode = currentNode!
            if tempNode.value > key {
                currentNode = tempNode.leftNode
            }
            else {
                currentNode = tempNode.rightNode
            }
        }
        
        return currentNode
    }
```
> 时间复杂度O(lg n)

##最小值
``` swift
func MIN(root : TreeNode?) -> TreeNode? {
        var currentNode = root
        
        while currentNode != nil && currentNode?.leftNode != nil {
            currentNode = currentNode!.leftNode
        }
        return currentNode
    }
```
##最大值
``` swift
func MAX(root : TreeNode?) -> TreeNode? {
        var currentNode = root
        
        while currentNode != nil && currentNode?.rightNode != nil {
            currentNode = currentNode!.rightNode
        }
        return currentNode
    }
```
##节点的后继节点
> 某个节点的后继指的是：在中序遍历里面，排在该节点后面的节点

``` swift
func successor(root : TreeNode?, value : Int) -> TreeNode? {
        //先通过查找算法找出是否存在该节点
        let node = searchNode(root: root, key: value)
        guard var tempNode = node else {
            return nil
        }
        //若该节点存在右子树，则求右子树的最小值
        if let rightNode = tempNode.rightNode {
            return MIN(root: rightNode)
        }
        else {
            var parentNode = tempNode.parentNode
            //求祖先节点中存在子节点不是父节点的右孩子的情况，具体原因是：该节点没有右子树，那他肯定是某棵子树的值最大节点，那找到这课子树的根节点的父节点就是他的后继
            while parentNode != nil , let pRightNode = parentNode?.rightNode, pRightNode == tempNode {
                tempNode = parentNode!
                parentNode = tempNode.parentNode
            }
            return parentNode
        }
    }
```
##节点的前驱(跟后继同理)
``` swift
func predecessor(root : TreeNode?, value : Int) -> TreeNode? {
        let node = searchNode(root: root, key: value)
        guard var tempNode = node else {
            return nil
        }
        
        if let leftNode = tempNode.leftNode {
            return MAX(root: leftNode)
        }
        else {
            var parentNode = tempNode.parentNode
            while parentNode != nil , let pLeftNode = parentNode?.leftNode, pLeftNode == tempNode {
                tempNode = parentNode!
                parentNode = tempNode.parentNode
            }
            return parentNode
        }
    }
```
##插入节点
``` swift
guard let _ = root else {
            let node = TreeNode(key)
            root = node
            return
        }
        
        var pParentNode : TreeNode? = nil
        
        var currentNode = root
        
        while let tempNode = currentNode  {
            pParentNode = currentNode
            if tempNode.value > key {
                currentNode = tempNode.leftNode
            }
            else {
                currentNode = tempNode.rightNode
            }
        }
        
        let node = TreeNode(key)
        if pParentNode!.value > key {
            pParentNode!.leftNode = node
        }
        else {
            pParentNode!.rightNode = node
        }
        node.parentNode = pParentNode
```
##删除节点
``` swift
func delete(root : inout TreeNode?, key : Int) {
        guard let targetNode = searchNode(root: root, key: key)  else {
            return
        }
        //如果只有一个节点
        if targetNode == root!, root?.leftNode == nil, root?.rightNode == nil {
            root = nil
        }
        //如果没有左子树
        guard let _ = targetNode.leftNode else {
            if let rightNode = targetNode.rightNode {
                rightNode.parentNode = targetNode.parentNode
            }
            if targetNode == root! {
               root = targetNode.rightNode
            }
            else if targetNode.parentNode?.leftNode == targetNode  {
                targetNode.parentNode?.leftNode = targetNode.rightNode
            }
            else {
                targetNode.parentNode?.rightNode = targetNode.rightNode
            }
            return
        }
        //如果没有右子树
        guard let _ = targetNode.rightNode else {
            if let leftNode = targetNode.leftNode {
                leftNode.parentNode = targetNode.parentNode
            }
            if targetNode == root!{
               root = targetNode.leftNode
            }
            else if targetNode.parentNode?.leftNode == targetNode {
                targetNode.parentNode?.leftNode = targetNode.leftNode
            }
            else {
                targetNode.parentNode?.rightNode = targetNode.leftNode
            }
            return
        }
        //左右都存在的情况
        let rigintMinNode = MIN(root: targetNode.rightNode)!
        if rigintMinNode.parentNode?.leftNode == rigintMinNode {
            rigintMinNode.parentNode?.leftNode = nil
        }
        else {
            rigintMinNode.parentNode?.rightNode = nil
        }
        rigintMinNode.leftNode = targetNode.leftNode
        targetNode.leftNode?.parentNode = rigintMinNode
        
        rigintMinNode.rightNode = targetNode.rightNode
        targetNode.rightNode?.parentNode = rigintMinNode
        
       if targetNode == root! {
            root = rigintMinNode
        }
        else if targetNode.parentNode?.leftNode == targetNode {
            targetNode.parentNode?.leftNode = rigintMinNode
        }
        else {
            targetNode.parentNode?.rightNode = rigintMinNode
        }
        
    }
```
## 总结
搜索二叉树最坏的情况就是退化成线性的有序序列，因此伟大的前人发明了AVL树，下一篇开启AVL树吧