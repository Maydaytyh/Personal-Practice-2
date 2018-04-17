import {COUNT_DATA} from './mutation-types'
import {SET_DATA} from './mutation-types'
export default {
    [COUNT_DATA](state) {
        state.count ++
    },

    [SET_DATA](state, data) {
        state.data = ["actions"]
    }
}