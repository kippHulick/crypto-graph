import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    coins: {}
}

const slice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
      updateCoins: (state, action) => {
        state.coins = action.payload
      }
    }
})

export const { updateCoins } = slice.actions
export default slice.reducer