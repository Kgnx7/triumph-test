import { configureStore } from '@reduxjs/toolkit'
import recordsListReducer from '../features/recordsList/recordsListSlice'
import throttle from 'lodash/throttle'
import { loadState, saveState } from '../utils/localStorage'

const persistedState = loadState()
const store = configureStore({
    reducer: {
        recordsList: recordsListReducer,
    },
    preloadedState: persistedState,
})

store.subscribe(
    throttle(() => {
        saveState({ recordsList: store.getState().recordsList })
    }, 1000)
)

export default store
