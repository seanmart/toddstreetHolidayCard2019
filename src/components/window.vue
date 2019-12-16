<template lang="html">
  <div class="window" @click="selected">
    <div class="outer-wrapper" ref="wrapper">
      <div class="wrapper" :style="{ outlineColor: border }" ref="content">
        <div class="inner-wrapper">
          <div class="shadow" />
          <div class="content" :style="windowStyle" />
        </div>
        <windowSnow class="snow" />
        <lights v-if="lights"/>
        <bulbs v-if="bulbs"/>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import lights from '@/components/lights'
import bulbs from '@/components/bulbs'
import windowSnow from "@/components/windowSnow";
export default {
  components: { windowSnow,lights,bulbs },
  props: {
    lights: {type: Boolean, default: false},
    bulbs: {type: Boolean, default: false},
    image: { type: String, default: null },
    color: { type: String, default: null },
    border: { type: String, default: "#aaa" }
  },
  computed: {
    windowStyle() {
      let styles = {}
      if (this.image) styles.backgroundImage = `url(${require("@/assets/" + this.image)})`
      if (this.color) styles.backgroundColor = this.color
      return styles
    }
  },
  methods: {
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

.window .shadow {
  box-shadow: inset 10px 10px 0px rgba(0, 0, 0, 0.3);
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

.window .snow {
  fill: white;
  position: absolute;
  top: 95%;
  left: -10%;
  width: 120%;
  z-index: 1;
}


@media screen and (max-width: 600px) {
  .window {
    padding: 15% 10%;
    flex: 0 0 100%;
  }

  .window .wrapper{
    outline-width: 10px;
  }
}
</style>
