<template lang="html">
  <div class="door">
    <div class="content" :style="{outlineColor: border, background}">
        <img class="sign" :src="img('doorSign.svg')"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    border: {type: String, default: '#999'},
    background: {type: String, default: '#555'}
  },
  methods:{
    img(i){
      return require(`@/assets/${i}`)
    }
  }
}
</script>

<style lang="css">
  .door{
    flex: 0 0 50%;
    height: 50vw;
    padding: 4vw 4vw 0px;
    position: relative;
    z-index: 1;
    color: white;
  }

  .door .content{
    outline-width: 1.2vw;
    outline-style: solid;
    outline-offset: -1.2vw;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    padding-top: 4vw;
    box-shadow: inset 2vw 2vw 0px rgba(0,0,0,.2)
  }

  .door .sign{
    flex: 0 0 auto;
    width: 120%;
    position: relative;
    z-index: 1;
    animation: sway 8s infinite;
    transform-origin: top center;
  }

  @keyframes sway{
    0%, 100%{ transform: rotate(-2deg);}
    50%{ transform: rotate(2deg); }
  }



</style>
