import {z} from "zod";

export const companySchema = z.object({
    name:z.string().min(2,"Company name must be at least 2 characters"),
    location:z.string().min(1,"Location must be defined"),
    about:z.string().min(10,"Please provide some information about your company"),
    logo:z.string().min(1, "Please upload a logo"),
    website:z.string().url("please enter a valid url"),
    xAccount:z.string().optional(),
})


export const JobseekerSchema = z.object({
    name:z.string().min(2, "Name must be at least 2 characters"),
    about:z.string().min(10,"Please provide some information about yourself"),
    resume:z.string().min(1,"Please upload your resume"),

})


export const jobPostSchema = z.object({
  jobTitle:z.string().min(2,"Job title must be at least 2 characters long"),
  employmentType:z.string().min(1,"Please select an employment type"),
  location:z.string().min(1,"Please select location"),
  salaryFrom:z.number().min(1,"Salary from is required"),
  salaryTo:z.number().min(1, "Salary To is required"),
  jobDescription:z.string().min(1, "Job description is required"),
  listingDuration:z.number().min(1,"Listing duration is required"),
  benefits:z.string().min(1,"Please select at least one benefit"),
  companyName:z.string().min(1," Company Name is required"),
  companyLocation:z.string().min(1,"Company Location is required"),
  companyAbout:z.string().min(10,"Company description is required"),
  companyLogo:z.string().min(1,"Company Logo is required"),
  companyWebsite:z.string().min(1, "Company website is required"),
  companyXAccount:z.string().optional(),
  
})