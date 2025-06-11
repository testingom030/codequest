import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  children?: React.ReactNode;
  isLoggedIn?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn = false }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="w-full pt-[50px]">
        <div className="flex">
          {/* Left Sidebar */}
          <aside className="sticky top-[50px] h-[calc(100vh-50px)] w-[164px] border-r border-[#d6d9dc] overflow-y-auto">
            <nav className="pt-4 pb-8">
              <ul>
                <li>
                  <Link
                    to="/"
                    className={`flex items-center pl-4 py-1 pr-4 leading-[34px] ${
                      isActive('/')
                        ? 'font-bold bg-[#f1f2f3] border-r-4 border-stackoverflow-orange'
                        : 'text-[#525960] hover:text-[#232629]'
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li className="mt-4">
                  <div className="pl-4 pr-4 mb-1 text-[11px] uppercase text-[#525960] leading-[18px]">
                    Public
                  </div>
                  <ul>
                    <li>
                      <Link
                        to="/questions"
                        className={`flex items-center pl-4 py-1 pr-4 leading-[34px] ${
                          isActive('/questions')
                            ? 'font-bold bg-[#f1f2f3] border-r-4 border-stackoverflow-orange'
                            : 'text-[#525960] hover:text-[#232629]'
                        }`}
                      >
                        Questions
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tags"
                        className={`flex items-center pl-4 py-1 pr-4 leading-[34px] ${
                          isActive('/tags')
                            ? 'font-bold bg-[#f1f2f3] border-r-4 border-stackoverflow-orange'
                            : 'text-[#525960] hover:text-[#232629]'
                        }`}
                      >
                        Tags
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/users"
                        className={`flex items-center pl-4 py-1 pr-4 leading-[34px] ${
                          isActive('/users')
                            ? 'font-bold bg-[#f1f2f3] border-r-4 border-stackoverflow-orange'
                            : 'text-[#525960] hover:text-[#232629]'
                        }`}
                      >
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/companies"
                        className={`flex items-center pl-4 py-1 pr-4 leading-[34px] ${
                          isActive('/companies')
                            ? 'font-bold bg-[#f1f2f3] border-r-4 border-stackoverflow-orange'
                            : 'text-[#525960] hover:text-[#232629]'
                        }`}
                      >
                        Companies
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block w-[300px] border-l border-[#d6d9dc] px-4 py-6">
            <section className="mb-6">
              <h2 className="text-[#232629] text-[18px] mb-4">The Overflow Blog</h2>
              <ul className="space-y-4 text-[13px]">
                <li className="flex gap-2">
                  <span>📝</span>
                  <a href="#" className="text-[#525960] hover:text-[#232629]">
                    Observability is key to the future of software (and your DevOps career)
                  </a>
                </li>
                <li className="flex gap-2">
                  <span>📝</span>
                  <a href="#" className="text-[#525960] hover:text-[#232629]">
                    Podcast 374: How valuable is your screen name?
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-[#232629] text-[18px] mb-4">Featured on Meta</h2>
              <ul className="space-y-4 text-[13px]">
                <li className="flex gap-2">
                  <span>💭</span>
                  <a href="#" className="text-[#525960] hover:text-[#232629]">
                    Review queue workflows - Final release...
                  </a>
                </li>
                <li className="flex gap-2">
                  <span>💭</span>
                  <a href="#" className="text-[#525960] hover:text-[#232629]">
                    Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG
                  </a>
                </li>
                <li className="flex gap-2">
                  <span>📊</span>
                  <a href="#" className="text-[#525960] hover:text-[#232629]">
                    Outdated Answers: accepted answer is now unpinned on Stack Overflow
                  </a>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Layout;
