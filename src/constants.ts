// in case of local development, put the url of the backend
// where api serving code is hosted (eg: http://localhost:8080 etc)
const BACKEND_BASE_URL = '/api'
const BACKEND_API_VERSION = '/v1'
const BACKEND_PREFIX = BACKEND_BASE_URL + BACKEND_API_VERSION

export enum BackEndRoutes {
    Register = BACKEND_PREFIX + `/auth/register`,
    IsAuthenticated = BACKEND_PREFIX + '/auth/is-authenticated',
    Login = BACKEND_PREFIX + '/auth/login',
    Logout = BACKEND_PREFIX + '/logout'
}

export enum FrontEndRoutes {
    Root = '/',
    Home = '/home',
    Auth = '/auth',
    Write = '/write',
    Register = '/register'
}

export enum HttpMethods {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE'
}
