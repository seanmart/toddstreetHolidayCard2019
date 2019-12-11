<template lang="html">
  <canvas ref="canvas"/>
</template>

<script>
export default {
  mounted(){
    this.makeItSnow()
  },
  methods:{
    makeItSnow(){
      let canvas = this.$refs.canvas
      let ctx = canvas.getContext('2d')

      let w = window.innerWidth;
      let h = window.innerHeight;
      canvas.width = w
      canvas.height = h

      window.addEventListener('resize', ()=>{
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w
        canvas.height = h
      })

      let mp = 100
      let particles = []

      for (let i = 0; i < mp; i++){
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 4 + 1,
          d: Math.random() * mp
        })
      }

      function draw(){
        ctx.clearRect(0,0,w,h)
        ctx.fillStyle = "rgba(255,255,255,.8)"
        ctx.beginPath()

        for (let i = 0; i < mp; i++){
          let p = particles[i]
          ctx.moveTo(p.x , p.y)
          ctx.arc(p.x, p.y ,p.r ,0 , Math.PI*2, true)
        }
        ctx.fill();
        update()
      }

      let angle = 0

      function update(){
        angle += 0.01;

        for (let i = 0; i < mp; i++){
          let p = particles[i]
          p.y += Math.cos(angle + p.d) + 1 + p.r / 2
          p.x += Math.sin(angle) * 2;

          if (p.x > w + 5 || p.x < -5 || p.y > h){
            particles[i] = i % 3 > 0
            ? {x: Math.random() * w, y: -10, r: p.r, d: p.d}
            : Math.sin(angle) > 0
            ? {x: -5, y: Math.random() * h, r: p.r, d: p.d}
            : {x: w + 5, y: Math.random() * h, r: p.r, d: p.d}
          }
        }

      }

      setInterval(draw, 33)
    }
  }
}
</script>

<style lang="css">
canvas{
  pointer-events: none;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1;
}

</style>
