import { Counter, ItemManager } from '@/features';
import './styles/App.css';

function App() {
   return (
      <div className="container">
         <header
            style={{
               textAlign: 'center',
               marginBottom: '2rem',
               color: 'white',
            }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>SharedWorker + Redux</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
               Синхронизация состояния между вкладками браузера
            </p>
         </header>

         <div className="grid">
            <ItemManager />
            <Counter />
         </div>

         <footer
            style={{
               textAlign: 'center',
               marginTop: '2rem',
               color: 'white',
               opacity: 0.8,
            }}>
            <p>✨ Построено с React, Redux Toolkit и SharedWorker</p>
         </footer>
      </div>
   );
}

export default App;
