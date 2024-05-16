import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "title is required",
  }),
  slug: z.string({
    required_error: "slug route is required",
  }),
  categorie: z.string({
    required_error: "categorie is required",
  }),
  title_h1: z.string({
    required_error: "title h1 is required",
  }),
  description_p_1: z.string({
    required_error: "description_p_1 is required",
  }),
  description_p_2: z.string({
    required_error: "description_p_2 is required",
  }),
  description_p_3: z.string({
    required_error: "description_p_3 is required",
  }),
  url_web: z.string({
    required_error: "url_web is required",
  }),
  description: z.string({
    required_error: "description must be a string",
  }),
  image: z.string().refine((value) => {
    if (value instanceof File || value instanceof Blob) {
      return true;
    }
    throw new Error('image must be a file');
  }, {
    required_error: "image is required",
  }).optional(),
  date: z.string().datetime().optional(),
});
