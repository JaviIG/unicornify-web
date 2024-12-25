export function useUser() {
  const { clear, user, loggedIn: isSignedIn, session } = useUserSession();

  const authProviderUrls = {
    github: '/auth/github',
    google: '/auth/google',
  };

  const router = useRouter();

  const isSubscriptionActive = () => {
    return (
      !!session.value.subscription && new Date(session.value.subscription.endDate) > new Date()
    );
  };

  async function signOut() {
    await clear();
    router.push('/');
  }

  return {
    authProviderUrls,
    user,
    signOut,
    isSignedIn,
    isSubscriptionActive,
  };
}

export function useSession() {
  const { session } = useUserSession();

  return {
    session,
  };
}
