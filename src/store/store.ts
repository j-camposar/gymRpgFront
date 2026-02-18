import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { persistReducer, persistStore } from "redux-persist";
// IMPORTANTE: Necesitas importar el motor de almacenamiento
import storage from "redux-persist/lib/storage"; 

// 1. Combinamos los reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// 2. Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage, // Cambiado de 'store' a 'storage'
  whitelist: ['auth'], 
};

// 3. Creamos el reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configuramos el store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

// 5. Creamos el persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;