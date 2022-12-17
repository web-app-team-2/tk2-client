import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <Navbar />
        <div className='menu'>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/movie/:id' element={<MovieDetailPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;