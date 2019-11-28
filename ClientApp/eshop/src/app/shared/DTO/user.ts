export class User {
  id: number;
  Name: string;
  email: string;
  isLoggedIn: boolean;
  token?: string;

  constructor(userId: number) {
    this.id = userId;
    this.isLoggedIn = false;

  }
}
