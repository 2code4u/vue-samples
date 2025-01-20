import { createStore } from 'vuex'
const DEFAULT_X = 150
const DEFAULT_Y = 150
const DEFAULT_R = 80

export default createStore({
  state: {
    currentElements: [
      {
        radius: DEFAULT_R,
        startPositionX: DEFAULT_X,
        startPositionY: DEFAULT_Y,
      }
    ],
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
    addElement({ state, commit }) {
      const list = [...state.currentElements]
      const mod = list.length
      const newElem = {
        radius: DEFAULT_R,
        startPositionX: DEFAULT_X + 200 * mod,
        startPositionY: DEFAULT_Y + 200 * mod,
      }

      list.push(newElem)
      commit('setCurrentElements', list)
    }
  },
  modules: {
  }
})