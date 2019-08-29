### 知识点 1、 Objective-C 的类可以采用多继承么？可以采用多个协议么？
+ 不可以多继承，容易出现菱形继承的问题，可以采用多个协议。
+ 多继承的缺点：一个子类继承的多个父类中拥有相同名称的实例变量，子类在引用该变量时将会产生歧义，无法判断使用哪个父类的变量。
+ 如果一个子类继承的多个父类中拥有相同的方法，子类没有覆盖该方法，那么调用该方法时将产生歧义，无法判断应该调用哪个父类的方法。

### 知识点 2、#import、#include、#import<> @import @class
+ #include 赋值黏贴
+ #import “” 本质与 #include 一样，只不过用 #ifdef #define 避免了重复引用的问题
+ #import <> 导入系统框架
+ @import Modules 模块导入，可以参考这个[链接](https://blog.csdn.net/huangfei711/article/details/76340383)
+ @class 只需要知道引用类的名称即可，不需要知道内部的实现变量和方法。@class还可以解决循环依赖的问题，A.h导入了B.h，而B.h导入了A.h，每一个头文件的编译都要让对象先编译成功才行。
### 知识点 3、Category 是什么？类扩展是什么？扩展一个类的方式用继承好还是 category 好？为什么？
+ category 类别，特性是不用定义子类就能扩展一个类的功能，还能将不同的功能分开，不会影响其他类和原有类的关系。
+ extention 是只在本类文件中添加 category 声明的私有方法。
+ 注意点：扩充属性的时候，需要.h 声明，.m 用 runtime 重写 set 和 get 方法

### 知识点 4、@protected、@private、@public 声明有什么含义？
+ @protected 受保护的，该类的实例变量只能在该类和其子类内部访问，其他类不能访问
+ @private 私有的，该实例变量只能在该类内访问，其他类不能访问
+ @public 共有的，该实例变量谁都可以访问

### 知识点 5、id 与 instancetype 区别
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

### 知识点 6、深拷贝 浅拷贝

### 知识点 7、KVC

### 知识点 8、KVO
