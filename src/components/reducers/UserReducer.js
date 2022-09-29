import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    isLoggedIn: false,
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action) => {
          state.user = {...state.user, ...action.payload}
          state.isLoggedIn = true
        },
        signOut: (state) => {
          state.user = {}
          state.isLoggedIn = false
        }
    }
})

export const { signIn, signOut } = slice.actions
export default slice.reducer