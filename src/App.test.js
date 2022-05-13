import Home from './Component/Home.js';
import MenuBar from './Component/MenuBar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <MenuBar />
      <Routes>
        <Route path="Home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
