<template lang="html">
  <div class="window" @click.stop="selected" v-touch >
    <div class="outer-wrapper outline" ref="wrapper">
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
    imageId: {type: Number, defualt: null},
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
    selected() {
      this.$emit('selected', this.imageId)
    }
  }
};
</script>

<style lang="css">
.window {
  flex: 0 0 50%;
  height: auto;
  transition: transform .25s;
  position: relative;
  margin-bottom: 5vw;
}

.window.active{
  transform: scale(.95)
}

.window:before {
  content: "";
  float: left;
  padding-top: 100%;
}

.window .outer-wrapper{
  position: absolute;
  top: 4vw;
  left: 4vw;
  bottom: 4vw;
  right: 4vw;
  outline-offset: 0px;
}

.window .wrapper {
  outline-width: 1.2vw;
  outline-style: solid;
  outline-offset: -1.2vw;
  height: 100%;
  position: relative;
  z-index: 1;
  box-shadow: 0px 0px 2vw rgba(255,255,255,.8);
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
  transition: transform 0.25s ease;
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
  top: 90%;
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

  .window .wrapper:hover .content{
    transform: scale(1.1)
  }
}


@media screen and (max-width: 600px) {
  .window {
    flex: 0 0 100%;
    margin-bottom: 15vw;
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
