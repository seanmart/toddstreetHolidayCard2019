<template lang="html">
  <svg class="roof-arch" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207.61 214.19">
    <path :style="{fill: side}" d="M207.61,0V214.19A119.56,119.56,0,0,1,157,202.84C95.12,174.12,50.58,94.16,50.58,0Z"/>
    <path :style="{fill: front}" d="M207.61,214.19H157C70.31,214.19,0,118.3,0,0H50.58c0,94.16,44.54,174.12,106.45,202.84A119.56,119.56,0,0,0,207.61,214.19Z"/>
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
