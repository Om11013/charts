import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CSV from './components/CSV';
import { CsvDataProvider } from './context/CsvData';
import Home from './components/Home';

function App () {
  return (
    <BrowserRouter>
      <CsvDataProvider>
        <Routes>
          <Route path='/csv' element={<CSV />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </CsvDataProvider>
    </BrowserRouter>
  );
}

export default App;
