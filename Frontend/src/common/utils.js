export const checkActivePath = (path) => window.location.pathname === path;

export const mapPathsToSections = (path) => {
  const sectionMap = {
    '/registerSingleuser': 'accounts',
    '/registerMultipleUser': 'accounts',
    '/listuser': 'accounts',
    '/addrole': 'role',
    '/createCampus': 'settings',
    '/listCampus': 'settings',
    '/academicyear': 'settings',
    '/listacademicyear': 'settings',
    '/eventtype': 'settings',
    '/eventtypelist': 'settings',
    '/createdepartments': 'settings',
    '/listdepartment': 'settings',
    '/createTag': 'settings',
    '/listTag': 'settings',
    '/registerEvent': 'eventStatus',
    '/listevents': 'eventStatus',
  };
  
  return Object.keys(sectionMap).find(key => path.includes(key)) || null;
};
