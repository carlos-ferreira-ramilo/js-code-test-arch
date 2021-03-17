export default class User {
  id: string;
  name: string;
  email: string;
  group: number;

  constructor(object: any) {
    this.id = object.id;
    this.name = object.name;
    this.email = object.email;
    this.group = object.group;
  }

  /**
   * Partial update with the values in the user passed by parameter.
   * @param user with data used to update this user.
   * @returns this with the update values.
   */
  public update(user: User): User {
    if (user.id) {
      this.id = user.id;
    }
    if (user.name) {
      this.name = user.name;
    }
    if (user.email) {
      this.email = user.email;
    }
    if (user.group) {
      this.group = user.group;
    }
    return this;
  }
}
