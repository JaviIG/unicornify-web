import { defineOAuthGitHubEventHandler, setUserSession } from '#imports';
import { sendRedirect } from 'h3';

export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user: githubUser }) {
    const paymentsService = event.context.container.get('paymentsService');
    const userService = event.context.container.get('userService');

    const user = await userService.createUserIfDoesNotExist({
      provider: 'github',
      providerId: githubUser.id,
      avatarUrl: githubUser.avatar_url,
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
