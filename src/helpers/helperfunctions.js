const errorMessage = (err) => {
    switch(err){
        case "auth/invalid-email": return "Invalid email"
        case "auth/weak-password": return "The password must be at least 6 digits"
        case "auth/email-already-in-use": return "This email is already in use"
        case "auth/wrong-password": return "Incorrect username or password"
        case "auth/user-not-found": return "Incorrect username or password"
        default: return err
    }
}

export { errorMessage }