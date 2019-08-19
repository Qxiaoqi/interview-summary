## Cookie 和 Session

Cookie： Cookie是客户端保存用户信息的一种机制，用来记录用户的一些信息。存放在客户端，上限（4KB）。

Session（有状态）：典型场景购物车，服务端需要为用户创建特定的Session，用于标识用户。可以存在内存、数据库里面。

## Cookie

服务器通过设置set-cookie这个响应头，将cookie信息返回给浏览器，浏览器将响应头中的cookie信息保存在本地，当下次向服务器发送HTTP请求时，浏览器会自动将保存的这些cookie信息添加到请求头中。

### Cookie属性 

* max-age
  * 过期时间有多长
  * 默认在浏览器关闭时失效
* expires
  * 到哪个时间点过期
* secure
  * 表示这个cookie只会在https的时候才会发送
* HttpOnly
  * 设置后无法通过在js中使用document.cookie访问
  * 保障安全，防止攻击者盗用用户cookie
* domain
  * 表示该cookie对于哪个域是有效的。

## Session

服务端标识用户需要用到Cookie，在Cookie中记录Session ID。如果浏览器禁用，可以URL重写，即每次HTTP交互都在URL后面加上一个例如sid=xxxxx的参数

## 分布式Session一致性如何解决？

场景：多台服务器情况下，用户请求服务器A，拿到Session后。再次请求服务器B，服务器B中没有该用户的Session，因此需要再次创建新的SessionID，这就是产生的问题。

* cookie来存session（安全性并不可靠，而且cookie有大小限制4KB，无法存更多东西）
* 使用单台服务器保存所有Session，但是缺点是依赖程度比较高
* Nginx配ip_hash（得到ip后通过hash函数得到一个数值，然后对服务器列表大小进行取模运算，结果就是服务器序号），同一个ip只能在指定的机器上访问，可以解决Session。（Upstream模块实现负载均衡）
* 存到数据库里，同步Session，效率不太高
* 存放在redis里，当然redis我不太了解，就不详细说了
* token代替（JWT），因为JWT方案不需要服务端存Session，自然也就没这个问题了。

### Session加密/解密过程

#### 若本次cookie中没有connect.sid，则生成一个 [用secret生成connect.sid]

1. 用uid-safe生成一个唯一id，记为sessionid，保证每次不重复；

2. 把上面的connect.sid制作成 's:' + sessionid + '.' + sessionid.sha256(secret).base64() 的形式，实现在node-cookie-signature的sign函数；

3. 把sessionid用set-cookie返回给前端；

#### 若本次cookie中包含connect.sid，则验证它是否是本服务器生成的 [用secret验证connect.sid]

1. 取出cookie中的connect.sid，形式是上面的 's:' + sessionid + '.' + sessionid.sha256(secret).base64() ；

2. 从connect.sid中截取出sessionid=connect.sid.slice(2, connect.sid.indexOf(’.’))；

3. 用取出的sessionid再算一次 sessionid.sha256(secret).base64() 记为 mac；

4. 截取connect.sid中’.'后的部分与mac对比；node-cookie-signature的unsign函数（用上次计算的sha256值和这次计算的sha256值进行比较，只要secret一样，结果就一样）；

5. 验证成功的sessionid继续往下走。