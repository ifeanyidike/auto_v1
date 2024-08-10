import { headers } from 'next/headers';
import User from '~/app/api/user/logic';
import { initializeAuth0 } from '~/lib/auth0';
import { type Auth0User } from '~/types/auth';
import { Mailer } from './mail';

// const { withPageAuthRequired, getSession } = auth0;
// type ProtectedPageType = () => (Component: any, options: any) => any;
export default class Auth0 {
  public static async getSessionUser() {
    const headersList = headers();
    const hostname = headersList.get('host');
    const auth0 = initializeAuth0(hostname!);

    const { user: auth0User } = (await auth0.getSession()) ?? {};
    return auth0User as Auth0User;
  }

  // public static ProtectedPage: ProtectedPageType = () => {
  //   const headersList = headers();
  //   const hostname = headersList.get('host');
  //   const auth0 = initializeAuth0(hostname!);
  //   return auth0.withPageAuthRequired;
  // };

  public static async findOrCreateAuth0User() {
    const auth0User = await Auth0.getSessionUser();

    if (!auth0User) return null;

    const UserLogic = new User();
    const userExists = (await UserLogic.numUser(auth0User.email)) === 1;

    const userData = await UserLogic.findOrCreate(auth0User.email, {
      firstName: auth0User.given_name,
      lastName: auth0User.family_name,
      imgUrl: auth0User.picture,
      email: auth0User.email,
    });

    if (!userExists) {
      const mailer = new Mailer();
      await mailer.sendWelcomeUserEmail();
    }

    return userData;
  }
}
