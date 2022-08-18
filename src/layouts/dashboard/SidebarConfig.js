// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  project: getIcon('ic_project'),
  type: getIcon('ic_type'),
  category: getIcon('ic_category'),
  technology: getIcon('ic_technology'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics }]
  },

  // MANAGEMENT : Project
  // ----------------------------------------------------------------------
  {
    subheader: 'Project',
    items: [
      // MANAGEMENT : Projects
      {
        title: 'Projects',
        path: PATH_DASHBOARD.project.root,
        icon: ICONS.project,
        children: [
          { title: 'list', path: PATH_DASHBOARD.project.list },
          { title: 'create', path: PATH_DASHBOARD.project.newProject }
        ]
      },

      // MANAGEMENT : Type
      {
        title: 'Types',
        path: PATH_DASHBOARD.type.root,
        icon: ICONS.type,
        children: [
          { title: 'list', path: PATH_DASHBOARD.type.list },
          { title: 'create', path: PATH_DASHBOARD.type.newType }
        ]
      },

      // MANAGEMENT : Category
      {
        title: 'Categories',
        path: PATH_DASHBOARD.category.root,
        icon: ICONS.category,
        children: [
          { title: 'list', path: PATH_DASHBOARD.category.list },
          { title: 'create', path: PATH_DASHBOARD.category.newCategory }
        ]
      },

      // MANAGEMENT : Used Technologies
      {
        title: 'Technologies',
        path: PATH_DASHBOARD.technology.root,
        icon: ICONS.technology,
        children: [
          { title: 'list', path: PATH_DASHBOARD.technology.list },
          { title: 'create', path: PATH_DASHBOARD.technology.newTechnology }
        ]
      }
    ]
  },

  // MANAGEMENT : User
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.newUser },
          { title: 'account', path: PATH_DASHBOARD.user.account }
        ]
      }
    ]
  }
];

export default sidebarConfig;
