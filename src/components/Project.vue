<template>
    <li>
      <span>{{ project.title }}</span>
      <span style="justify-self:right;"><a :href="project.permalink" target="_blank"><img src="../assets/icons/external-link.png"></a></span>
      <span><hr></span>
      <span></span>
      <span>{{ daysInPipe }}</span>
    </li>
</template>

<script>
import moment from 'moment';
export default {
  name: 'Project',
  props: {
    project: Object,
  },
  computed: {
    daysInPipe() {
      return (this.project.project) ? moment(this.project.project.createdDate).fromNow() : null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

li {
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-column-gap: 2px;
  min-height: 50px;
  text-align: left;
  margin: 0 10px;
  padding: 10px;
  border: 1px solid #666;
  margin: 5px;
}

li span {
  align-self: top;
}

.BP {
  border-top: 10px solid #E91D63;

}

.CS {
  border-top: 10px solid #1C2541;
}

.SE {
  border-top: 10px solid #8BC34A;
}

.PR {
  border-top: 10px solid #009588;
}

.eBook {
  border-top: 10px solid #9C27B0;
}

.RPT {
  border-top: 10px solid #00BCD4;
}

.Sales {
  border-top: 10px solid #2096F3;
}

.WP {
  border-top: 10px solid #8BC34A;
}

.IG {
  border-top: 10px solid #CDDC39;
}

.Email {
  border-top: 10px solid #FF9800;
}

</style>
