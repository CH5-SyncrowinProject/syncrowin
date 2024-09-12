import * as Yup from "yup";

export const signUpSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    firstName: Yup.string().min(3).max(15).required("First name is required"),
    lastName: Yup.string().min(3).max(15).required("Last name is required"),
    company: Yup.string().max(30),
    designationId: Yup.string().required("Please select role/position")

});