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
          <logo class="logo" />
          <img :src="img('happyHolidays.svg')" class="happy-holidays"/>
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
              :image="item.art"
              :imageId="i"
              :border="mainBuilding.roofArchSide"
              @selected="setImage($event)"
              effect
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
          <img class="snowpile" :src="img('snowPile.svg')"/>
          <div class="top"/>
          <div class="side"/>
        </div>
        <div class="road">
          <h1>From Our toddstreet House to Yours,</h1>
          <img :src="img('happyHolidaysBlue.svg')"/>
        </div>
      </div>
    </div>
    <div id="lightbox" :class="{show: selected !== null}" v-touch @click="unsetImage">
      <div class="images">
        <div
          v-for="(item,i) in images"
          :key="i"
          class="image"
          :class="{show: selected === i}"
          >
            <img v-if="item.art" :src="img(item.art)" class="art">
            <img
            v-if="item.message"
            :src="img(item.message.image)"
            :style="item.message.position || {left: 0, top: 0}"
            class="message"
            />
        </div>
      </div>
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
    makeItSnow
  },
  data(){
    return{
      selected: null
    }
  },
  mounted() {
    gsap.to('#page', 3,{opacity: 1, delay: .5})
    scrollBuddy();
  },
  methods:{
    img(i){
      return require(`@/assets/${i}`)
    },
    setImage(id){
      this.selected = id
      this.$nextTick(()=>{
        let tl = gsap.timeline()
        tl.set('#lightbox .images',{scale:.9})
        tl.set('#lightbox .message',{scale: .5,opacity: 0})
        tl.to('#scene',.5,{opacity:0})
        tl.to('#lightbox .images',.25,{opacity:1, scale: 1},0)
        tl.to('#lightbox .message',.25,{opacity: 1, scale: 1},.5)
      })
    },
    unsetImage(){
      let tl = gsap.timeline()
      tl.to('#lightbox .images',.25,{opacity:0})
      tl.to('#scene', .25,{opacity: 1},0)
      tl.add(()=>this.selected = null)
    }
  },
  computed: {
    images() {
      return [
        {
          art:"images/delivery-art.jpg",
          message:{
            image: "images/delivery-message.svg",
            position: {right: '5%', bottom: '8%', width: '40%'}
          }
        },
        {
          art:"images/movie-art.jpg",
          message:{
            image: "images/movie-message.svg",
            position: {top: '5%', left: '5%', width: '90%'}
          }
        },
        {
          art:"images/flour-art.jpg",
          message:{
            image: "images/flour-message.svg",
            position: {left: '5%', bottom: '5%', width: '45%'}
          }
        },
        {
          art:"images/august-art.jpg",
          message:{
            image: "images/august-message.svg",
            position: {top: '5%', right: '5%', width: '30%'}
          }
        },
        {
          art:"images/peeling-art.jpg",
          message:{
            image: "images/peeling-message.svg",
            position: {bottom: '5%', left: '5%', width: '90%'}
          }
        },
        {
          art:"images/roof-art.jpg",
          message:{
            image: "images/roof-message.svg",
            position: {bottom: '15%', right: '7%', width: '40%'}
          }
        },
        {
          art:"images/roasting-art.jpg",
          message:{
            image: "images/roasting-message.svg",
            position: {bottom: '5%', right: '5%', width: '60%'}
          }
        },
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
  font-weight: 300;
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
  padding-top: 85vh;
  overflow: hidden;
  position: relative;
  text-align: center;
}

#lightbox{
  position: fixed;
  z-index: 20;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  display: none;
  transition: transform .25s;
}

#lightbox.active{
  transform: scale(.95)
}

#lightbox.show{
  display: block;
}

#lightbox .images{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#lightbox .image{
  flex: 0 0 auto;
  display: none;
  position: relative;
}

#lightbox .image.show{
  display: block;
}

#lightbox .art{
  max-height: 90vh;
  max-width: 100vw;
}

#lightbox .message{
  position: absolute;
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
  z-index: 10;
  position: absolute;
  top: 0px;
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#greeting .content {
  flex: 0 0 auto;
  width: 80vw;
  max-width: 500px;
  text-align: center;
}

#greeting .logo {
  fill: white;
  width: 200px;
  max-width: 30vw;
}

#greeting .happy-holidays{
  fill: white;
  width: 100%;
  margin: 5% 0px;
}

#greeting p{
  color: white;
  font-size: calc(14px + .5vw);
  display: inline-block;
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

#bottom .sidewalk{
  position: relative;
}

#bottom .sidewalk .snowpile{
  position: absolute;
  left: 30%;
  top: 0px;
  transform: translateY(-50%);
  width: 100vw;
  min-width: 600px;
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
  height: 80vh;
  min-height: 400px;
  width: 100%;
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 87%, rgba(186,210,255,1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10vw;
}

#bottom .road h1{
  margin-bottom: 5%;
}

#bottom .road img{
  width: 60vw;
  max-width: 500px;
}

@media screen and (max-width: 600px) {
  #scene {
    padding-top: 75vh;
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
