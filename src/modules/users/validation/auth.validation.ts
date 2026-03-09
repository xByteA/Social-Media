import z from "zod";
import * as EN from "../../../shared/enums";

// shared attributes
const isValiedPassword = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
const isValiedEmail = z.string().email("Invalid email address")
const isValiedToken = z.string().min(1, "Token is required")


// signUp schema
export const signUpSchema = {
    body: z.object({
        fName: z.string().min(3, "First name must be at least 3 characters"),
        lName: z.string().min(3, "Last name must be at least 3 characters"),
        email: isValiedEmail,
        password: isValiedPassword,
        cPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
        age: z.number().min(14, "Age must be at least 14").max(100, "Age must be less than 100"),
        phone: z.string().min(10, "Phone must be valid"),
        address: z.string().optional(),
        gender: z.enum(EN.genderType),
        role: z.enum(EN.roleType).default(EN.roleType.user),
    })
        .refine((data) => data.password === data.cPassword, {
            message: "password do not match",
        })
};
// confirm email schema
export const confirmEmailSchema = {
    body: z.object({
        email: isValiedEmail,
        otp: z.string().min(6).max(6).trim()
    })
};
// logIn schema
export const logInSchema = {
    body: z.object({
        email: isValiedEmail,
        password: isValiedPassword
    })
};
// logOut schema
export const logOutSchema = {
    headers: z.object({
        authorization: isValiedToken
    })
};
// refreshToken schema
export const refreshTokenSchema = {
    headers: z.object({
        authorization: isValiedToken
    })
};
// logIn with Google schema
export const logInGmailSchema = {
    body: z.object({
        tokenId: z.string()
    }).required()

};