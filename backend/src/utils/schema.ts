import { z } from "zod";
import { RestaurantStatus } from "../types";

export const RestaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  status: z.enum(Object.values(RestaurantStatus) as [RestaurantStatus, ...RestaurantStatus[]]),
});