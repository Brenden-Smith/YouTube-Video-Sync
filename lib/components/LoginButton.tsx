import GoogleLogo from "../assets/icons/GoogleLogo";
import {
  Button,
} from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useApp } from "../context/app";

export function LoginButton() {

  const { setLoading } = useApp();
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    const redirect =
      router.query.redirect === undefined
        ? "/"
        : (router.query.redirect as string);
    await signInWithPopup(getAuth(), new GoogleAuthProvider())
      .then(() => router.replace(redirect))
      .catch((error) => console.log(error));
    setLoading(false);
  }

  return <Button
    variant="contained"
    startIcon={<GoogleLogo />}
    onClick={() => handleLogin()}
  >
    Login with Google
  </Button>;
}
