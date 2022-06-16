// 实现插件：
// 1. 声明一个Store类：维护响应式state，暴露commit/dispatch
// 2. install: 注册$store

class Store {
  constructor(options) {
    // 保存选项
    this.$option = options;

    this._mutation = options.mutations;
    this._action = options.actions;
    this._wrappedGetters = options.getters;

    // 定义computed选项
    const computed = [];

    // 挂在store上, 可以通过$store.getters获取
    this.getters = {};

    const store = this;

    //
    Object.keys(this._wrappedGetters).forEach((key) => {
      // 获取用户定义的getters
      const fn = store._wrappedGetters[key];

      // 转化为computed可以使用的无参数形式
      computed[key] = function () {
        return fn(store.state);
      };

      // 为getters定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key],
      });
    });

    // 实现通过vue实例, 实现state的响应式
    this._vm = new Vue({
      data() {
        return {
          $$state: options.state,
        };
      },
      computed,
    });

    // 将commit和dispatch绑定到this
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  commit(type, payload) {
    const entry = this._mutation[type];
    if (!entry) {
      console.error("无效的mutation类型");
      return;
    }
    entry(this.state, payload);
  }

  dispatch(type) {
    const entry = this._action[type];
    console.log(entry);
    if (!entry) {
      console.error("无效的action类型");
      return;
    }
    entry(this);
  }

  get state() {
    return this._vm._data.$$state;
  }

  set state(v) {
    // 只允许通过mutations改变state
    console.error("请使用reaplaceState()去修改状态");
  }
}

let Vue;

// 注册vue插件
function install(_vue) {
  // 缓存vue实例
  Vue = _vue;

  Vue.mixin({
    beforeCreate() {
      // 将$store挂载到vue原型上
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default { Store, install };
