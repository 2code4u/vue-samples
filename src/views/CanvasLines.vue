<template>
  <div class="canvas-lines" ref="mainBlock">
    <canvas
      @mousedown="mouseDown"
      @mouseup="mouseUp"
      @mousemove="mouseMove"
      class="main-frame" 
      ref="canvasRef"
    >
    </canvas>

    <button @click="addNewFigure" class="canvas-lines__button">
      Добавить
    </button>
  </div>
</template>

<script lang="ts">

import { CircleElement } from '@/store'

import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

export default defineComponent({
  name: 'CanvasLines',
  components: {
  },

  data: () => ({
    contextCanvas: {} as CanvasRenderingContext2D,
    activeId: null as number | null
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

    this.loadElements(3)

    let ctx = canvas.getContext('2d')
    if (!ctx) return

    this.contextCanvas = ctx
    this.initFigures(ctx)
  },

  methods: {
    ...mapActions([
      'loadElements',
      'addElement',
      'changeElement',
      'updatePath'
    ]),

    initFigures(canvasCtx: CanvasRenderingContext2D) {
      canvasCtx.clearRect(-1000, -1000, 3000, 3000)
      this.listElements.forEach((element: CircleElement) => {
        const x = element.startPositionX
        const y = element.startPositionY
        const rad = element.radius
        const circle = new Path2D()
        
        canvasCtx.fillStyle = 'hsl(213deg 100% 52.07%)';
        canvasCtx.lineWidth = 6
        canvasCtx.beginPath()
        circle.arc(x, y, rad, 0, Math.PI * 2)
        canvasCtx.stroke(circle)
        canvasCtx.fill(circle)

        this.updatePath({id: element.id, path: circle})
        this.makeChainpointOnCircle(canvasCtx, element)
      })
    },

    makeChainpointOnCircle(canvasCtx: CanvasRenderingContext2D, element: CircleElement) {
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

    mouseIn(startX: number, startY: number, path: Path2D | null) {
      if (!path) return
      
      const isPointInPath = this.contextCanvas.isPointInPath(path, startX, startY)
      return isPointInPath
    },

    mouseDown(event: MouseEvent) {
      event.preventDefault()

      let startX = event.offsetX
      let startY = event.offsetY

      this.listElements.forEach((element: CircleElement) => {
        if (this.mouseIn(startX, startY, element.pathModel)) {
          console.log('IN CIRCLE')
          this.activeId = element.id
        }
      });
    },
    mouseUp() {
      this.activeId = null
    },

    mouseMove (event: MouseEvent) {
      event.preventDefault()
      if (this.activeId === null) {
        return
      }

      this.changeElement({
        id: this.activeId,
        newX: event.offsetX,
        newY: event.offsetY
      })
      this.initFigures(this.contextCanvas)
    },
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