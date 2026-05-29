import { BrowserRouter, Route, Routes } from 'react-router';
import Navbar from './components/ui/Navbar';
import Posts from './pages/Posts';
import Products from './pages/Products';
import Users from './pages/Users';
import SignForm from './components/forms/SignForm';
import NotFound from './pages/NotFound';
import Footer from './components/ui/Footer';

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
          <Route path="/login" element={<SignForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
