### 知识点 1、 Objective-C 的类可以采用多继承么？可以采用多个协议么？
+ 不可以多继承，容易出现菱形继承的问题，可以采用多个协议。
+ 多继承的缺点：一个子类继承的多个父类中拥有相同名称的实例变量，子类在引用该变量时将会产生歧义，无法判断使用哪个父类的变量。
+ 如果一个子类继承的多个父类中拥有相同的方法，子类没有覆盖该方法，那么调用该方法时将产生歧义，无法判断应该调用哪个父类的方法。

---

### 知识点 2、`#import、#include、#import<> @import @class`
+ `#include` 赋值粘贴
+ `#import “”` 本质与 `#include` 一样，只不过用 `#ifdef #define` 避免了重复引用的问题
+ `#import <>` 导入系统框架
+ `@import Modules` 模块导入，可以参考这个[链接](https://blog.csdn.net/huangfei711/article/details/76340383) 
这个[链接](https://blog.csdn.net/zcmuczx/article/details/78308631)讲@import更详细
+ `@class` 只需要知道引用类的名称即可，不需要知道内部的实现变量和方法。@class还可以解决循环依赖的问题，A.h导入了B.h，而B.h导入了A.h，每一个头文件的编译都要让对象先编译成功才行。

---

### 知识点 3、Category 
+ Category 是什么？
    - Category 类别，特性是不用定义子类就能扩展一个类的功能，还能将不同的功能分开，不会影响其他类和原有类的关系。
+ 类扩展（Extension）是什么？区别是什么？
    - 类似匿名的类别，能为某个类添加成员变量,属性,方法，一般写到 .m 中。
    - 与类别几乎完全是两个东西，类扩展在编译期间和决议，是类的一部分，在编译期间和头文件中的 interface 以及 implement 形成一个完整的类，可以添加实例变量。必须有一个类的源码才能为其添加类扩展。
    - Category 在运行期间决议，因此种特性，所以无法添加实例变量，如果添加实例变量就会破坏类的内存布局。（属性的话通过关联对象来添加）。
+ 继承与 Category 的区别：
    - 继承是用来描述类与类之间的关系的。
+ 扩展一个类的方式用继承好还是 category 好？为什么？
    - 扩展一个类用 Category 相对好些，继承可能会破坏原有类的封装性。
+ Category 是否可以添加属性？如何通过 runtime 为 catrgory 添加属性？
    - 可以声明 @property 但是不会自动生成 setter/getter 方法，也不会生成以及实现成员变量。category 结构体中只有方法列表，没有属性列表，不可以直接添加属性，但是可以通过 runtime 进行属性的添加。
+ 如果分类中有和原类重名的方法，调用顺序如何？
    - 同名方法调用优先级：`分类>本类>父类`
    - 多个分类拥有重名方法，方法调用优先级：`后编译>先编译>本类>父类`
+ Category 中 load 执行顺序：`本类>先编译分类>后编译分类` 
+ [深入了解 Category](https://tech.meituan.com/2015/03/03/diveintocategory.html)

---

### 知识点 4、`@protected、@private、@public` 声明有什么含义？
+ `@protected` 受保护的，该类的实例变量只能在该类和其子类内部访问，其他类不能访问
+ `@private` 私有的，该实例变量只能在该类内访问，其他类不能访问
+ `@public` 共有的，该实例变量谁都可以访问

---

### 知识点 5、id 与 instancetype 区别
+ 为什么系统默认初始化（init）方法模板返回的类型是 instancetype 而不是 id？
```objective-c
@implementation Teacher
//id 运行时检查，id 可作为方法参数
+ (id)teacher {
    return [[Student alloc]init];
}
//instancetype 编译时检查类型，instancetype 只作为返回值
+ (instancetype)teacher1 {
//这里会有警告,
//Incompatible pointer types returning 'Student *' from a function with result type 'Teacher *'
    return [[Student alloc]init];
}
@end
```

---

### 知识点 6、深拷贝 浅拷贝
+ [链接](https://www.jianshu.com/p/63239d4d65e0)


---

### 知识点 7、@property、@synthesize 作用？
+ [详细链接](https://www.jianshu.com/p/44d12884e24e)
+ 之前的对应关系：@property 声明方法.h文件中声明 getter 和 setter 方法，@synthesize 在.m文件中帮助实现 getter 和 setter 方法。Xcode4.5之后的版本中，可以省略@synthesize关键字，编译器会自动生成 get 和 set 方法的实现。
+ @property 声明读写方法，@ synthesize 自动生成合成存取方法。
+ 简单讲
```
@property = ivar + getter + setter
```


---

### 知识点 8、oc各种锁
![avatar](./lock-compare.png)
+ [链接](https://www.jianshu.com/p/d69495dac8cb)详细描述了自旋锁和互斥锁，以及优缺点
+ pthread_mutex(recursive)、NSRecursiveLock、@synchronized都是递归锁。 [链接](https://www.jianshu.com/p/777c28eface5)

---

## 知识点9、响应链原理
原理图如下所示
![avatar](./响应链原理图.png)

+  当用户触摸屏幕时，触碰屏幕产生事件UIEvent并存入UIApplication中的事件队列中, 并且在整个视图结构中自上而下的进行分发
+  - (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event;判断当前点击事件是否存在最优响应者(First Responder）
+  - (BOOL)pointInside:(CGPoint)point withEvent:(UIEvent *)event;判断当前点击是否在控件的Bounds之内

### 思考
![avatar](./响应事件例子图.png)
如下代码

``` objc
viewController.m
// 在当前VC里面添加一个tap手势，然后添加一个subview：A，最后添加一个button：B
    UITapGestureRecognizer *tapGesture = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(onTap:)];
    //下面一行注释掉
    //tapGesture.cancelsTouchesInView = NO;
    [self.view addGestureRecognizer:tapGesture];
    
    CustomView *A = [[CustomView alloc]initWithFrame:CGRectMake(100, 100, 200, 300)];
    [self.view addSubview:A];
    
    UIButton *B = [UIButton buttonWithType:UIButtonTypeSystem];
    [B setBackgroundColor:[UIColor blueColor]];
    [B setTitle:@"按钮" forState:UIControlStateNormal];
    [B setTitleColor:[UIColor yellowColor] forState:UIControlStateNormal];
    B.frame = CGRectMake(100, 450, 200, 100);
    [self.view addSubview:B];
    [B addTarget:self action:@selector(onBtnClick:) forControlEvents:UIControlEventTouchUpInside];
```
``` objc
viewController.m event事件处理
- (void)onTap:(UIGestureRecognizer *)gesture {
    NSLog(@"%s",__func__);
}

- (void)onBtnClick:(id)sender {
   NSLog(@"%s",__func__);
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    NSLog(@"%s",__func__);
}

- (void)touchesCancelled:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    NSLog(@"%s",__func__);
}

- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    NSLog(@"%s",__func__);
}

- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    NSLog(@"%s",__func__);
}
```
``` objc
CutomView.m 在字view A 实现
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    
    NSLog(@"%@:%s",NSStringFromClass([self class]),__func__);
}

- (void)touchesCancelled:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    NSLog(@"%@:%s",NSStringFromClass([self class]),__func__);
}

- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    NSLog(@"%@:%s",NSStringFromClass([self class]),__func__);
}

- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    
    NSLog(@"%@:%s",NSStringFromClass([self class]),__func__);
}
```
问题1：点击1（点击viewcontroller的view）会输出什么结果？</br>
问题2：点击2（点击子View A）会输出什么结果？</br>
问题3：点击3（点击按钮）会输出什么结果？</br>
答案：
![avator](./响应链题目答案.png)
问题4：如果代码中那行注释放开，上面三题的结果如何呢？
</br>
详细解释[链接](https://blog.gocy.tech/2016/11/19/iOS-touch-handling/)
###总结
通过上面了解可以明白两个事情：
1、主view增加tap手势，在主view上添加tableview话，点击tableviewcell，不会想要select的代理方法，而是响应手势原因？
2、怎么解决该冲突？3、如果在一个button上添加一个tap手势，点击button话，谁会响应？怎么做到两种都相应呢？

### 知识点 10、OC 消息转发机制

---

### 知识点 11、method swizzling

---

### 知识点 12、GCD

---


### 知识点 13、AutoLayout

---
