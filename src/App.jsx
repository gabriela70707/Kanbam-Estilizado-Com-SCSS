import { Rotas } from './Rotas/Rotas';
import { BrowserRouter } from 'react-router-dom';
import './Style/main.scss'

function App() {

  return (
    <>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </>
  );
}

export default App
