
<!-- Our main app component -->

<template>
  <div id="app">
    <div id="pipe-metrics">
      <table>
        <tr><th>Category</th><th>Avg. Days in Pipe</th></tr>
        <tr v-for="(num, type) in avgTimeByType" v-bind:num="num" v-bind:key="type">
          <td>{{ type }}</td><td>{{ num }}</td>
        </tr>
      </table>
    </div>
    <Phase
    v-for="phase in phases"
    v-bind:phase="phase"
    v-bind:key="phase.id"
    v-bind:class="phase.title"
    />
  </div>
</template>

<script>
import Phase from './components/Phase.vue'
import request from './js/request.js'

let phases = [
    {id:"IEABFWPQJMA53SF4", title: 'Planned', projects: [{ id:1, title:"Project1"}, { id:2, title:"Project2"}]},
    {id:"IEABFWPQJMA53SGG", title: 'Writing', projects: [{ id:1, title:"Project1"}]},
    {id:"IEABFWPQJMA53SGQ", title: 'Editing', projects: [{ id:1, title:"Project1"}]},
    {id:"IEABFWPQJMA53SHE", title: 'Design', projects: [{ id:1, title:"Project1"}]},
    {id:"IEABFWPQJMA53SG2", title: 'Approval', projects: [{ id:1, title:"Project1"}]},
    {id:"IEABFWPQJMA53SHO", title: 'Publication', projects: [{ id:1, title:"Project1"}]},
    {id:"IEABFWPQJMA53SF5", title: 'Completed', projects: [{ id:1, title:"Project1"}]},
    {id:"IEABFWPQJMA53SHZ", title: 'Review', projects: [{ id:1, title:"Project1"}]}
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
  grid-template-columns: repeat(9, 1fr);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px 10px 0 0;
}

#pipe-metrics {
  min-width: 400px;
}

#pipe-metrics table {
  text-align: left;
  font-size: 30px;
  border-collapse: collapse;
  vertical-align: center;
}

#pipe-metrics table, th, td {
  border: 1px solid #999;
}

#pipe-metrics th, td {
  padding: 10px;
}
</style>
