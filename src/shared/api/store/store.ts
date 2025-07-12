import { configureStore, isPlainObject, type Middleware } from '@reduxjs/toolkit';
import counterReducer from '@/features/counter/model/counter-slice.ts';

const catchNonThunkActionsMiddleware: Middleware = (storeAPI) => (next) => (action) => {
   if (typeof action === 'function') return next(action);

   if (!isPlainObject(action)) return next(action);

   // Отправляем action в worker (кроме ответов от worker)
   if (!(action as any)?.ID) worker.port.postMessage(action);

   return next(action);
};

export const store = configureStore({
   reducer: {
      counter: counterReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(catchNonThunkActionsMiddleware),
});

const worker = new SharedWorker('./public/worker/shared-worker.js');

worker.port.onmessage = (event) => {
   store.dispatch(event.data);
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
