import './App.css';
import MainSection from './Components/MainSection';
import SearchSection from './Components/SearchSection';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <SearchSection />
      <MainSection />
    </div>
  );
}

export default App;
