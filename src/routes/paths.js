// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/auth/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  page404: '/404',
  page500: '/500'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    analytics: path(ROOTS_DASHBOARD, '/analytics')
  },
  project: {
    root: path(ROOTS_DASHBOARD, '/project'),
    list: path(ROOTS_DASHBOARD, '/project/list'),
    newProject: path(ROOTS_DASHBOARD, '/project/new'),
    editById: path(ROOTS_DASHBOARD, `/project/id/edit`)
  },
  category: {
    root: path(ROOTS_DASHBOARD, '/category'),
    list: path(ROOTS_DASHBOARD, '/category/list'),
    newCategory: path(ROOTS_DASHBOARD, '/category/new'),
    editById: path(ROOTS_DASHBOARD, `/category/id/edit`)
  },
  type: {
    root: path(ROOTS_DASHBOARD, '/type'),
    list: path(ROOTS_DASHBOARD, '/type/list'),
    newType: path(ROOTS_DASHBOARD, '/type/new'),
    editById: path(ROOTS_DASHBOARD, `/type/id/edit`)
  },
  technology: {
    root: path(ROOTS_DASHBOARD, '/technology'),
    list: path(ROOTS_DASHBOARD, '/technology/list'),
    newTechnology: path(ROOTS_DASHBOARD, '/technology/new'),
    editById: path(ROOTS_DASHBOARD, `/technology/id/edit`)
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
