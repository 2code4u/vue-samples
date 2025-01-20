<template>
  <div class="canvas-lines" ref="mainBlock">
    <canvas class="main-frame" ref="canvasRef"></canvas>
    <button @click="addNewFigure" class="canvas-lines__button">
      Добавить
    </button>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

export default defineComponent({
  name: 'CanvasLines',
  components: {
  },

  data: () => ({
    contextCanvas: {} as CanvasRenderingContext2D,
    listOfCoords: [] as Array<[number, number, number]>
  }),

  computed: {
    ...mapState({
      listElements: 'currentElements'
    }),
  },

  mounted() {
    const block: HTMLElement = this.$refs.mainBlock as HTMLElement
    const canvas: HTMLCanvasElement = this.$refs.canvasRef as HTMLCanvasElement
    canvas.width = block.clientWidth
    canvas.height = block.clientHeight

    canvas.onmousedown = this.mouseDown

    let ctx = canvas.getContext('2d')
    if (!ctx) return

    this.contextCanvas = ctx
    this.initFigures(ctx)
    this.activateCoords()
  },

  methods: {
    ...mapActions([
      'addElement'
    ]),

    activateCoords() {
      this.listElements.forEach((element: { startPositionX: number; startPositionY: number; radius: number }) => {
        const x = element.startPositionX
        const y = element.startPositionY
        const rad = element.radius
        this.listOfCoords.push([x, y, rad])
      })
    },

    initFigures(canvasCtx: CanvasRenderingContext2D) {
      this.listElements.forEach((element: { startPositionX: number; startPositionY: number; radius: number }) => {
        const x = element.startPositionX
        const y = element.startPositionY
        const rad = element.radius
        
        canvasCtx.fillStyle = 'hsl(213deg 100% 52.07%)';
        canvasCtx.lineWidth = 6
        canvasCtx.beginPath()
        canvasCtx.arc(x, y, rad, 0, Math.PI * 2)
        canvasCtx.stroke()
        canvasCtx.fill()

        this.makeChainpointOnCircle(canvasCtx, element)
      })
    },

    makeChainpointOnCircle(canvasCtx: CanvasRenderingContext2D, element: { startPositionX: number; startPositionY: number; radius: number }) {
      const squareLength = 36
      const centerCoord = squareLength /2
      const x = element.startPositionX
      const y = element.startPositionY
      const rad = element.radius

      canvasCtx.beginPath()
      canvasCtx.fillStyle = 'hsl(129.9deg 66.09% 47.36%)'
      canvasCtx.rect(x + rad - centerCoord, y - centerCoord, squareLength, squareLength)
      canvasCtx.rect(x - centerCoord, y + rad - centerCoord, squareLength, squareLength)
      canvasCtx.rect(x - rad - centerCoord, y - centerCoord, squareLength, squareLength)
      canvasCtx.rect(x - centerCoord, y - rad - centerCoord, squareLength, squareLength)
      canvasCtx.stroke()
      canvasCtx.fill()
    },

    addNewFigure() {
      this.addElement()
      if (!this.contextCanvas) return
      this.initFigures(this.contextCanvas)
    },

    mouseIn(startX: number, startY: number, element: number[]) {
      const circle = new Path2D()
      circle.arc(element[0], element[1], element[2], 0, 2 * Math.PI)
      // this.contextCanvas.fillStyle = 'red'
      // this.contextCanvas.fill(circle)
      console.log(circle)
      console.log(startX)
      console.log(startY)
      console.log(element)
      
      const isPointInPath = this.contextCanvas.isPointInPath(circle, startX, startY)
      console.log(isPointInPath)
      return isPointInPath
    },

    mouseDown(event: MouseEvent) {
      event.preventDefault()

      let startX = event.clientX
      let startY = event.clientY

      this.listOfCoords.forEach(element => {
        if (this.mouseIn(startX, startY, element)) {
          console.log('IN')
        }
      });
    }
  }
})
</script>

<style>
  .canvas-lines {
    margin: 12px;
    height: 75vh;
  }

  .canvas-lines__button {
    width: 60%;
    height: 45px;
    background-color: mediumaquamarine;
    font-size: 24px;
    margin-top: 40px;
  }

  .main-frame {
    display: block;
  }
</style>