class eventObs {
  constructor() {
    this.handleFunc = {
      /* 
        type1: [],
        type2: []
        ……
      */
    }
  }

  add(type, func) {
    // 添加
    if (this.handleFunc[type]) {
      // 如果存在该类别
      if (this.handleFunc[type].indexOf(func) === -1) {
        // 如果该类别没有该方法，push存入
        this.handleFunc[type].push(func);
      }
    } else {
      // 如果不存在该类别，那么创建一个
      this.handleFunc[type] = [func];
    }
  }

  off(type, func) {
    // 移除目标类别的指定方法
    try {
      // 存目标type的数组
      let target = this.handleFunc[type];
      let index = target.indexOf(func);
      if (index === -1) {
        // 没有查到该方法，抛错
        throw error;
      }
      target.splice(index, 1);
    } catch(e) {
      console.log("没有找到目标方法")
    }
  }

  trigger(type, func) {
    // 触发目标事件，需要判断传入参数是一个还是两个
    try {
      if (arguments.length === 1) {
        // 传入参数只有一个，目标type内方法全部执行
        let target = this.handleFunc[type];
        for (let i = 0; i < target.length; i++) {
          target[i]();
        }
      } else {
        let target = this.handleFunc[type];
        let index = target.indexOf(func);
        if (index === -1) {
          throw error;
        }
        target[index]();
      }
      // 说明能操作，后面once需要用
      return true;
    } catch(e) {
      console.log("没找到目标");
      return false;
    }
  }

  once(type, func) {
    this.trigger(type, func)
    ? this.off(type, func)
    : null;
  }
}