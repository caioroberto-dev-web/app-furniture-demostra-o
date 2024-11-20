import { useRouter } from "vue-router";

//Store
import { useUserStore } from "../store/useUserStore";

const authGuard = () => {
  const router = useRouter();
  const userStore = useUserStore();

  if (userStore.user.loggedIn !== true) {
    console.log('ativou')
    router.push("/login");
  }
};

export default authGuard;
