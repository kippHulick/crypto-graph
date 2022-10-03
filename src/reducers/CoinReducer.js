import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  coins: []
}

const coins = createSlice({
    name: 'coins',
    initialState,
    reducers: {
      updateCoins: (state, action) => {
        state.coins = action.payload
        console.log('inside reducer')
      }
    }
})

export const { updateCoins } = coins.actions
export default coins.reducer