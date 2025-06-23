import { Home } from 'lucide-react';
import { ModeToggle } from '../ui/mode-toggle';

const Header = () => {
  return (
    <header className="bg-gray-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="w-6 h-6" />
            <h1 className="text-xl font-bold">Note App</h1>
          </div>
          {/* {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Hoş geldin, {user.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Çıkış</span>
              </button>
            </div>
          )} */}
           <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
