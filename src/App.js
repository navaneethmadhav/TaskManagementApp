import './App.css';
import MainSection from './Components/MainSection';
import SearchSection from './Components/SearchSection';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

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
