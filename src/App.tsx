import { AppRoutes } from './routes/AppRoutes';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { CustomCursor } from "./components/customCursor/CustomCursor";
import './App.css';

export function App() {
  return (
    <div className="app">
      <Header />
      <CustomCursor />
      <main className="app__main">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}