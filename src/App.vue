
<!-- Our main app component -->

<template>
  <div id="app">
    <Phase
    v-for="phase in phases"
    v-bind:phase="phase"
    v-bind:key="phase.id"
    v-bind:class="phase.title"
    />
    <div v-if="isReady">
      <ul>
        <li v-for="(item, index) in childFolders" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Phase from './components/Phase.vue'
import request from './js/request.js'

let phases = [
    {id:1,title: 'Planned', projects: [{ id:1, title:"Project1"}, { id:2, title:"Project2"}]},
    {id:2,title: 'Writing', projects: [{ id:1, title:"Project1"}]},
    {id:3,title: 'Editing', projects: [{ id:1, title:"Project1"}]},
    {id:4,title: 'Design', projects: [{ id:1, title:"Project1"}]},
    {id:5,title: 'Approval', projects: [{ id:1, title:"Project1"}]},
    {id:6,title: 'Publication', projects: [{ id:1, title:"Project1"}]},
    {id:7,title: 'Completed', projects: [{ id:1, title:"Project1"}]},
    {id:8,title: 'Review', projects: [{ id:1, title:"Project1"}]}
  ];

export default {
  name: 'app',
  components: {
    Phase
  },
  data() {
    return {
      phases: phases,
      childFolders: Array,
      isReady: false,
      folders: Array
    }
  },
  methods: {

  },
  mounted : async function() {
    const data = await request();
    console.log(data);
    //this.phases = this.phases.map(phase => phase.projects = data[phase.title]);
    this.phases.forEach(phase => {
      phase.projects = data[phase.title];
    });
    console.log(this.phases);
  }
}
</script>

<style>
#app {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px 10px 0 0;
}
</style>
