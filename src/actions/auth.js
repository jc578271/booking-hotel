import { firebase, googleAuthProdiver } from '../firebase';

// Login
export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startLoginWithGoogle = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProdiver);
    }
}

export const startLogin = (email, password) => {
    return () => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }
}

export const logout = () => ({
    type: 'LOGOUT',
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    }
}