import z from "zod";
import * as EN from "../../../shared/enums";

export const signUpSchema = {
    body: z.object({
        fName: z.string().min(3, "First name must be at least 3 characters"),
        lName: z.string().min(3, "Last name must be at least 3 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        cPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
        age: z.number().min(14, "Age must be at least 14").max(100, "Age must be less than 100"),
        phone: z.string().min(10, "Phone must be valid"),
        address: z.string().optional(),
        gender: z.enum([EN.genderType.male,EN.genderType.female]),
        role: z.enum([EN.roleType.user,EN.roleType.admin]),
    })
        .refine((data) => data.password === data.cPassword, {
            message: "Confirm password does not match password",
        })
};

signUpSchema.body