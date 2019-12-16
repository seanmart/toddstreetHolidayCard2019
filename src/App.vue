<template>
  <div id="page">
    <div id="scene" ref="scene">
      <div id="sky" />
      <div id="skyline" class="scroll-item" data-speed=".5">
        <div class="art"><skyline /></div>
        <div class="color" />
      </div>
      <div id="greeting">
        <div class="content scroll-item" data-speed="-.2">
          <happy-holidays class="happy-holidays"/>
          <logo class="logo" />
          <p>
            Click inside the windows of our Holiday house for a few festive
            scenes. Some might even be similar to your own!
          </p>
        </div>
      </div>
      <div id="buildings">
        <building class="left" :props="leftBuilding">
          <template v-for="i in images.length - 2">
            <building-window :key="i" color="#777" />
          </template>
        </building>

        <building class="main" :props="mainBuilding">
          <template v-slot:roof>
            <water-tower class="water-tower" />
            <view-finder class="view-finder"/>
          </template>

          <template v-for="(item, i) in images">
            <building-window
              :key="i"
              :lights="item.effect ==='lights'"
              :bulbs="item.effect ==='bulbs'"
              :image="item.image"
              :border="mainBuilding.roofArchSide"
              @selected="setImage($event)"
            />
          </template>
        </building>

        <building class="right" :props="rightBuilding">
          <template v-for="i in images.length - 2">
            <building-window :key="i" color="#777" />
          </template>
        </building>
      </div>
      <div id="bottom">
        <div class="sidewalk">
          <div class="top"/>
          <div class="side"/>
        </div>
        <div class="road"/>
      </div>
    </div>
    <div v-if="image" id="image">
      <img :src="require(`@/assets/${image}`)"/>
    </div>
    <make-it-snow />
  </div>
</template>

<script>
import building from "@/components/building";
import skyline from "@/components/skyline";
import waterTower from "@/components/waterTower";
import viewFinder from '@/components/viewFinder'
import makeItSnow from "@/components/makeItSnow";
import buildingWindow from "@/components/window";
import happyHolidays from "@/components/happyHolidays";
import logo from "@/components/logo";
import scrollBuddy from "@/assets/scripts/scrollBuddy";
import gsap from 'gsap'
export default {
  components: {
    building,
    buildingWindow,
    skyline,
    waterTower,
    viewFinder,
    logo,
    happyHolidays,
    makeItSnow
  },
  data(){
    return{
      image: null
    }
  },
  mounted() {
    gsap.to('#page', 3,{opacity: 1, delay: .5})
    scrollBuddy();
  },
  methods:{
    setImage(img){

      window.addEventListener('click', this.unsetImage)
      this.image = img

      this.$nextTick(()=>{
        let tl = gsap.timeline()
        tl.set('#image',{scale:.9})
        tl.to('#scene',.5,{opacity:0, pointerEvents: 'none'})
        tl.to('#image',.25,{opacity:1, scale: 1},0)
      })
    },
    unsetImage(){

      window.removeEventListener('click', this.unsetImage)

      let tl = gsap.timeline()
      tl.to('#image',.25,{opacity:0})
      tl.to('#scene', .25,{opacity: 1,pointerEvents:""},0)
      tl.add(()=>this.image = null)
    }
  },
  computed: {
    images() {
      return [
        {image:"images/delivery.jpg", effect: 'lights'},
        {image:"images/movie.jpg", effect: 'bulbs'},
        {image:"images/flour.jpg", effect: 'bulbs'},
        {image:"images/august.jpg", effect: 'lights'},
        {image:"images/peeling.jpg", effect: 'lights'},
        {image:"images/roof.png", effect: 'bulbs'},
        {image:"images/roasting.jpg", effect: 'bulbs'},
      ];
    },
    leftBuilding() {
      return {
        arches: 4,
        front:
          "linear-gradient(132deg, rgba(232,232,232,1) 0%, rgba(195,195,195,1) 69%, rgba(91,91,91,1) 100%)",
        roofFront: "#fff",
        roofFrontShadow: "rgba(0,0,0,.1)",
        side: "#999",
        roofSide: "#bbb",
        roofSideShadow: "rgba(0,0,0,.1)",
        roofArchFront: "#eee",
        roofArchSide: "#999"
      };
    },
    mainBuilding() {
      return {
        arches: 4,
        front:
          "linear-gradient(132deg, rgba(213,236,255,1) 0%, rgba(142,205,255,1) 100%)",
        roofFront: "#fff",
        roofFrontShadow: "rgba(47,65,85,.2)",
        side:
          "linear-gradient(270deg, rgba(0,16,29,1) 0%, rgba(0,43,77,1) 100%)",
        roofSide: "#5f85af",
        roofSideShadow: "rgba(0,0,0,.4)",
        roofArchFront: "#d9f1fb",
        roofArchSide: "#5f85af"
      };
    },
    rightBuilding() {
      return {
        arches: 4,
        front:
          "linear-gradient(132deg, rgba(232,232,232,1) 0%, rgba(195,195,195,1) 69%, rgba(91,91,91,1) 100%)",
        roofFront: "#fff",
        roofFrontShadow: "rgba(0,0,0,.1)",
        side: "#999",
        roofSide: "#bbb",
        roofSideShadow: "rgba(0,0,0,.1)",
        roofArchFront: "#eee",
        roofArchSide: "#999"
      };
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap");

html {
  background: #74bfde;
  font-family: "Roboto Slab", serif;
  font-weight: 500;
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

#page{
  opacity: 0;
}

#scene {
  width: 100vw;
  padding-top: 80vh;
  overflow: hidden;
  position: relative;
  text-align: center;
}

#image{
  position: fixed;
  z-index: 20;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5% 0px;
}

#image img{
  flex: 0 0 auto;
  max-width: 100%;
  max-height: 100%;
}

#sky {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 150vh;
  background: rgb(207, 207, 207);
  background: linear-gradient(0deg, #c0edff 0%, #74bfde 100%);
}

#skyline {
  opacity: 0.8;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
}

#skyline .art {
  flex: 0 0 90vh;
  fill: #74bfde;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

#skyline svg {
  flex: 0 0 120vw;
  min-width: 1000px;
}

#skyline .color {
  background: #74bfde;
  flex: 1 1 auto;
}

#greeting {
  position: absolute;
  top: 0px;
  height: 60vh;
  width: 100%;
  padding: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

#greeting .content {
  width: 70vw;
  text-align: center;
}

#greeting .logo {
  fill: white;
  margin-bottom: 2vw;
  display: none;
}

#greeting .happy-holidays{
  fill: white;
  width: 100%;
  margin-bottom: 2vw;
}

#greeting p{
  color: white;
  font-size: calc(13px + 1vw);
  display: inline-block;
  max-width: 600px;
}

#buildings {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: stretch;
  min-height: 100vh;
  transform-origin: bottom;
}

.building {
  flex: 0 0 90vw;
}

.building.left {
  margin-top: 120px;
  transform: translateX(25%);
}

.building.right {
  margin-top: 90px;
  transform: translateX(-10%);
}

.building.main .water-tower {
  position: absolute;
  bottom: 100%;
  right: 3%;
  height: 30vw;
  max-height: 300px;
  z-index: 1;
}

.building.main .view-finder {
  position: absolute;
  bottom: 100%;
  right: 17%;
  height: 15vw;
  max-height: 100px;
  z-index: 1;
  fill: #2f4155;
}

#bottom{
  position: relative;
  z-index: 1;
}

#bottom .sidewalk .top{
  height:15vh;
  width: 100%;
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 87%, rgba(186,210,255,1) 100%);
}

#bottom .sidewalk .side{
  height:3vh;
  width: 100%;
  background: rgb(150,150,150);
  background: linear-gradient(180deg, rgba(78,78,78,1) 0%, rgba(100,100,100,1) 100%);
}

#bottom .road{
  height: 30vh;
  width: 100%;
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 87%, rgba(186,210,255,1) 100%);
}

@media screen and (max-width: 600px) {
  #scene {
    padding-top: 70vh;
  }

  #greeting {
    height: 60vh;
  }

  #skyline .art {
    transform: translateX(15%);
    flex: 0 0 80vh;
  }

  .building.main .view-finder{
    right: 20%;
  }
}
</style>
