## 一、同源策略

* 协议相同
* 域名相同
* 端口相同

### 限制范围

（1） Cookie、LocalStorage 和 IndexDB 无法读取。

（2） DOM 无法获得。

（3） AJAX 请求不能发送。

### iframe

如果两个网页不同源，则无法拿到对方的DOM，可以设置document.domain（方案同cookie）

## 二、（不同源）跨域窗口通信

### 1. 片段标识符

通过URL后面添加#，页面不会刷新（vue-router的hash模式同）。

父窗口把信息写到子窗口url中，子窗口监听hashchange事件，子窗口也同样可以改变父窗口的片段标识符

### 2. window.name

设置之后跳转到其它页面，这个属性不会变化。因此可以如下操作

* 子窗口window.name='test';

* 子窗口跳到一个和父窗口同域的网址

* 主窗口监听到子窗口的window.name变化，获取子窗口设置的数据
```js
var data = document.getElementById('myFrame').contentWindow.name;
```

### 3. postMessage通信

HTML5的跨文档通信API

父窗口向子窗口发送发送信息
```js
$('#postM').click(function(evt){
  var popup = window.open('http://localhost:8000/public/index.html', 'title');
  popup.postMessage('Hello World!', 'http://localhost:8000/');
});
```

子窗口监听
```js
window.addEventListener('message', (e) => {
  alert(e.data);
}, false);
```

### 4. LocalStorage读取（使用postMessage）

原理同上，父窗口发送数据，子窗口接收到后，将其存入localStorage（单点登录？）


## 三、AJAX请求

### 1. jsonp

只能GET请求

* 创建一个script标签，这个script标签的src就是请求的地址；
* 这个script标签插入到DOM中，浏览器就根据src地址访问服务器资源
* 返回的资源是一个文本，但是因为是在script标签中，浏览器会执行它
* 而这个文本恰好是函数调用的形式，即函数名（数据），浏览器会把它当作JS代码来执行即调用这个函数
* 只要提前约定好这个函数名，并且这个函数存在于window对象中，就可以把数据传递给处理函数。

### 2. WebSocket

WebSocket不遵循同源策略，只要服务端验证通过，就可以正常通信

### 3. CORS

跨域请求相对比较完善的方案
'Access-Control-Allow-Origin'

#### 简单请求

需要同时满足两大条件

请求方法
* GET
* POST
* HEAD

HTTP请求头没有额外的，而且允许的Content-Type
* text/plain
* multipart/form-data
* application/x-www-form-ulencoded

简单请求会自动在头信息中加一个Origin字段

#### 非简单请求

规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求。

服务端在HTTP header中加入允许请求的方法和Content-Type后，其他指定的方法和Content-Type就可以成功请求了

* 'Access-Control-Allow-Headers': '允许Content-Type'
* 'Access-Control-Allow-Methods': '允许的请求方法'
* 'Access-Control-Max-Age': '预请求允许其他方法和类型传输的时间'

### 4. 代理


## 四、cookie相关

### cookie跨域请求

这里说明一点，cookie不能跨域（但是如果端口相同，可以直接共用），即相同域名下不同端口，cookie是可以共用的。

跨域请求需要在客户端添加
```js
xhr.withCredentials = true;
```
但是这里仅仅是服务端能接收到，但是由于同源策略，会被挡住。同时还要在服务端设置
```js
'Access-Control-Allow-Origin': 'http://localhost:8080',
'Access-Control-Allow-Credentials': true
```
注意这里Origin不能设置通配符，只能具体指定。

### 1.cookie的 domain（可以访问此cookie的域名）

只能指定当前域名，或者其父域名，比如当前a.domain.com
则 domain可以指定为 a.domain.com 或者 domain.com 其它一律失效。
因此，利用cookie-session实现单点登录，在同一个父域下，非常好实现，将其设置为顶域

举例 sso.domain.com  a.domain.com   b.domain.com
在sso.domain.com下登陆，然后将domain设置为domain.com，则另外两个子域就都能获取到。
同时还有一个session一致性的问题，详见 整理-cookie-session

* 单台服务器保存
* nginx配ip_hash（一种负载均衡方案）
* 存数据库里，每次查表
* redis（不了解）

### 2.cookie的 path（可以访问此cookie的页面路径）

子路径可以访问父路径，但是父路径不能拿到子路径的cookie，比如

* '/': 则所有路径都能获取
* '/test': 则只有test路径下的能获取，根路径无法获取

### 3.cookie的 httpOnly（见整理-cookie-session）

HttpOnly

* 设置后无法通过在js中使用document.cookie访问
* 保障安全，防止攻击者盗用用户cookie

### 4.cookie的 session （失效）

和SessionStorage不一样，当浏览器关闭后，cookie才失效，而非窗口关闭



## 五、localStorage跨域