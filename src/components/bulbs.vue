<template lang="html">
  <div class="bulbs">
    <svg class="bulb" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    	 viewBox="0 0 110.09 202.65" style="enable-background:new 0 0 110.09 202.65;" xml:space="preserve">
    	<circle class="red" cx="55.05" cy="147.6" r="55.05"/>
    	<line class="wire" x1="55.05" y1="92.56" x2="55.05" y2="0"/>
    </svg>

    <svg class="bulb" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    	 viewBox="0 0 110.09 202.65" style="enable-background:new 0 0 110.09 202.65;" xml:space="preserve">
    	<circle class="orange" cx="55.05" cy="147.6" r="55.05"/>
    	<line class="wire" x1="55.05" y1="92.56" x2="55.05" y2="0"/>
    </svg>

    <svg class="bulb" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    	 viewBox="0 0 110.09 202.65" style="enable-background:new 0 0 110.09 202.65;" xml:space="preserve">
    	<circle class="blue" cx="55.05" cy="147.6" r="55.05"/>
    	<line class="wire" x1="55.05" y1="92.56" x2="55.05" y2="0"/>
    </svg>
  </div>
</template>

<script>
export default {
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
  height: 5vw;
  max-height: 70px;
  animation: swing 3s infinite ease;
  transform-origin: top;
}

.bulb:nth-child(3n + 2){
  animation-delay: .3s
}

.bulb:nth-child(3n + 3){
  animation-delay: .9s
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
    height: 60px;
  }
}
</style>
