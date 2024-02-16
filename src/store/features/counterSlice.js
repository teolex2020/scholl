
import { createSlice } from '@reduxjs/toolkit'



const initialState = {
	authUser: false,
	mobileMenu: false,
	popupMenu: false,
	language: `uk`,
	id: '',
	loading: true,
	avatar:false,
	chat:true,
	selectcourse: 1,
	orderPrice:"",
	orderTitle:"",
	orderId:""
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
		Avatar: (state, action) => {
			state.avatar = !action.payload
		},
		Chats: (state, action) => {
			state.chat = !action.payload
		},
		Selectcourse: (state, action) => {
			state.selectcourse = action.payload
		},
		OrderPrice: (state, action) => {
			state.orderPrice = action.payload
		},
		OrderTitle: (state, action) => {
			state.orderTitle = action.payload
		},
		OrderId: (state, action) => {
			state.orderId = action.payload
		},
	},
})

export const {
	OrderId,
	OrderTitle,
	OrderPrice,
	Authuser,
	MobileMenus,
	Languages,
	PopupMenu,
	Id,
	Loading,
	Avatar,
	Chats,
	Selectcourse,
} = dataSlice.actions
export default dataSlice.reducer
