import { environment } from "src/environments/environment";

export const URLConstant = {
  API: {
    ADMIN: {
      ENDPOINT: environment.serverUrl,
      AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
      },
      ROUTE: {
        ADMIN_PROFILE: '/profile',
        DASHBOARD: '/dashboard',
        USERS: '/users',
        JOURNEYS: '/journeys'
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
      JOURNEYS: '/administration/journeys'
    },
  }
}
