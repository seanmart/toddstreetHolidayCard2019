<template>
  <div id="page">
    <div id="scene" ref="scene" :class="{ hide: !ready }">
      <div id="sky" />
      <div id="skyline" class="scroll-item" data-speed=".5">
        <div class="art"><skyline /></div>
        <div class="color" />
      </div>
      <div id="greeting">
        <div class="content scroll-item" data-speed="-.4">
          <div class="logo">
            <logo />
          </div>
          <img :src="img('happyHolidays.svg')" class="happy-holidays" />
          <div class="text">
            <p>
              Click inside the windows of our Holiday house for a few festive
              scenes. Some might even be similar to your own!
            </p>
            <div class="arrow" @click="scrollTo('buildings')">
              <img :src="img('arrow.svg')" />
            </div>
          </div>
        </div>
      </div>
      <div id="buildings">
        <building class="left" :props="leftBuilding">
          <template v-for="i in images.length">
            <building-window :key="i" color="#777" />
          </template>
        </building>

        <building class="main" :props="mainBuilding">
          <template v-slot:roof>
            <water-tower class="pop water-tower"  />
            <view-finder class="pop view-finder" />
          </template>

          <template v-for="(item, i) in images">
            <building-window
              :key="i"
              :image="item.art"
              :imageId="i"
              :border="mainBuilding.border"
              @selected="setImage($event)"
              effect
            />
          </template>
          <buildingDoor
            :border="mainBuilding.border"
            :background="mainBuilding.door"
          />
        </building>

        <building class="right" :props="rightBuilding">
          <template v-for="i in images.length">
            <building-window :key="i" color="#777" />
          </template>
        </building>
      </div>
      <div id="bottom">
        <div class="sidewalk">
          <img class="snowpile" :src="img('snowPile.svg')" />
          <div class="top" />
          <div class="side" />
        </div>
        <div class="road" />
      </div>
    </div>
    <div
      id="lightbox"
      :class="{ show: selected !== null }"
      v-touch
      @click="unsetImage"
    >
      <div class="images">
        <div
          v-for="(item, i) in images"
          :key="i"
          class="image"
          :class="{ show: selected === i }"
        >
          <img v-if="item.art" :src="img(item.art)" class="art" />
          <img
            v-if="item.message"
            :src="img(item.message.image)"
            :style="item.message.position || { left: 0, top: 0 }"
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
import viewFinder from "@/components/viewFinder";
import makeItSnow from "@/components/makeItSnow";
import buildingWindow from "@/components/window";
import buildingDoor from "@/components/door";
import logo from "@/components/logo";
import scrollBuddy from "@/assets/scripts/scrollBuddy";
import gsap from "gsap";
export default {
  components: {
    building,
    buildingWindow,
    buildingDoor,
    skyline,
    waterTower,
    viewFinder,
    logo,
    makeItSnow
  },
  data() {
    return {
      selected: null,
      ready: false
    };
  },
  mounted() {
    let tl = gsap.timeline();
    tl.fromTo(
      "#greeting .logo svg",
      1.5,
      { y: "100%" },
      { y: 0, ease: "power4.out" },
      0
    );
    tl.fromTo(
      "#greeting .happy-holidays",
      2,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, ease: "power4.out" },
      0.85
    );
    tl.fromTo("canvas", 1, { opacity: 0 }, { opacity: 1 }, 1.5);

    let delay = 2.2;

    tl.to("#greeting", 1, { y: "-15vh", ease: "power2.inOut" }, delay);
    tl.fromTo(
      "#skyline",
      2,
      { opacity: 0, y: "-2%" },
      { opacity: 1, y: 0, ease: "power4.out" },
      delay
    );
    tl.fromTo(
      ".building",
      1.5,
      { y: "40vh" },
      { y: 0, stagger: 0.1, ease: "power4.out" },
      delay
    );
    tl.fromTo(
      ".pop",
      1,
      { y: "100%" },
      { y: 0, stagger: 0.1, ease: "power4.out" },
      delay + 0.25
    );
    tl.fromTo(
      "#greeting .text",
      1.5,
      { y: "5%", opacity: 0 },
      { y: 0, opacity: 1, ease: "power4.out" },
      delay + 0.9
    );
    tl.add(() => (this.ready = true), delay + 0.9);

    scrollBuddy();
  },
  methods: {
    img(i) {
      return require(`@/assets/${i}`);
    },
    scrollTo(id){
      document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
      });
    },
    setImage(id) {
      this.selected = id;

      this.$nextTick(() => {
        let tl = gsap.timeline();
        tl.to("#scene", 0.5, { opacity: 0 });
        tl.fromTo(
          "#lightbox .images",
          1,
          { opacity: 0, y: "20%", x: "20%" },
          { opacity: 1, scale: 1, y: 0, x: 0, ease: "power4.out" },
          0
        );
        tl.fromTo(
          "#lightbox .message",
          1,
          { opacity: 0, scale: 0.3, y: "20%", x: "-20%" },
          { opacity: 1, scale: 1, y: 0, x: 0, ease: "power4.out" },
          0.2
        );
      });
    },
    unsetImage() {
      let tl = gsap.timeline();
      tl.to("#lightbox .images", 0.25, { opacity: 0 });
      tl.to("#scene", 0.25, { opacity: 1 }, 0);
      tl.add(() => (this.selected = null));
    }
  },
  computed: {
    images() {
      return [
        {
          art: "images/roof-art.jpg",
          message: {
            image: "images/roof-message.svg",
            position: { bottom: "15%", right: "7%", width: "40%" }
          }
        },
        {
          art: "images/negotiation-art.jpg",
          message: {
            image: "images/negotiation-message.svg",
            position: { bottom: "5%", right: "4%", width: "50%" }
          }
        },
        {
          art: "images/movie-art.jpg",
          message: {
            image: "images/movie-message.svg",
            position: { top: "5%", left: "5%", width: "90%" }
          }
        },
        {
          art: "images/flour-art.jpg",
          message: {
            image: "images/flour-message.svg",
            position: { left: "5%", bottom: "5%", width: "45%" }
          }
        },
        {
          art: "images/mom-art.jpg",
          message: {
            image: "images/mom-message.svg",
            position: { bottom: "5%", left: "5%", width: "35%" }
          }
        },
        {
          art: "images/peeling-art.jpg",
          message: {
            image: "images/peeling-message.svg",
            position: { bottom: "5%", left: "5%", width: "90%" }
          }
        },
        {
          art: "images/august-art.jpg",
          message: {
            image: "images/august-message.svg",
            position: { top: "5%", right: "5%", width: "30%" }
          }
        },
        {
          art: "images/roasting-art.jpg",
          message: {
            image: "images/roasting-message.svg",
            position: { bottom: "5%", right: "5%", width: "60%" }
          }
        },
        {
          art: "images/latke-art.jpg",
          message: {
            image: "images/latke-message.svg",
            position: { top: "5%", right: "5%", width: "45%" }
          }
        },
        {
          art: "images/busy-art.jpg",
          message: {
            image: "images/busy-message.svg",
            position: { bottom: "5%", left: "5%", width: "45%" }
          }
        },
        {
          art: "images/cookies-art.jpg",
          message: {
            image: "images/cookies-message.svg",
            position: { top: "35%", right: "5%", width: "40%" }
          }
        },
        {
          art: "images/delivery-art.jpg",
          message: {
            image: "images/delivery-message.svg",
            position: { right: "5%", bottom: "8%", width: "40%" }
          }
        }
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
        roofArchSide: "#5f85af",
        border: "#5f85af",
        door: "#436183"
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
  scroll-behavior: smooth;
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

#scene {
  width: 100vw;
  padding-top: 85vh;
  overflow: hidden;
  position: relative;
  text-align: center;
}

#scene.hide {
  height: 100vh;
}

#lightbox {
  position: fixed;
  z-index: 20;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  display: none;
  transition: transform 0.25s;
}

#lightbox.active {
  transform: scale(0.95);
}

#lightbox.show {
  display: block;
}

#lightbox .images {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#lightbox .image {
  flex: 0 0 auto;
  display: none;
  position: relative;
}

#lightbox .image.show {
  display: block;
}

#lightbox .art {
  max-height: 90vh;
  max-width: 100vw;
}

#lightbox .message {
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
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#greeting .content {
  flex: 0 0 auto;
  width: 50vw;
  max-width: 500px;
  text-align: center;
}

#greeting .logo {
  fill: white;
  width: 200px;
  max-width: 30vw;
  display: inline-block;
  overflow: hidden;
}

#greeting .logo svg {
  max-height: 4vh;
}

#greeting .happy-holidays {
  fill: white;
  width: 100%;
  margin: 5% 0px;
  max-height: 30vh;
}

#greeting .text {
  position: relative;
}

#greeting .arrow {
  position: absolute;
  top: 130%;
  left: 0px;
  width: 100%;
  text-align: center;
}

#greeting .arrow img {
  display: inline-block;
  animation: arrowdown 3s infinite;
  height: 3vw;
  min-height: 30px;
}

#greeting p {
  color: white;
  font-size: calc(14px + 0.5vw);
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
  max-height: 50vh;
  z-index: 1;
}

.building.main .view-finder {
  position: absolute;
  bottom: 100%;
  right: 18%;
  height: 15vw;
  max-height: 20vh;
  z-index: 1;
  fill: #2f4155;
}

#bottom {
  position: relative;
  z-index: 1;
}

#bottom .sidewalk {
  position: relative;
}

#bottom .sidewalk .snowpile {
  position: absolute;
  left: 30%;
  top: 0px;
  transform: translateY(-50%);
  width: 100vw;
  min-width: 600px;
}

#bottom .sidewalk .top {
  height: 15vh;
  width: 100%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 87%,
    rgba(186, 210, 255, 1) 100%
  );
}

#bottom .sidewalk .side {
  height: 3vh;
  width: 100%;
  background: rgb(150, 150, 150);
  background: linear-gradient(
    180deg,
    rgba(78, 78, 78, 1) 0%,
    rgba(100, 100, 100, 1) 100%
  );
}

#bottom .road {
  height: 30vw;
  width: 100%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 87%,
    rgba(186, 210, 255, 1) 100%
  );
}

@media screen and (max-width: 600px) {
  #scene {
    padding-top: 75vh;
  }

  #greeting .content {
    width: 80vw;
  }

  #skyline .art {
    transform: translateX(15%);
    flex: 0 0 80vh;
  }

  .building.main .view-finder {
    right: 20%;
  }
}

@media screen and (max-height: 500px) {
  #scene {
    padding-top: 105vh;
  }

  #greeting {
    margin-top: 15vh;
  }

  #greeting .arrow {
    top: 105%;
  }

  #greeting .arrow img {
    height: 7vh;
    min-height: inherit;
  }
}

@keyframes arrowdown {
  0% {
    opacity: 0;
    transform: translateY(0);
  }

  70% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}

@keyframes grow {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-8vw);
  }
}

@keyframes swing {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}

@keyframes sway {
  0%,
  100% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(2deg);
  }
}

@keyframes lights {
  0% {
    fill: #fffbcf;
  }
  50% {
    fill: #fffbcf;
  }
  51% {
    fill: #4dc4ff;
  }
  100% {
    fill: #4dc4ff;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
}
</style>
