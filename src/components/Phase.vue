<template>
  <div class="phase">
    <h3>{{ phase.title }}</h3>
    <ul>
        <Project 
        v-for="item in phase.projects"
        :key="item.id"
        :name="item.name"
        />
    </ul>
  </div>
</template>

<script>
import Project from './Project.vue'

export default {
  name: 'Phase',
  props: {
    phase: Object
  },
  components: {
    Project
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
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
