import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../model/counter-slice';
import type { RootState } from '@/shared/api/store/store';

export function Counter() {
   const count = useSelector((state: RootState) => state.counter.value);
   const dispatch = useDispatch();

   return (
      <div className="card">
         <div className="card-header">
            <h2 className="card-title">🔢 Счетчик</h2>
            <span className="badge badge-warning">Синхронизация между вкладками</span>
         </div>

         <div
            style={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               gap: '2rem',
               padding: '2rem 0',
            }}>
            <button
               className="btn btn-primary"
               onClick={() => dispatch(decrement())}
               style={{ fontSize: '1.5rem', padding: '1rem 2rem' }}>
               ➖ Уменьшить
            </button>

            <div
               style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: 'var(--primary-color)',
                  minWidth: '100px',
                  textAlign: 'center',
               }}>
               {count}
            </div>

            <button
               className="btn btn-primary"
               onClick={() => dispatch(increment())}
               style={{ fontSize: '1.5rem', padding: '1rem 2rem' }}>
               ➕ Увеличить
            </button>
         </div>

         <div
            style={{
               textAlign: 'center',
               color: 'var(--text-secondary)',
               fontSize: '0.875rem',
            }}>
            Откройте несколько вкладок, чтобы увидеть синхронизацию
         </div>
      </div>
   );
}
