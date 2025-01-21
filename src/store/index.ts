import { createStore } from 'vuex'
const DEFAULT_X = 150
const DEFAULT_Y = 150
const DEFAULT_R = 80

export interface CircleElement {
  id: number,
  radius: number,
  startPositionX: number,
  startPositionY: number,
  subElements: Array<any>,
  pathModel: Path2D | null
}

export default createStore({
  state: {
    circleElement: {
      id: 0,
      radius: DEFAULT_R,
      startPositionX: DEFAULT_X,
      startPositionY: DEFAULT_Y,
      subElements: [],
      pathModel: null
    },
    currentElements: new Map,
    currentLines: [],
  },
  mutations: {
    setCurrentElements(state, el) {
      state.currentElements = el
    },
    setCurrentLines(state, el) {
      state.currentLines = el
    },
  },
  actions: {
    loadElements({ dispatch }, count: number): void {
      for (let i = 0; i < count; i++) {
        dispatch('addElement')
      }
    },
    addElement({ state, commit }) {
      const list: Map<number, CircleElement> = state.currentElements
      const newElem: CircleElement = { ...state.circleElement }
      const nextId = list.size + 1

      newElem.startPositionX = DEFAULT_X + 210 * nextId,
      newElem.id = nextId,

      list.set(nextId, newElem)
      commit('setCurrentElements', list)
    },
    changeElement ({ state, commit }, options: { id: number, newX: number, newY: number }) {
      const list: Map<number, CircleElement> = state.currentElements
      const elem: CircleElement | any = state.currentElements.get(options.id)

      elem.startPositionX = options.newX
      elem.startPositionY = options.newY
      commit('setCurrentElements', list)
    },
    updatePath({state}, options: {id: number, path: Path2D}) {
      const elem: CircleElement | any = state.currentElements.get(options.id)
      if (!elem) return
      elem.pathModel = options.path
    }
  },
  modules: {
  }
})