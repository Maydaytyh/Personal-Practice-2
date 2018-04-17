import {SET_DATA} from './mutation-types'
export default {
    setData({commit}, option) {
        commit(SET_DATA, option)
    }
}