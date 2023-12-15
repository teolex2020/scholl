
import { createSlice } from '@reduxjs/toolkit'



const initialState = {
	authUser: false,
	mobileMenu: false,
	popupMenu: false,
	language: `uk`,
	id: '',
	loading: true,
}

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		Authuser: (state, action) => {
			state.authUser = action.payload
		},
		MobileMenus: (state, action) => {
			state.mobilemenu = !action.payload
		},
		Languages: (state, action) => {
			state.language = action.payload
		},
		PopupMenu: (state, action) => {
			state.popupmenu = !action.payload
		},
		Id: (state, action) => {
			state.id = action.payload
		},
		Loading: (state, action) => {
			state.loading = action.payload
		},
	},
})

export const { Authuser, MobileMenus, Languages, PopupMenu, Id, Loading } =
	dataSlice.actions
export default dataSlice.reducer
