import { configureStore } from "@reduxjs/toolkit";
import { notificationsReducer } from "devstream/aurelia/features/notification";
import { authReducer } from "devstream/aurelia/features/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
