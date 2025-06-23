import { ToastContainer } from 'react-toastify';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import { ThemeProvider } from './components/theme/theme-provider';

type Props = {
  children: React.ReactNode;
}

function App({ children }: Props) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='min-h-screen flex flex-col'>
        <Header />
        <div className='flex-1'>{children}</div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
