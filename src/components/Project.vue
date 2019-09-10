<template>
    <li>{{ name }}</li>
</template>

<script>
export default {
  name: 'Project',
  props: {
    name: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.phase {
    width:300px;
    height:100%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
