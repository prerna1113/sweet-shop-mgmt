import { useEffect } from 'react';
import api from './api/api';

function App() {
  useEffect(() => {
    api.get('/sweets')
      .then(res => console.log('Sweets from backend:', res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Sweet Shop Management System</h1>
      <p>Check console for backend data</p>
    </div>
  );
}

export default App;
