<template>
  <div class="phase" v-bind:style="borderStyle">
    <h3>{{ phase.title }}</h3>
    <ul>
      <draggable v-model="phase.projects" group="projects" @start="drag=true" @end="drag=true" @change="handleChange">
        <Project 
          v-for="item in phase.projects"
          :key="item.id"
          :project="item"
          :class="item.type"
          :users="users"
          :allProjects="phases"
        />
      </draggable>
    </ul>
  </div>
</template>

<script>
import Project from './Project.vue'
import draggable from 'vuedraggable'
import axios from 'axios'
import keys from '../../keys.js'
export default {
  name: 'Phase',
  props: {
    phase: Object,
    users: Array,
    phases: Array,
    color: String
  },
  components: {
    Project,
    draggable
  },
  computed: {
    borderStyle() {
      return {
        'border-top': `20px solid ${this.color}`
        }
    }
  },
  methods: {
    async handleChange(e) {
      //Updating the asset remotely
      if (e.added) {
        const data =  {
          project: {
              customStatusId: this.phase.id
            }
        };
        const config = {
          headers: {'Authorization': 'Bearer ' + keys.WRIKE_TOKEN}
        }
        axios.put(`https://www.wrike.com/api/v4/folders/${e.added.element.id}`, data, config);
        //axios.post(`http://52.14.240.149/update-project-status`, data);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.phase {
    width:300px;
    height:100%;
    border: 1px solid steelblue;
    margin: 10px;
    padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}


</style>
