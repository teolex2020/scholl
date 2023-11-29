import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './features/counterSlice'

export const store = configureStore({
	reducer: {
		counter: dataSlice,
	},
})
