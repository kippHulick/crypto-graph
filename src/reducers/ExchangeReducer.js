import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    exchanges: {}
}

const exchanges = createSlice({
    name: 'echanges',
    initialState,
    reducers: {
      updateCoins: (state, action) => {
        state.exchanges = action.payload
      }
    }
})

export const { updateExchangs } = exchanges.actions
export default exchanges.reducer