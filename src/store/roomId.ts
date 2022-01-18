import { createSlice } from "@reduxjs/toolkit";

interface RoomIdState {
    value: string | null;
}

const initialState: RoomIdState = {
    value: null,
}

export const roomIdSlice = createSlice({
  name: "roomId",
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.value = action.payload;
    },
    resetRoomId: (state) => {
      state.value = null;
    },
  },
});

export const { setRoomId, resetRoomId } = roomIdSlice.actions;
export default roomIdSlice.reducer;
