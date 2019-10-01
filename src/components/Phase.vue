<template>
  <div class="phase">
    <h3>{{ phase.title }}</h3>
    <ul>
        <Project 
        v-for="item in phase.projects"
        :key="item.id"
        :project="item"
        :class="item.type"
        />

    </ul>
  </div>
</template>

<script>
import Project from './Project.vue'
import draggable from 'vuedraggable'
export default {
  name: 'Phase',
  props: {
    phase: Object
  },
  components: {
    Project,
    draggable
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

.Planned {
  border-top: 20px solid #E91D63;
}

.Writing {
  border-top: 20px solid #8BC34A;
}

.Editing {
  border-top: 20px solid #009588;
}

.Design {
  border-top: 20px solid #9C27B0;
}

.Approval {
  border-top: 20px solid #00BCD4;
}

.Publication {
  border-top: 20px solid #2096F3;
}

.Completed {
  border-top: 20px solid #8BC34A;
}

.Review {
  border-top: 20px solid #CDDC39;
}

</style>
