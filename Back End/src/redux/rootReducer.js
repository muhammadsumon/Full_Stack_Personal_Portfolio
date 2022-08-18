import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import categoryReducer from './slices/category';
import projectReducer from './slices/project';
import technologyReducer from './slices/technology';
import typeReducer from './slices/type';
import userReducer from './slices/user';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  project: projectReducer,
  type: typeReducer,
  category: categoryReducer,
  technology: technologyReducer,
  user: userReducer
});

export { rootPersistConfig, rootReducer };
