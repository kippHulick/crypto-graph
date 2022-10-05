import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  coins: []
}

const coins = createSlice({
    name: 'coins',
    initialState,
    reducers: {
      updateCoins: (state, action) => {
        if(state.coins.length > 1) return
        state.coins = action.payload
      }
    }
})

export const { updateCoins } = coins.actions
export default coins.reducer