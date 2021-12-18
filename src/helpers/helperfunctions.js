const errorMessage = (err) => {
    switch(err){
        case "auth/invalid-email": return "Invalid email format"
        case "auth/weak-password": return "The password must be at least 6 digits"
        case "auth/email-already-in-use": return "This email is already in use"
        case "auth/wrong-password": return "Incorrect email or password"
        case "auth/user-not-found": return "Incorrect email or password"
        default: return err
    }
}

const getTime = (createdAt) => {
    const minutes = createdAt.getMinutes().toString();
    const hours = createdAt.getHours().toString();

    return `${hours.length === 1 ? "0" + hours : hours}:${minutes.length === 1 ? "0" + minutes : minutes}`
}

export { errorMessage, getTime }