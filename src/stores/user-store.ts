import { ref } from 'vue'
import { defineStore } from 'pinia'
import { User } from '@/models/user'
import { BackEndRoutes, HttpMethods } from '@/constants'
import { ZodAuthenticatedResponse, ZodLoginResponse } from '@/response'

class UserService {
  private user = ref<User>(User.empty())

  public async login(username: string, password: string): Promise<Boolean> {
    try {
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
      this.user.value = new User(loginResponse.user.name, loginResponse.user.username)
      return true
    } catch (e) {
      this.user.value = User.empty()
      return false
    }
  }

  public async logout() {
    try {
      const response = await fetch(BackEndRoutes.Logout)
      const data = await response.json()
      if (response.status >= 400) {
        throw new Error('could not logout from server')
      }
    } catch (error) {
      // console.log(error)
    } finally {
      this.user.value = User.empty()
    }
  }

  /**
   * Utility function which sends request to the backend and registers a new user.
   * @param name
   * @param email
   * @param username
   * @param password
   * @returns true is the user is successfully registered, else returns false.
   */
  public async register(name: string, email: string, username: string, password: string) {
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

      if (!response.ok) {
        throw new Error('could not register user')
      }

      const data = await response.json()
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Checks whether the user on which this is invoked is empty or not.
   * @returns true if the user is empty, else returns false.
   */
  private isEmpty() {
    return this.user.value.name === '' || this.user.value.username === ''
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
  public isAuthenticated() {
    return !this.isEmpty()
  }

  /**
   * Requests backend to check whether or not the user is authenticated, if yes returns
   * the authenticated user, otherwise returns an empty user. If network error occurs,
   * returns an empty user.
   */
  private async getUserIfAuthenticated() {
    try {
      const response = await fetch(BackEndRoutes.IsAuthenticated)
      if (!response.ok) {
        throw new Error('authentication route could not be reached')
      }
      const data = await response.json()
      const isAuthResp = ZodAuthenticatedResponse.parse(data)

      if (!isAuthResp.authenticated) {
        throw new Error('user is not authenticated')
      }

      const existingUser = new User(isAuthResp.user.name, isAuthResp.user.username)
      return existingUser
    } catch (error) {
      // console.log(error)
      return User.empty()
    }
  }

  async checkAuthentication() {
    this.user.value = await this.getUserIfAuthenticated()
    return this.isAuthenticated()
  }
}

export const useUserStore = defineStore('user-store', () => new UserService())
