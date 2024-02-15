// import {configureStore} from '@reduxjs/toolkit';
// import rootReducer from './rootReducer';
// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;
import {configureStore} from '@reduxjs/toolkit';
// import showDataReducer from './slice';
import rootReducer from './rootReducer';
export default configureStore({
  reducer: {
    rootReducer,
  },
});
