export enum Errors {
    incorrectEmail,
    incorrectLogin,
    nonExistentEmail,
    nonExistentLogin,
    weakPassword,
    passwordsDontMatch,
    emailAlreadyExist,
    loginAlreadyExist,
    wrongPassword,
    termsDontAgreed,
    nameAlreadyExist
}

export type Status = 'success' | 'error' | 'pending' | 'none'
