import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

/**
 * SidebarNavigation Component
 * 
 * Left sidebar navigation for patient dashboard with icons and organized sections
 */
const SidebarNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      section: 'Overview',
      items: [
        {
          path: '/',
          label: 'Dashboard',
          icon: 'fas fa-tachometer-alt',
          description: 'Overview of your health information'
        }
      ]
    },
    {
      section: 'Personal Information',
      items: [
        {
          path: '/profile',
          label: 'My Profile',
          icon: 'fas fa-user-circle',
          description: 'Personal details and contact information'
        }
      ]
    },
    {
      section: 'Medical Information',
      items: [
        {
          path: '/medical-records',
          label: 'Medical Records',
          icon: 'fas fa-file-medical-alt',
          description: 'Health history and medical documents'
        },
        {
          path: '/medications',
          label: 'Medications',
          icon: 'fas fa-pills',
          description: 'Current and past medications'
        }
      ]
    },
    {
      section: 'Healthcare Services',
      items: [
        {
          path: '/appointments',
          label: 'Appointments',
          icon: 'fas fa-calendar-check',
          description: 'Upcoming and past appointments'
        }
      ]
    }
  ];

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="sidebar-navigation bg-light border-end" style={{ minHeight: '100vh', width: '280px' }}>
      <div className="p-3">
        <div className="sidebar-header mb-4">
          <h6 className="text-muted text-uppercase small fw-bold mb-0">
            <i className="fas fa-heartbeat me-2 text-danger"></i>
            Patient Portal
          </h6>
        </div>

        {navigationItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="nav-section mb-4">
            <h6 className="sidebar-section-title text-muted text-uppercase small fw-bold mb-3 px-2">
              {section.section}
            </h6>
            
            <Nav className="flex-column">
              {section.items.map((item, itemIndex) => (
                <LinkContainer 
                  key={itemIndex} 
                  to={item.path}
                  className={`nav-item ${isActiveLink(item.path) ? 'active' : ''}`}
                >
                  <Nav.Link 
                    className={`sidebar-nav-link d-flex align-items-start p-3 border-0 ${
                      isActiveLink(item.path) 
                        ? 'bg-primary text-white active' 
                        : 'text-dark hover-bg-light'
                    }`}
                    style={{
                      borderRadius: '8px',
                      marginBottom: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div className="nav-icon me-3 mt-1">
                      <i className={`${item.icon} ${isActiveLink(item.path) ? 'text-white' : 'text-primary'}`}></i>
                    </div>
                    <div className="nav-content flex-grow-1">
                      <div className="nav-label fw-semibold mb-1">
                        {item.label}
                      </div>
                      <div 
                        className={`nav-description small ${
                          isActiveLink(item.path) ? 'text-white-50' : 'text-muted'
                        }`}
                        style={{ fontSize: '0.75rem', lineHeight: '1.2' }}
                      >
                        {item.description}
                      </div>
                    </div>
                  </Nav.Link>
                </LinkContainer>
              ))}
            </Nav>
          </div>
        ))}
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
        
        .sidebar-section-title {
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
};

export default SidebarNavigation;