import { defineStore } from "pinia";
import createUser from '@/api/useCreateUser';
import loginUser from '@/api/useLoginUser';

export const useUserStore = defineStore("user", {
  state: () => ({
    userLoggedIn: false,
    position: null,
  }),
  actions: {
    async register(values) {
      try {
        const { name, email, password, position } = values;
        await createUser(name, email, password, position);
        this.userLoggedIn = true;
        this.position = position;
      } catch (error) {
        console.error("Error registering user:", error);
      }
    },
    async authenticate(values) {
      try {
        const { email, password } = values;
        const response = await loginUser(email, password);
        this.userLoggedIn = true;
        this.position = response.position;
      } catch (error) {
        console.error("Error authenticating user:", error);
      }
    },
    // signOut() {
    //   this.userLoggedIn = false;
    //   this.position = null;
    // },
  },
});
