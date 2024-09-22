export class User {
  constructor(
    readonly name: string,
    readonly username: string
  ) {}

  /**
   * A utility function which will return an empty User object.
   */
  public static empty() {
    return new User('', '')
  }
}
