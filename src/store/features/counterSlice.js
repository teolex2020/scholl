import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	dataname: '',
	mobilemenu: false,
	language: true,
}

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		dataName: (state, action) => {
			state.dataname = action.payload
		},
		MobileMenus: (state, action) => {
			state.mobilemenu = !action.payload
		},
		Languages: (state, action) => {
			state.language = !action.payload
		},
	},
})

export const { dataName, MobileMenus, Languages } = dataSlice.actions
export default dataSlice.reducer
