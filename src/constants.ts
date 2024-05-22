// in case of local development, put the url of the backend
// where api serving code is hosted (eg: http://localhost:8080 etc)
const BACKEND_BASE_URL = ''

export enum BackEndRoutes {
    Register = BACKEND_BASE_URL + '/api/v1/auth/register',
    Login = BACKEND_BASE_URL + '/api/v1/auth/login',
    Logout = BACKEND_BASE_URL + '/api/v1/logout'
}

export enum FrontEndRoutes {
    Root = '/',
    Home = '/home',
    Auth = '/auth',
    Register = '/register',
    Write = '/write'
}

export enum HttpMethods {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE'
}
