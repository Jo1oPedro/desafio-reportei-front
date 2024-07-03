import { defineStore } from "pinia";

interface UserRegisterPayloadInterface {
  email: String;
  username: String;
  password: String;
  passwordConfirmation: String;
}

interface UserLoginPayloadInterface {
  email: String;
  password: String;
}

let logoutTimer: NodeJS.Timeout;

export const useAuthStore = defineStore({
  id: "myAuthStore",
  state: () => ({
    user: {},
    authenticated: false,
    loading: false,
    error: "",
  }),
  actions: {
    getAuthenticatedUser() {
      return this.user;
    },
    async registerUser({
      email,
      username,
      password,
      passwordConfirmation,
    }: UserRegisterPayloadInterface) {
      await this.authenticateUser("http://localhost:7070/api/register", {
        email,
        name: username,
        password,
        password_confirmation: passwordConfirmation,
      });
    },
    async loginUser({ email, password }: UserLoginPayloadInterface) {
      await this.authenticateUser("http://localhost:7070/api/login", {
        email,
        password,
      });
    },
    async authenticateUser(url: string, body: object) {
      try {
        this.error = "";
        this.loading = true;

        const { data, error }: any = await useFetch(url, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body,
        });

        if (error.value) {
          this.error = error.value.data.message;
          this.loading = false;
          return;
        }

        if (data.value) {
          const expiresInMiliSeconds = data.value.expires_in * 60 * 1000;
          logoutTimer = setTimeout(() => this.logUserOut, expiresInMiliSeconds);
          const token = useCookie("token", {
            expires: new Date(new Date().getTime() + expiresInMiliSeconds),
            secure: true,
            sameSite: "strict",
          });
          token.value = data.value.token;

          this.user = {
            username: data.value.user.name,
            email: data.value.user.email,
            id: data.value.user.id,
          };
          const authenticatedUser = useCookie("authenticatedUser", {
            expires: new Date(new Date().getTime() + expiresInMiliSeconds),
            secure: true,
            sameSite: "strict",
          });
          authenticatedUser.value = JSON.stringify(this.user);
          this.authenticated = true;
          this.loading = false;
          return;
        }
      } catch (error) {
        console.log(error);
      }
    },
    logUserOut() {
      const token = useCookie("token");
      token.value = null;
      this.authenticated = false;
      this.user = {};
      clearTimeout(logoutTimer);
      useRouter().push("/login");
    },
    setAuthenticatedUser() {
      if (!this.user?.hasOwnProperty("email")) {
        const user = useCookie("authenticatedUser");
        this.user = user.value;
      }
    },
  },
});
