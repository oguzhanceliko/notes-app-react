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
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
