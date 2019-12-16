<template lang="html">
  <div class="bulbs">
    <img class="bulb" :src="img('bulb-01.svg')"/>
    <img class="bulb" :src="img('bulb-02.svg')"/>
    <img class="bulb" :src="img('bulb-03.svg')"/>
  </div>
</template>

<script>
export default{
  methods:{
    img(i){
      return require(`@/assets/${i}`)
    }
  }
}
</script>

<style lang="css">
.blue{fill:#1C51C6;}
.wire{fill:none;stroke:#231F20;stroke-width:1.7014;stroke-miterlimit:10;}
.red{fill:#ED185F;}
.orange{fill:#EA911B;}

.bulbs{
  display: flex;
}
.bulb{
  flex: 0 0 auto;
  margin: 0px auto;
  height: 6vw;
  max-height: 90px;
  animation: swing 3s infinite ease;
  transform-origin: top;
}

.bulb:nth-child(3n + 2){
  animation-delay: .5s
}

.bulb:nth-child(3n + 3){
  animation-delay: 1s
}

@keyframes swing{
  0%{
    transform: rotate(-10deg);
  }
  50%{
    transform: rotate(10deg);
  }
  100%{
    transform: rotate(-10deg);
  }
}

@media screen and (max-width: 600px){
  .bulb{
    height: 12vw;
  }
}
</style>
