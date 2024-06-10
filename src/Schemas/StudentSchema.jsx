import * as yup from "yup";

export const studentSchema = yup.object({
    studentName: yup.string().required().min(2, "Min 2 Characters Required"),
    studentEmail: yup.string().required().min(5, "Min 2 Characters Required"),
    studentPhone: yup.number().required().min(10, "Only 10 Digits for Mobile No"),
})