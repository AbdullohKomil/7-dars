import { useContext } from 'react';
import { Private } from './apps/Private';
import { Public } from './apps/Public';
import { AuthContext } from './context/AuthContext';
import { Login } from './pages/Login/Login';

function App() {
  const {token} = useContext(AuthContext);

  if (token) {
    return <Private/>
  }
  return <Public />;
}

export default App;
