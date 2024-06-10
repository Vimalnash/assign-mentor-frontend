import * as yup from "yup";

export const mentorSchema = yup.object({
    mentorName: yup.string().required().min(2, "Min 2 Characters Required"),
    mentorEmail: yup.string().required().min(5, "Min 2 Characters Required"),
    mentorPhone: yup.number().required().min(10, "Only 10 Digits for Mobile No"),
})