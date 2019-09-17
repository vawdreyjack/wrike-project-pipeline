<template>
    <li>{{ title }}</li>
</template>

<script>
export default {
  name: 'Project',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

li {
  text-align: left;
  margin: 0 10px;
  padding: 10px;
  border: 1px solid #666;
  margin: 5px;
  color: #fff;
}

.BP {
  background-color: green;

}

.CS {
  background-color: steelblue;
}

.SE {
  background-color: maroon;
}

.PR {
  background-color: tomato;
}

</style>
