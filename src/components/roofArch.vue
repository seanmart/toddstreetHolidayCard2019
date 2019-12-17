<template lang="html">
  <svg class="roof-arch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123.69 110.64">
    <path :style="{fill: side}" d="M121.45,2.01v106.63H70.6c-28.3,0-53.64-23.38-62.46-58.28c-3.83-15.15-5.9-31.32-5.9-48.1V2.01H121.45z"/>
    <path :style="{fill: front}" d="M121.45,2.01v106.63h-19.42c-28.3,0-53.64-23.38-62.46-58.28c-3.83-15.15-5.9-31.32-5.9-48.1V2.01H121.45z"/>
  </svg>
</template>

<script>
export default {
  props:{
    front: String,
    side: String
  }
}
</script>
<style>
  .roof-arch{
    transform: translateY(-1px);
  }

</style>
