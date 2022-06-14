// 实现插件：
// 1. 声明一个Store类：维护响应式state，暴露commit/dispatch
// 2. install: 注册$store

class Store {
  constructor(options) {
    // 保存选项
    this.$option = options;

    this._mutation = options.mutations;
    this._action = options.actions;
    this._getter = options.getters;

    // 实现通过vue实例, 实现state的响应式
    this._vm = new Vue({
      data() {
        return {
          $$state: options.state,
        };
      },
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
