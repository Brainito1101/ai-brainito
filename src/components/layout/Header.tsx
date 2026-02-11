import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard, LogOut, ChevronDown, Settings, User } from "lucide-react";
import braintoLogo from "@/assets/brainito-logo.png";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      <header className="left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src={braintoLogo}
                alt="Brainito"
                className="h-8 md:h-10 w-auto"
                loading="lazy"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="bg-primary hover:bg-primary/90"
                  >
                    <a href="https://app.brainito.com/dashboard">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Go to Dashboard
                    </a>
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-foreground/80 hover:text-primary"
                >
                  Login
                </Button>
              )}

              <Button variant="gradient" size="default" asChild>
                <a href="/hire-marketer">Hire Marketer</a>
              </Button>

              {/* Profile Dropdown - Only show when logged in */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 ml-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <User className="h-4 w-4" />
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">
                            {user.username || 'User'}
                          </span>
                          <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <a href="https://app.brainito.com/dashboard/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Profile
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </nav>

            {/* Mobile Login/Dashboard Button - Visible on mobile only */}
            <div className="md:hidden flex items-center gap-2">
              {user ? (
                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="bg-primary hover:bg-primary/90"
                >
                  <a href="https://app.brainito.com/dashboard">
                    <LayoutDashboard className="w-4 h-4 mr-1" />
                    Dashboard
                  </a>
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Login
                </Button>
              )}

              {/* Mobile Menu Button */}
              <button
                className="p-2 text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav
              ref={mobileMenuRef}
              className="md:hidden py-4 border-t border-border/50 animate-fade-in bg-background/95 backdrop-blur-lg shadow-lg rounded-b-lg"
            >
              <div className="flex flex-col gap-3 px-2">
                {/* Login/Dashboard Button - Prominently at the top */}
                {user ? (
                  <>
                    {/* User Info in Mobile */}
                    <div className="px-4 py-3 flex items-center gap-3 bg-muted/50 rounded-lg border border-border/30">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {user.username || 'User'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="default"
                      className="justify-start w-full bg-primary hover:bg-primary/90"
                      asChild
                    >
                      <a href="https://app.brainito.com/dashboard">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Go to Dashboard
                      </a>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="default"
                    className="justify-start w-full bg-primary hover:bg-primary/90"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                )}

                {/* Divider */}
                <div className="border-t border-border/30 my-1"></div>

                {/* Navigation Links */}
                <a
                  href="/diy-marketing-plan"
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  DIY Marketing Plan
                </a>

                <Button variant="gradient" asChild className="w-full">
                  <a href="/hire-marketer" onClick={() => setIsMenuOpen(false)}>Hire Marketer</a>
                </Button>

                {/* User Actions - Only show when logged in */}
                {user && (
                  <>
                    <div className="border-t border-border/30 my-1"></div>


                    <Button
                      variant="ghost"
                      className="justify-start w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
