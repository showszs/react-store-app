import { BrowserRouter, Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import Posts from './pages/Posts';
import Products from './pages/Products';
import Users from './pages/Users';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
