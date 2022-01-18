import { configureStore } from '@reduxjs/toolkit';
import roomIdReducer from './roomId';

export const store = configureStore({
    reducer: {
        roomId: roomIdReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch