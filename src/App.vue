<template>
  <div id="scene" ref="scene">
    <div id="sky"/>
    <div id="skyline" class="scroll-item" data-speed="-.5">
      <buildings class="buildings" />
    </div>
    <div id="greeting">
      <div class="content scroll-item" data-speed="-.2">
        <logo class="logo"/>
        <p>
          It is a long established fact that a reader will be
          distracted by the readable content of a page when looking
          at its layout. The point of using Lorem Ipsum is that it
          has a more-or-less normal distribution of letters,
          as opposed to using 'Content here, content here',
          making it look like readable English.
        </p>
      </div>
    </div>
    <div id="buildings">

      <div class="left">
        <div class="roof"/>
        <div class="shadow">
          <roof-arch/>
          <roof-arch/>
          <roof-arch/>
        </div>
        <div class="windows">
          <template v-for="i in 12">
          <div class="window" :key="i">
            <div class="wrapper">
              <div class="content">
                <window-snow class="snow"/>
              </div>
            </div>
          </div>
        </template>
        </div>
      </div>

      <div class="main">
        <waterTower class="water-tower"/>
        <div class="front bricks">
          <div class="roof"/>
          <div class="shadow">
            <roof-arch/>
            <roof-arch/>
            <roof-arch/>
            <roof-arch/>
            <roof-arch/>
          </div>
          <div class="windows">
            <template v-for="i in 12">
            <div class="window" :key="i">
              <div class="wrapper">
                <div class="content">
                  <window-snow class="snow"/>
                </div>
              </div>
            </div>
          </template>
          </div>
        </div>
        <div class="side">
          <div class="roof"/>
          <div class="shadow"/>
        </div>
      </div>

      <div class="right">
        <div class="roof"/>
        <div class="shadow">
          <roof-arch/>
          <roof-arch/>
          <roof-arch/>
        </div>
        <div class="windows">
          <template v-for="i in 12">
          <div class="window" :key="i">
            <div class="wrapper">
              <div class="content">
                <window-snow class="snow"/>
              </div>
            </div>
          </div>
        </template>
        </div>
      </div>
    </div>
    <canvas id="canvas"/>
  </div>
</template>

<script>
import buildings from '@/components/buildings'
import roofArch from '@/components/roofArch'
import windowSnow from '@/components/windowSnow'
import waterTower from '@/components/waterTower'
import logo from '@/components/logo'
export default {
  components:{buildings,roofArch,windowSnow,waterTower,logo},
  name: 'app',
  data(){
    return{
      scrollItems: null
    }
  },
  mounted(){
    setTimeout(()=> this.$refs.scene.style.opacity = 1,250)

    let scrollItems = document.querySelectorAll('.scroll-item')
    this.scrollItems = Array.apply(null, scrollItems)
    window.addEventListener('scroll',this.handleScroll)

    this.makeItSnow()
  },
  methods:{
    handleScroll(){
      this.scrollItems.forEach( item => {
        let speed = item.getAttribute('data-speed')
        let distance = item.getAttribute('data-distance')
        let transformY = 0

        if (speed){
          transformY = window.scrollY * speed
        } else if (distance){
          transformY = (window.scrollY / document.body.clientHeight) * distance
        }

        item.style.transform = `translateY(${transformY}px)`
      })
    },
    makeItSnow(){
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')

      let w = window.innerWidth;
      let h = window.innerHeight;

      window.addEventListener('resize', ()=>{
        w = window.innerWidth;
        h = window.innerHeight;
      })

      canvas.width = w
      canvas.height = h

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

<style>

@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');

html{
  background: #74bfde;
  font-family: 'Roboto Slab', serif;
  font-weight: 500
}

*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

#canvas{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

#scene{
  opacity: 0;
  transition: opacity 3s;
  width: 100%;
  padding-top: 80vh;
  overflow: hidden;
}

#sky{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 150vh;
  background: rgb(207,207,207);
  background: linear-gradient(0deg, #c0edff 0%, #74bfde 100%);
  z-index: -1;
}

#skyline{
  fill: #74bfde;
  opacity: .8;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: -1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

#skyline .buildings{
  flex: 0 0 auto;
  width: 120%;
  min-width: 1000px;
}

#greeting{
  position: absolute;
  top: 0px;
  height: 80vh;
  width: 100%;
  padding: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

#greeting .content{
  width: 70vw;
  max-width: 500px;
  text-align: center;
  color: white;
  font-size: 20px;
}

#greeting .logo{
  fill: white;
  margin-bottom: 2vw;
}

#buildings{
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

#buildings .roof{
  transition: .25s;
  height: 30px;
  margin: 0px -20px;
  background: white;
}

#buildings .side .roof{
  background: #bbb;
}

#buildings .shadow{
  height: 60px;
  background: rgba(0,0,0,.2);
  display: flex;
  justify-content: space-around;
}

#buildings .shadow .roof-arch{
  height: 80%;
  flex: 0 0 auto;
}

#buildings .windows{
  display: flex;
  flex-wrap: wrap;
  padding: 10%;
}

#buildings .window {
    flex: 0 0 33.333%;
    height:auto;
}

#buildings .window:before {
    content:'';
    float:left;
    padding-top:100%;
}

#buildings .window .wrapper{
  width: 100%;
  height: 100%;
  padding: 10%;
}

#buildings .window .content{
  background: #999;
  height: 100%;
  position: relative;
  box-shadow: inset 10px 10px 0px rgba(0,0,0,.3)
}

#buildings .window .snow{
  fill: white;
  position: absolute;
  top: 95%;
  left: -5%;
  width: 110%;
}

#buildings .left{
  margin-top: 120px;
  flex: 0 0 120%;
  padding-left: 60%;
  background: #bbb;
  position: relative;
  z-index: -1
}

/* ------------------ main --------------------- */
#buildings .main{
  flex: 0 0 90%;
  display: flex;
  align-items: stretch;
  position: relative;
}

#buildings .main .water-tower{
  position: absolute;
  bottom: 100%;
  right: 15%;
  fill: #2f4155;
  height: 30vw;
  max-height: 350px;
  z-index: 1;
}

#buildings .main .water-tower .shadow{
  fill: #1b2836;
}

#buildings .main .water-tower .roof{
  fill: #5f85af;
}

#buildings .main .front{
  flex: 0 0 70%;
  background-color: #d9f1fb;
}

#buildings .main .content{
  background: #1b2836;
}

#buildings .main .side{
  flex: 0 0 30%;
  background: #2f4155;
}

#buildings .main .side .roof{
  background: #5f85af
}

#buildings .right{
  margin-top: 100px;
  flex: 0 0 90%;
  padding-right: 30%;
  background: #bbb;
  transform: translateX(-22%);
}

@media screen and (max-width: 1000px){
  #buildings .window{
    flex: 0 0 50%;
  }
}

@media screen and (max-width: 600px){
  #buildings .window{
    flex: 0 0 100%;
  }
}

</style>
