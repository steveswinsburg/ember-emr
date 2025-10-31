import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

/**
 * SidebarNavigation Component
 * 
 * Simplified left sidebar navigation for patient dashboard
 */
const SidebarNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: 'fas fa-home'
    },
    {
      path: '/my-details',
      label: 'My Details',
      icon: 'fas fa-user'
    },
    {
      path: '/allergies',
      label: 'Allergies',
      icon: 'fas fa-exclamation-triangle'
    },
    {
      path: '/medications',
      label: 'Medications',
      icon: 'fas fa-pills'
    },
    {
      path: '/appointments',
      label: 'Appointments',
      icon: 'fas fa-calendar'
    },
    {
      path: '/medical-records',
      label: 'Medical Records',
      icon: 'fas fa-file-medical'
    },
    {
      path: '/test-results',
      label: 'Test Results',
      icon: 'fas fa-vial'
    }
  ];

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="sidebar-navigation bg-white border-end" style={{ minHeight: '100vh', width: '240px' }}>
      <div className="p-3">
        <div className="sidebar-header mb-4">
          <h6 className="text-primary fw-bold mb-0">
            <i className="fas fa-heartbeat me-2"></i>
            My Health
          </h6>
        </div>

        <Nav className="flex-column">
          {navigationItems.map((item, index) => (
            <LinkContainer 
              key={index} 
              to={item.path}
              className="nav-item mb-1"
            >
              <Nav.Link 
                className={`sidebar-nav-link d-flex align-items-center p-3 border-0 ${
                  isActiveLink(item.path) 
                    ? 'bg-primary text-white active' 
                    : 'text-dark hover-bg-light'
                }`}
                style={{
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div className="nav-icon me-3">
                  <i className={`${item.icon} ${isActiveLink(item.path) ? 'text-white' : 'text-primary'}`}></i>
                </div>
                <div className="nav-label fw-semibold">
                  {item.label}
                </div>
              </Nav.Link>
            </LinkContainer>
          ))}
        </Nav>
      </div>

      <style jsx>{`
        .sidebar-nav-link:hover:not(.active) {
          background-color: #f8f9fa !important;
          color: #495057 !important;
        }
        
        .sidebar-nav-link.active {
          box-shadow: 0 2px 4px rgba(0,123,255,0.25);
        }
        
        .nav-item.active .nav-icon i {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default SidebarNavigation;