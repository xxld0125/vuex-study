<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>{{ $store.state }}</div>
    <div @click="$store.commit('addCount')">
      同步修改count: {{ $store.state.count }}
    </div>
    <div @click="$store.dispatch('asyncAddCount')">
      异步count: {{ $store.state.count }}
    </div>
    <div>doubleCount: {{ $store.getters.doubleCount }}</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
