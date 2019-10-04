<template>
    <li>
      <span>{{ project.title }}</span>
      <span><div class="image-cropper"><img class="avatar" :src="avatarUrl"></div></span>
      
      <span><hr></span>
      <span></span>
      <span>Created {{ daysInPipe }}</span>
      <span style="justify-self:right;"><a :href="project.permalink" target="_blank"><img src="../assets/icons/external-link.png"></a></span>
    </li>
</template>

<script>
import moment from 'moment';
export default {
  name: 'Project',
  props: {
    project: Object,
    users: Array
  },
  computed: {
    daysInPipe() {
      return (this.project.project) ? moment(this.project.project.createdDate).fromNow() : null;
    },
    avatarUrl() {
      return this.users.filter(user => user.id == this.project.project.ownerIds[0])[0].avatarUrl;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

li {
  display: grid;
  grid-template-columns: 1fr 60px;
  grid-column-gap: 2px;
  min-height: 50px;
  text-align: left;
  margin: 0 10px;
  padding: 10px;
  border: 1px solid #666;
  margin: 5px;
  cursor: grab;
}

li span {
  align-self: top;
}

img.avatar {
  width:100%;
}

.image-cropper {
    width: 50px;
    height: 50px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
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

.Video {
  border-top: 10px solid #FF98ee;
}

</style>
