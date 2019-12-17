<template lang="html">
  <div class="window" v-touch="selected">
    <div class="outer-wrapper" ref="wrapper">
      <div class="wrapper" :style="{ outlineColor: border }" ref="content">
        <div class="inner-wrapper">
          <div class="shadow" />
          <div class="content" :style="windowStyle" />
        </div>
        <img :src="img(`windowSnow.svg`)" class="window-snow" />
        <lights v-if="effect" class="lights"/>
        <bulbs v-if="effect" class="bulbs"/>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import lights from '@/components/lights'
import bulbs from '@/components/bulbs'
export default {
  components: { lights,bulbs },
  props: {
    image: { type: String, default: null },
    color: { type: String, default: null },
    border: { type: String, default: "#aaa" },
    effect:{type: Boolean, default: false}
  },
  computed: {
    windowStyle() {
      let styles = {}
      if (this.image) styles.backgroundImage = `url(${this.img(this.image)})`
      if (this.color) styles.backgroundColor = this.color
      return styles
    }
  },
  methods: {
    img(i){
      return require(`@/assets/${i}`)
    },
    selected(e) {
      e.stopImmediatePropagation();
      this.$emit('selected', this.image || null)
    }
  }
};
</script>

<style lang="css">
.window {
  flex: 0 0 50%;
  height: auto;
  padding: 8%;
  transition: transform .25s;
}

.window:before {
  content: "";
  float: left;
  padding-top: 100%;
}

.window .outer-wrapper{
  height: 100%;
}

.window .wrapper {
  outline-width: 1.2vw;
  outline-style: solid;
  height: 100%;
  position: relative;
  z-index: 1;
}

.window .inner-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.window .content,
.window .shadow {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
}


.window .content {
  background-size: cover;
  background-position: center center;
  z-index: -1;
  transition: transform 0.5s ease;
}

.window .lights{
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
}

.window .bulbs{
  width: 100%;
  position: absolute;
  left: 0px;
  top: 100%;
  margin-top: 2%;
  z-index: 0;
}

.window .window-snow {
  fill: white;
  position: absolute;
  top: 95%;
  left: -10%;
  width: 120%;
  z-index: 1;
}

@media screen and (min-width: 601px){
  .window:nth-child(4n + 1) .bulbs,
  .window:nth-child(4n + 4) .bulbs{
    display: none;
  }

  .window:nth-child(4n + 2) .lights,
  .window:nth-child(4n + 3) .lights{
    display: none;
  }
}


@media screen and (max-width: 600px) {
  .window {
    padding: 25% 10%;
    flex: 0 0 100%;
  }

  .window.active{
    transform: scale(.9)
  }

  .window:nth-child(2n + 1) .bulbs{
    display: none;
  }

  .window:nth-child(2n + 2) .lights{
    display: none;
  }

  .window .wrapper{
    outline-width: 10px;
  }
}
</style>
