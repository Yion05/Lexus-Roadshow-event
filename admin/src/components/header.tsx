const Header = () => {
  return (
    <div className="flex items-center justify-between flex-shrink-0 h-16 px-8 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <button id="sidebar-toggle" className="mr-4 text-gray-700 hover:text-gray-900 md:hidden">
          <i className="fas fa-bars text-xl"></i>
        </button>
        <h1 className="text-lg font-medium">test</h1>
      </div>
      <div className="flex items-center">
        <span className="text-sm">Welcome, Lexus</span>
      </div>
    </div>
  );
};

export default Header;