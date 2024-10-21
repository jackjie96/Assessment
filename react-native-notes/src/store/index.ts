import {persistStore, persistReducer} from 'redux-persist';
import {rootReducer} from './reducers';
import {legacy_createStore as createStore} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persisConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persisConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store, persistor};
export type RootState = ReturnType<typeof persistedReducer>;
