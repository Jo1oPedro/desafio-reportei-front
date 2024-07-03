import axios from "axios";

export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    try {
      const response = await axios.post("http://nginx:8888/api/register", {
        name: user.name,
        email: user.email,
        user_id: user.id.toString(),
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        access_token: tokens.access_token
      });
      setCookie(event, "token", response.data.token);
      setCookie(event, "authenticatedUser", JSON.stringify(response.data.user));
      return sendRedirect(event, "/");
    } catch (error) {
      console.log(error);
      throw createError({
        statusCode: 401,
        statusMessage: "Ocorreu um erro ao autenticar",
      });
    }
  },
  onError(event, error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      statusMessage: "Ocorreu um erro ao autenticar",
    });
  },
});
