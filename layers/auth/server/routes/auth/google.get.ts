import { sendRedirect } from 'h3';

type GoogleUser = {
  sub: string;
  name: string;
  picture: string;
  email: string;
  email_verified: boolean;
};

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user: googleUser }: { user: GoogleUser }) {
    const paymentsService = event.context.container.get('paymentsService');
    const userService = event.context.container.get('userService');

    const user = await userService.createUserIfDoesNotExist({
      provider: 'google',
      providerId: googleUser.sub,
      avatarUrl: googleUser.picture,
    });
    const subscription = await paymentsService.getSubscription(user.id);
    await setUserSession(event, {
      user: {
        id: user.id,
        createdAt: user.createdAt.toString(),
        avatarUrl: user.avatarUrl ?? undefined,
      },
      subscription,
    });
    return sendRedirect(event, '/');
  },
});
