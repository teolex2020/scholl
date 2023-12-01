import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	authuser: '',
	mobilemenu: false,
	popupmenu: false,
	language: true,
}

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		Authuser: (state, action) => {
			state.authuser = action.payload
		},
		MobileMenus: (state, action) => {
			state.mobilemenu = !action.payload
		},
		Languages: (state, action) => {
			state.language = !action.payload
		},
		PopupMenu: (state, action) => {
			state.popupmenu = !action.payload
		},
	},
})

export const { Authuser, MobileMenus, Languages, PopupMenu } = dataSlice.actions
export default dataSlice.reducer
