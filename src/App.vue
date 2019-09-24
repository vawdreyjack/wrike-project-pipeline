
<!-- Our main app component -->

<template>
  <div id="app">
    <div id="toolbar">
      <h2>Average days in pipeline</h2>
      <ul>
        <li v-for="(num, type) in avgTimeByType" v-bind:num="num">{{ type }}: {{ num }}</li>
      </ul>
    </div>
    <div id="phase-cont">
      <Phase
      v-for="phase in phases"
      v-bind:phase="phase"
      v-bind:key="phase.id"
      v-bind:class="phase.title"
      />
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
      isReady: false
    }
  },
  computed: {
    avgTime() {
      const fullArray = this.phases.reduce((acc, val) => {
          const pArray = val.projects.map(project => (new Date().getTime() - new Date(project.createdDate).getTime()) / (24 * 3600 * 1000));
          return [...acc, ...pArray]
      }, []);
      return Math.round(fullArray.reduce((a,b) => a + b, 0) / fullArray.length);
    },
    avgTimeByType() {
      const arrays = this.phases.reduce((acc, val) => {
        val.projects.forEach(project => {
          const days = (new Date().getTime() - new Date(project.createdDate).getTime()) / (24 * 3600 * 1000);
          !(acc[project.type]) ? acc[project.type] = [days] : acc[project.type].push(days);
        })
        return acc;
      }, {});
      const averages = Object.keys(arrays).reduce((acc, val) => {
        const averageDays = Math.round(arrays[val].reduce((a,b) => a + b, 0) / arrays[val].length);
        acc[val] = averageDays;
        return acc;
      }, {});
      return averages;
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
#phase-cont {
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
