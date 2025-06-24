import { z } from "zod";

export const noteSchema = z.object({
  id: z.string().optional(),
  noteText: z.string().min(1, "Not bilgisi zorunludur"),
 priority: z.string()
  .regex(/^[0-5]$/, "0-5 arasında bir sayı olmalı")
  .optional(),
  image: z
    .any()
    .optional()
});
