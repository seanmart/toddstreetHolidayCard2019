<template lang="html">
  <div class="window">
      <div class="wrapper" :style="{borderColor: border}">
        <div class="inner-wrapper">
          <div class="shadow"/>
          <div class="content" :style="windowStyle"/>
        </div>
        <windowSnow class="snow"/>
      </div>
  </div>
</template>

<script>
import windowSnow from '@/components/windowSnow'
export default {
  components:{windowSnow},
  props:{
    image: {type: String, default: null},
    color: {type: String, default: null},
    border: {type:String, default: '#aaa'}
  },
  computed:{
    windowStyle(){
      if (this.image){
        let image = require('@/assets/' + this.image)
        return {backgroundImage: `url(${image})`}
      }
      if (this.color) return {backgroundColor: this.color}
      return {}
    }
  }
}
</script>

<style lang="css">

.window {
    flex: 0 0 50%;
    height:auto;
    padding: 5%
}

.window:before {
    content:'';
    float:left;
    padding-top:100%;
}

.window .wrapper{
  border-width: 1vw;
  border-style: solid;
  height: 100%;
  position: relative;
  z-index: 1;
}

.window .inner-wrapper{
  height: 101%;
  width: 101%;
  overflow: hidden;
  position: relative;
}

.window .content,
.window .shadow{
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
}

.window .shadow{
  box-shadow: inset 10px 10px 0px rgba(0,0,0,.3);
}

.window .content{
  background-size: cover;
  background-position: center center;
  z-index: -1;
  transition: transform .5s ease;

}

.window:hover .content{
  transform: scale(1.1)
}

.window .snow{
  fill: white;
  position: absolute;
  top: 95%;
  left: -10%;
  width: 120%;
}


@media screen and (max-width: 600px){
  .window{
    flex: 0 0 100%;
  }
}
</style>
