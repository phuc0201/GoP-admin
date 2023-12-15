import { environment } from "src/environments/environment";

export const URLConstant = {
  API: {
    ROLE: {
      ADMIN: '/admin'
    },
    ADMIN: {
      ENDPOINT: environment.serverTestUrl,
      AUTH: {
        LOGIN: '/auth/admin/signin',
        LOGOUT: '/auth/admin/logout',
        REGISTER: '/auth/register',
      },
      ROUTE: {
        ADMIN_PROFILE: '/profile',
        DASHBOARD: '/dashboard',
        USERS: '/users',
        DRIVERS: '/drivers',
        JOURNEYS: '/orders'
      },
    }
  },
  ROUTE: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
    },
    ADMINISTRATION: {
      ADMIN_PROFILE: '/administration/profile',
      DASHBOARD: '/administration/dashboard',
      USERS: '/administration/users',
      JOURNEYS: '/administration/trips',
    },
  }
};
