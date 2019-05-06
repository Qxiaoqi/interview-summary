## 1、Vue生命周期

* beforeCreate、created
* beforeMount、mounted
* beforeUpdate、updated
* beforeDestory、destory

## 2、过程分析

1）beforeCreate
* $el(DOM)：undefined
* $data：undefined
* message： undefined 

2）created （ajax请求可在此阶段）
* $el(DOM)：undefined
* $data：已存在
* message： 已存在

> new Vue =》 mount阶段前

> 注意： 之间会有一个 init的过程
> * 这个过程最重要的是完成了 `响应式`，`依赖收集`

### 响应式
通过`defineProperty`来完成该功能
* 该方法其中的get来完成依赖收集，
* set用来当 数值被修改的时候触发

首先，当new Vue后，会将传入的data里的数据，通过Vue的构造函数调用observer，调用defineProperty绑定传入的对象

### 依赖收集
依赖收集的作用是，如果data里面一条数据，视图渲染中不需要，此时就没必要通知到所有地方更新，这就是依赖收集的作用

依赖收集采用订阅者模式，首先订阅者需要将所有观察者对象存放，然后还要有一个通知所有观察者的操作，对应观察者实现自己的更新操作

当对象被读的时候，比如把render function渲染（render function后面讲），就会触发get，进行一个依赖收集。然后当数据被改动的时候，会触发set，此时通知到所有目标，就能实现响应式和依赖收集。


3）beforeMount
* $el(DOM)：可以打印出来，但是根据文档上看，此时el并不存在，只是使用虚拟DOM占位，$el真正被创建应该是在mounted阶段 `<h1>{{ message }}</h1>`
* $data：已存在
* message： 已存在

> beforeMount阶段前

> 注意：这里会首先判断对象是否有$el选项，如果有就继续向下编译，如果没有，生命周期就会暂时停止。直到vue实例调用mount挂载。

> 注意：判断完$el之后会判断是否有template，如果有就将其编译成render function，如果没有，就会将外部HTML作为模板。所以判断之前要先判断$el，来找对应template。

> 然后简单说一下template的编译，template的编译可以分为三个部分parse，optimize，generate。
> * parse将 template中的字符串解析，然后得到class，style等数据，形成AST语法树
> * optimize是一个优化的处理，因为当视图更新的时候，会有一个patch的过程，其中会用到diff算法，对新老节点进行同层比较，diff算法后面说。会将差异更新到视图上，静态节点是不需要根据数据变化而变化的，所以optimize这层处理会将静态节点编辑，比较的时候会将标记节点跳过，达到优化目的。
> * generate将 AST语法树转换成render function

4）mounted
* $el(DOM)：已真正存在
* $data：已存在
* message： 已存在

> mounted之前

> 会真正创建$el，在mounted之前修改数据都不会触发update生命周期，当在mounted地方修改数据，会触发update生命周期。

> 虽然此时，输出mounted阶段的data，会发现已经是更新过的数据了，但是根据文档来理解，此时的阶段应该还是旧值，不然不会触发update周期

5）beforeUpdate

> 此阶段是虚拟DOM和patch之前的阶段，可以在此阶段改动data值

6）updated

> 此阶段是虚拟DOM和patch都完成的阶段，不要在此阶段更改data，容易造成循环。

> update过程中

### patch机制
新老节点比对，比如说老节点不存在或者新节点不存在，作相应的添加删除即可。

重点说sameVnode、patchVnode过程

#### sameVnode
判断是否满足sameVnode

首先是判断，只有当key、tag、isComment（是否为注释节点），data同时定义（或不定义），如果是input满足type相同的情况下，此种情况为sameVnode。

#### patchVnode
符合sameVnode情况下触发。

* 新老节点相同，则直接返回。
* 当新老节点都是静态的（optimize），而且key相同时，直接从老节点拿过来即可。
* 如果是文本节点的话，直接设置text
* 非文本情况下，然后就是新节点不存在或者老节点不存在，相应的新节点添加或者删除
* 非文本情况下，重点说，新老节点都存在且不相同的情况下执行updateChildren，分别定义新老节点start和end的位置。首先是，while循环，新老节点的两个指向节点会向中间靠拢。两两比对，四种情况。
  * start都相同，start分别后移
  * end都相同，end分别前移
  * 交叉情况，oldStart与newEnd相同，把oldStart节点移动到oldEnd节点后面，oldStart后移，newEnd前移
  * 交叉情况，newStart与oldEnd相同，把oldEnd节点移动到oldStart节点前面，newStart后移，oldEnd前移

如果上述情况都不满足，那么会在old节点里面找有无对应节点，有的话放到指定位置，没的话新建一个，新newStart节点插入到oldStart老节点前面。同时newStart后移一位。

注意：移动的都是elm，可以理解为dom移动，diff比对过程中的节点不会移动。

* 最后一步，就是while循环结束以后，分两种情况
  * oldStart > oldEnd，说明新节点多，须将新节点插入
  * newStart > oldEnd，说明老节点多，须将老节点删除

7）beforeDestory

8）destory

> 最后就是销毁前和销毁后的状态了




