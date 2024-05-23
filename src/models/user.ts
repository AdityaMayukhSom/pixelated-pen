import { ZodAuthenticatedResponse, ZodLoginResponse } from '@/response'
import { BackEndRoutes, HttpMethods } from '@/constants'

export class User {
    private constructor(
        readonly name: string,
        readonly username: string
    ) {}

    /**
     * A utility function which will return an empty User object.
     */
    public static empty() {
        return new User('', '')
    }

    /**
     * Checks whether the user on which this is invoked is empty or not.
     * @returns true if the user is empty, else returns false.
     */
    public isEmpty() {
        return this.name === '' || this.username === ''
    }

    /**
     * This is just a short hand for checking if the user is not
     * empty or not. Note that it is used to check whether user
     * has data inside or not, it does not validate the user data
     * hence whether the user is actually logged in or it has garbage
     * data must be checked in case of serious usecases. One workaround
     * for future implementation is to call the backend API and
     * validate the data against session or JWT from the backend.
     *
     * @returns True if the user is not empty else returns false.
     */
    public isLoggedIn() {
        return !this.isEmpty()
    }

    public static async login(username: string, password: string) {
        const response = await fetch(BackEndRoutes.Login, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: HttpMethods.Post,
            body: JSON.stringify({
                username,
                password
            })
        })
        const data = await response.json()
        const loginResponse = ZodLoginResponse.parse(data)
        const createdUser = new User(loginResponse.user.name, loginResponse.user.username)
        return createdUser
    }

    /**
     * Utility function which sends request to the backend and registers a new user.
     * @param name
     * @param email
     * @param username
     * @param password
     * @returns true is the user is successfully registered, else returns false.
     */
    public static async register(name: string, email: string, username: string, password: string) {
        try {
            const response = await fetch(BackEndRoutes.Register, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: HttpMethods.Post,
                body: JSON.stringify({
                    name,
                    email,
                    username,
                    password
                })
            })
            const data = await response.json()
            console.log(data)
            return Promise.resolve(true)
        } catch (error) {
            return Promise.reject(false)
        }
    }

    public static async logout() {
        const response = await fetch(BackEndRoutes.Logout)
        const data = await response.json()
        console.log(data)
        if (response.status >= 400) {
            throw new Error('could not logout from server')
        }
    }

    /**
     * Requests backend to check whether or not the user is authenticated, if yes returns
     * the authenticated user, otherwise returns an empty user. If network error occurs,
     * returns an empty user.
     */
    static async getUserIfAuthenticated() {
        try {
            const response = await fetch(BackEndRoutes.IsAuthenticated)
            if (!response.ok) {
                throw new Error('authentication route cannot be reached')
            }
            const data = await response.json()
            console.log(data)
            const isAuthResp = ZodAuthenticatedResponse.parse(data)
            if (isAuthResp.authenticated) {
                const existingUser = new User(isAuthResp.user.name, isAuthResp.user.username)
                return existingUser
            } else {
                return User.empty()
            }
        } catch (error) {
            // console.log(error)
            return User.empty()
        }
    }
}
