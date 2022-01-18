import { onAuthStateChanged } from "firebase/auth";

export async function authFlow() {
    return onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            
        }
    })
}