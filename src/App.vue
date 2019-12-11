<template>
  <div id="scene" ref="scene">
    <div id="sky"/>
    <div id="skyline" class="scroll-item" data-speed=".5">
      <skyline class="skyline" />
    </div>
    <div id="greeting">
      <div class="content scroll-item" data-speed="-.2">
        <logo class="logo"/>
        <p>Click inside the windows of our Holiday house for a few festive scenes. Some might even be similar to your own!
        </p>
      </div>
    </div>
    <div id="buildings">
      <building class="left" :props="leftBuilding">
        <template v-for="i in images.length - 2">
          <building-window :key="i" color="#777"/>
        </template>
      </building>

      <building class="main" :props="mainBuilding">

        <template v-slot:roof>
          <water-tower class="water-tower"/>
        </template>

        <template v-for="(image,i) in images">
          <building-window :key="i" :image="image" :border="mainBuilding.roofArchSide"/>
        </template>

      </building>

      <building class="right" :props="rightBuilding">
        <template v-for="i in images.length - 2">
          <building-window :key="i" color="#777"/>
        </template>
      </building>
    </div>
    <make-it-snow/>
  </div>
</template>

<script>
import building from '@/components/building'
import skyline from '@/components/skyline'
import waterTower from '@/components/waterTower'
import makeItSnow from '@/components/makeItSnow'
import buildingWindow from '@/components/window'
import logo from '@/components/logo'
export default {
  components:{building,buildingWindow,skyline,waterTower,logo,makeItSnow},
  name: 'app',
  data(){
    return{
      scrollItems: null
    }
  },
  mounted(){
    setTimeout(()=> this.$refs.scene.style.opacity = 1,250)

    if (window.innerWidth < 700) return

    let scrollItems = document.querySelectorAll('.scroll-item')
    this.scrollItems = Array.apply(null, scrollItems)
    window.addEventListener('scroll',this.handleScroll)
  },
  computed:{
    images(){
      return[
        'images/delivery.jpg',
        'images/movie.jpg',
        'images/flour.jpg',
        'images/august.jpg',
        'images/peeling.jpg',
        'images/roof.jpg',
        'images/roasting.jpg',
      ]
    },
    leftBuilding(){
      return{
        arches: 4,
        front: 'linear-gradient(132deg, rgba(232,232,232,1) 0%, rgba(195,195,195,1) 69%, rgba(91,91,91,1) 100%)',
        roofFront: '#fff',
        roofFrontShadow: 'rgba(0,0,0,.1)',
        side: '#999',
        roofSide:'#bbb',
        roofSideShadow:'rgba(0,0,0,.1)',
        roofArchFront: '#eee',
        roofArchSide: '#999'
      }
    },
    mainBuilding(){
      return{
        arches: 4,
        front: 'linear-gradient(132deg, rgba(213,236,255,1) 0%, rgba(142,205,255,1) 100%)',
        roofFront: '#fff',
        roofFrontShadow: 'rgba(47,65,85,.2)',
        side: 'linear-gradient(270deg, rgba(0,16,29,1) 0%, rgba(0,43,77,1) 100%)',
        roofSide:'#5f85af',
        roofSideShadow:'rgba(0,0,0,.4)',
        roofArchFront: '#d9f1fb',
        roofArchSide: '#5f85af'
      }
    },
    rightBuilding(){
      return{
        arches: 4,
        front: 'linear-gradient(132deg, rgba(232,232,232,1) 0%, rgba(195,195,195,1) 69%, rgba(91,91,91,1) 100%)',
        roofFront: '#fff',
        roofFrontShadow: 'rgba(0,0,0,.1)',
        side: '#999',
        roofSide:'#bbb',
        roofSideShadow:'rgba(0,0,0,.1)',
        roofArchFront: '#eee',
        roofArchSide: '#999'
      }
    }
  },
  methods:{
    handleScroll(){

      this.scrollItems.forEach( item => {
        let speed = item.getAttribute('data-speed')
        let distance = item.getAttribute('data-distance')
        let transformY = 0

        if (speed){
          transformY = window.scrollY * speed
        } else if (distance){
          transformY = (window.scrollY / document.body.clientHeight) * distance
        }

        item.style.transform = `translateY(${transformY}px)`
      })
    },

  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');

html{
  background: #74bfde;
  font-family: 'Roboto Slab', serif;
  font-weight: 500
}

*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

#scene{
  opacity: 0;
  transition: opacity 3s;
  width: 100vw;
  padding-top: 80vh;
  overflow: hidden;
  position: relative;
}

#sky{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 150vh;
  background: rgb(207,207,207);
  background: linear-gradient(0deg, #c0edff 0%, #74bfde 100%);
  z-index: -1;
}

#skyline{
  fill: #74bfde;
  opacity: .8;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 100vh;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
}

#skyline .skyline{
  flex: 0 0 auto;
  width: 120%;
  min-width: 1000px;
}

#greeting{
  position: absolute;
  top: 0px;
  height: 80vh;
  width: 100%;
  padding: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

#greeting .content{
  width: 70vw;
  max-width: 500px;
  text-align: center;
  color: white;
  font-size: calc(14px + 1vw);
}

#greeting .logo{
  fill: white;
  margin-bottom: 2vw;
}

#buildings{
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: stretch;
  min-height: 100vh;
}

.building{
  flex: 0 0 90%;
}

.building.left{
  margin-top: 120px;
  position: relative;
  z-index: -1;
  transform: translateX(26%);
}

.building.right{
  margin-top: 90px;
  transform: translateX(-10%);
}

.building.main .water-tower{
  position: absolute;
  bottom: 100%;
  right: 3%;
  height: 30vw;
  max-height: 300px;
  z-index: 1;
}



</style>
