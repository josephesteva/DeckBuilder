import { Routes, Route } from 'react-router-dom';
import "./App.css";
import HomePage from './components/Homepage';


function App() {
  

  return (
    <>
    <main>
      <Routes>
        <Route path='/' element={
          <HomePage></HomePage>
        }/>
      </Routes>
    </main>
    </>
      
  );
}

export default App;
