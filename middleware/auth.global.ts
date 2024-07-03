export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");

  if (token.value && (to?.name === "login" || to?.name === "register")) {
    return navigateTo("/");
  }

  if (
    !token.value &&
    to?.name !== "login" &&
    to?.name !== "register" &&
    to?.name !== "auth-github-callback"
  ) {
    abortNavigation();
    return navigateTo("/login");
  }
});
