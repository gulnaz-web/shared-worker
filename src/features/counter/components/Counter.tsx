import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '@/features/counter/model/counter-slice.ts';
import type { RootState } from '@/shared/api/store/store.ts';

export function Counter() {
   const count = useSelector((state: RootState) => state.counter.value);
   const dispatch = useDispatch();

   return (
      <div>
         <div>
            <button aria-label="Increment value" onClick={() => dispatch(increment())}>
               Increment
            </button>
            <span>{count}</span>
            <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
               Decrement
            </button>
         </div>
      </div>
   );
}
