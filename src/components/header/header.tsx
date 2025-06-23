import { useAuth } from '@/context/AuthContext';
import { Home, LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import { ModeToggle } from '../ui/mode-toggle';

const Header = () => {
    const { isAuthenticated ,logout} = useAuth();
  return (
    <header className="bg-gray-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="w-6 h-6" />
            <h1 className="text-xl font-bold">Note App</h1>
          </div>
          <div className='flex items-center space-x-4'>
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Hoş geldin </span>
              </div>
              <Button onClick={logout}><LogOut className="w-4 h-4" />Çıkış</Button>
            </div>
          )}
           <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
