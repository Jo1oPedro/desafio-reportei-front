import axios from "axios";

export default oauth.githubEventHandler({
  config: {
    emailRequired: false,
  },
  async onSuccess(event, { user, tokens }) {
    try {
      const runtimeConfig = useRuntimeConfig();
      const response = await axios.post(
        `${runtimeConfig.public.url}/api/register`,
        {
          name: user.name,
          email: user.email ?? "sememail@gmail.com",
          github_id: user.id.toString(),
          avatar_url: user.avatar_url,
          github_login: user.login,
          access_token: tokens.access_token,
        }
      );
      setCookie(event, "token", response.data.token);
      setCookie(event, "authenticatedUser", JSON.stringify(response.data.user));
      return sendRedirect(event, "/");
    } catch (error) {
      throw createError({
        statusCode: 401,
        statusMessage: "Ocorreu um erro ao autenticar",
      });
    }
  },
  onError(event, error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Ocorreu um erro ao autenticar",
    });
  },
});
