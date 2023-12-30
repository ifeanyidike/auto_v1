import { type Session, getSession } from '@auth0/nextjs-auth0';
import User from '~/app/api/user/logic';
import { type Auth0User } from '~/types/auth';

export default class Auth0 {
  private async getSessionUser() {
    const { user: auth0User }: Session = (await getSession())!;
    return auth0User as Auth0User;
  }

  public async findOrCreateAuth0User() {
    const auth0User = await this.getSessionUser();
    if (!auth0User) return null;

    const UserLogic = new User();

    return await UserLogic.findOrCreate(auth0User.email, {
      firstName: auth0User.given_name,
      lastName: auth0User.family_name,
      imgUrl: auth0User.picture,
      email: auth0User.email,
    });
  }
}
