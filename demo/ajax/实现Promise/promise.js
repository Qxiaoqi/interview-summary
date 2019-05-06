// 定义三种状态
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";


// // 构造形式
// const promise = new Promise(function(resolve, reject) {
//   /* 
//     成功即传入value
//     失败即传入reason
//   */
// }) 

// 传入函数
function MPromise(func) {
  let _self = this;
  _self.status = PENDING; // 初值
  _self.data = undefined; // Promise初始返回值
  _self.onResolvedCallbacks = []; // resolved时回调函数集
  _self.onRejectedCallbacks = []; // rejected时回调函数集

  _self.resolve = function(value) {
    if (_self.status === PENDING) {
      _self.status = RESOLVED;
      _self.data = value;
      _self.onResolvedCallbacks.forEach(cb => cb(value));
    }
  }

  _self.reject = function(value) {
    if (_self.status === PENDING) {
      _self.status = REJECTED;
      _self.data = value;
      _self.onRejectedCallbacks.forEach(cb => cb(value));
    }
  }

  try {
    func(_self.resolve, _self.reject);
  } catch(e) {
    reject(e);
  }
}

// 实现then方法
MPromise.prototype.then = function(onResolved, onRejected) {
  let _self = this;
  let promise2;   // 返回新对象
  
  // 标准，then参数不是function则需忽略
  onResolved = typeof onResolved === "function" ? onResolved : function(v) {return v};
  onRejected = typeof onRejected === "function" ? onRejected : function(r) {throw r};

  if (_self.status === RESOLVED) {
    return promise2 = new MPromise(function(resolve, reject) {
      try {
        let x = onResolved(_self.data);
        if (x instanceof MPromise) {
          x.then(resolve, reject);
        }
        resolve(x);
      } catch(e) {
        reject(x);
      }
    })
  }

  if (_self.status === REJECTED) {
    return promise2 = new MPromise(function(resolve, reject) {
      try {
        let x = onRejected(_self.data);
        if (x instanceof MPromise) {
          x.then(resolve, reject);
        }
        resolve(x);
      } catch(e) {
        reject(x);
      }
    })
  }

  if (_self.status === PENDING) {
    return promise2 = new MPromise(function(resolve, reject) {
      _self.onResolvedCallbacks.push(function(value) {
        try {
          let x = onResolved(_self.data);
          if (x instanceof MPromise) {
            x.then(resolve, reject);
          }
        } catch(e) {
          reject(x);
        }
      })

      _self.onRejectedCallbacks.push(function(reason) {
        try {
          let x = onRejected(_self.data);
          if (x instanceof MPromise) {
            x.then(resolve, reject);
          }
        } catch(e) {
          reject(x);
        }
      })
    })
  }
}


// 实现catch方法
MPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}

const promise = new MPromise(function(resolve, reject) {
  console.log("MPromise");
});

promise
  .then(response => {
    console.log(response);
    console.log("then回调");
  })

promise.resolve("second");

promise
  .then()
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })