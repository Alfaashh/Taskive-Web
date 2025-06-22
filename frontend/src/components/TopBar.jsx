import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Task', path: '/task' },
  { name: 'Store', path: '/store' },
  { name: 'Profile', path: '/profile' },
];

const TopBar = () => {
  const location = useLocation();
  return (
    <header className="w-full sticky top-0 z-50 shadow-sm" style={{background: 'linear-gradient(90deg, #2E073F 0%, #7812A5 100%)'}}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2 md:space-x-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium text-white transition-colors duration-200 ${isActive ? 'bg-white bg-opacity-20 shadow text-white' : 'hover:bg-white hover:bg-opacity-10'}`
              }
              end={item.path === '/'}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="text-2xl font-extrabold tracking-tight text-white select-none">
          <span className="">TASK</span><span className="text-[#C86DD7]">IVE</span>
        </div>
      </nav>
    </header>
  );
};

export default TopBar; 