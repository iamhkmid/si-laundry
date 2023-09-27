import { z } from "zod";

export const validationSchema = z.object({
  name: z.string().nonempty("Required field"),
  phone: z.string().nonempty("Required field"),
  service: z.string().nonempty("Required field"),
  package: z.string().nonempty("Required field"),
});
