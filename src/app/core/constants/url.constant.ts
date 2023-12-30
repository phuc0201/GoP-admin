import { environment } from "src/environments/environment";

export const URLConstant = {
  API: {
    KEY_MAP: 'Bearer 5b3ce3597851110001cf6248b8ac911881304205ab03a6431b40bc13',
    ROLE: {
      ADMIN: '/admin',
      DRIVER: '/driver'
    },
    DRIVER: {
      ENDPOINT: environment.serverUrl,
      AUTH: {
        LOGIN: '/auth/driver/signin',
        LOGOUT: '/auth/driver/logout',
        REGISTER: '/auth/driver/signup',
      },
    },
    ADMIN: {
      ENDPOINT: environment.serverUrl,
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
      LOGIN: '/auth/admin/login',
      REGISTER: '/auth/driver/register',
      DRIVER_LOGIN: '/auth/driver/login'
    },
    DRIVER: {
      PROFILE: '/driver/profile'
    },
    ADMINISTRATION: {
      ADMIN_PROFILE: '/administration/profile',
      DASHBOARD: '/administration/dashboard',
      USERS: '/administration/users',
      JOURNEYS: '/administration/trips',
    },
  }
};
