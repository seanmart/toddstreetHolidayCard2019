<template lang="html">

  <div class="building">
    <slot name="roof"/>
    <img :src="img('snowPile.svg')" class="scroll-item snow"/>
    <div class="front outline" :style="{background: me.front}">
      <div class="brick"/>
      <div class="roof outline" :style="{backgroundColor: me.roofFront}"/>
      <div class="roof-shadow" :style="{backgroundColor: me.roofFrontShadow}">
        <roof-arch
        v-for="i in me.arches"
        :key="i"
        :side="me.roofArchSide"
        :front="me.roofArchFront"
        />
      </div>
      <div class="windows">
        <slot/>
      </div>
    </div>
    <div class="side outline" :style="{background: me.side}">
      <div class="brick"/>
      <div class="roof outline" :style="{backgroundColor: me.roofSide}"/>
      <div class="roof-shadow" :style="{backgroundColor: me.roofSideShadow}"/>
    </div>
  </div>

</template>

<script>
import roofArch from '@/components/roofArch'
import roofSnow from '@/components/roofSnow'
export default {
  components:{roofArch,roofSnow},
  props:{
    props: Object
  },
  methods:{
    img(i){
      return require(`@/assets/${i}`)
    }
  },
  computed:{
    me(){
      return{
        arches: 3,
        front: 'linear-gradient(132deg, rgba(230,230,230,1) 0%, rgba(215,215,215,1) 100%)',
        roofFront: '#fff',
        roofFrontShadow: 'rgba(0,0,0,.1)',
        side: '#999',
        roofSide:'#bbb',
        roofSideShadow:'rgba(0,0,0,.1)',
        roofArchFront: '#eee',
        roofArchSide: '#999',
        ...this.props
      }
    }
  }
}
</script>

<style lang="css">
.building{
  display: flex;
  align-items: stretch;
  position: relative;
}

.building .front,
.building .side{
  position: relative;
  z-index: 1;
}

.building .roof{
  transition: .25s;
  height: 30px;
  margin: 0px -1.5vw;
  background-color: white;
  position: relative;
  z-index: 1;
}

.building .snow{
  position: absolute;
  width: 50%;
  top: 0px;
  right: 0px;
  animation: grow 40s forwards;
}

.building .roof-shadow{
  height: 60px;
  display: flex;
  justify-content: space-around
}

.building .roof-shadow .roof-arch{
  height: 70%;
  max-height: 8vw;
  flex: 0 0 auto;
  position: relative;
  z-index: 1;
}

.building .windows{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 7% 7% 0%;
}

.building .ground-floor{
  height: 40vw;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 10%;
  padding-bottom: 0px;
}

.building .front{
  flex: 0 0 80%;
  position: relative;
}

.building .side{
  flex: 0 0 20%;
  position: relative;
}

.building .brick{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-image: url('../assets/buildingTopBorder.svg');
  background-size: 10vw 10vw;
}

</style>
