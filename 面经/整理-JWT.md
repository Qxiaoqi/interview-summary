# JWT（无状态）

Header： 存类型还有加密方式，是Base64编码

Payload： 存JSON对象，传递需要的数据，但是不能放敏感信息，比如密码，是Base64编码

Signature：前两部分base64后加密钥

## 一、token生成原理

### 生成

* 将荷载payload，以及Header信息进行Base64加密，形成密文payload密文，header密文。

* 将形成的密文用句号连接起来，服务端秘钥进行HS256加密，生成签名。

* 将前面的两个密文后面用句号链接签名形成最终的token。

### 服务端验证

* 用户请求时携带此token（分为三部分，header密文，payload密文，签名）到服务端，服务端解析第一部分（header密文），用Base64解码，可以知道用了什么算法进行签名，此处解析发现是HS256。

* 服务端使用原来的秘钥与密文(header密文+"."+payload密文)同样进行HS256运算，然后用生成的签名与token携带的签名进行对比，若一致说明token合法，不一致说明原文被修改。

* 判断是否过期，客户端通过用Base64解密第二部分（payload密文），可以知道荷载中授权时间，以及有效期。通过这个与当前时间对比发现token是否过期。


## 二、服务端如何让token失效？

这个其实并没有一个很好的方案。

* 比如维护一个token和user的对应关系，存数据库里（但这样和session其实是一样的，还不如用session）

* 再比如维护一个黑名单，黑名单里存本身没有过期但又要令其无效的token。（这个方案较为合适，但是这样其实和JWT的无状态原则是相互违背的，服务端还是要存东西，虽然存的数据并不多）

所以说其实并没有一个非常好的方案让token失效。如果想要保证无状态原则，那只能将token过期的时间尽可能缩短。

## 和cookie-session对比（优点）

### 无状态

* 服务端不需要维护这个状态，数据都是存在客户端，节省服务端资源，因此没有分布式Session一致性问题。

* 符合RESTful API原则（无状态）

### 安全性（预防CSRF）

CSRF原理见 web安全-CSRF

CSRF 攻击之所以能够成功，是因为攻击者可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 Cookie 中，因此攻击者可以在不知道这些验证信息的情况下直接利用用户自己的 Cookie 来通过安全验证。

要抵御 CSRF，关键在于在请求中放入攻击者所不能伪造的信息，并且该信息不存在于 Cookie 之中。

token由服务端生成的，可以加载请求头里，如果没有被获取到，是没办法请求成功的。如果被获取到了，那就相当于发生了XSS，已不属于CSRF。


### 多平台跨域（单点登录）
