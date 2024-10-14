import { nanoid, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { OmitKeys, UINotification } from "devstream/aurelia/types";

const initialNotifications: Array<UINotification> = [];

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialNotifications,
  reducers: {
    addNotification: (state, action: PayloadAction<OmitKeys<UINotification, "id">, string>) => {
      state.push({ ...action.payload, id: nanoid() });
    },
    dismissNotification: (state, action: PayloadAction<string, string>) => {
      return state.filter((notification) => notification.id !== action.payload);
    },
  },
});

export const { addNotification, dismissNotification } = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
