import { z } from "zod";

const LeadStatusSchema = z.enum([
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Archived",
])

export const GetLeadsRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  status: LeadStatusSchema.optional(),
  sortBy: z.enum(["name", "status", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional()
})

export const CreateLeadRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  status: LeadStatusSchema.optional()
})
//ele define os atributos que a requisiçao do obj lead precisa ter para ser valida
export const UpdateLeadRequestSchema =  z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  status:LeadStatusSchema.optional()
})


