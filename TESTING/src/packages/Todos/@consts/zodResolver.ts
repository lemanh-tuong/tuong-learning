import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";

export const formCreateResolver = zodResolver(
  object({
    title: string().trim().nonempty(),
    description: string().trim().nonempty(),
  })
);

export const formUpdateResolver = zodResolver(
  object({
    title: string().trim().nonempty(),
    description: string().trim().nonempty(),
    id: string().trim().nonempty(),
  })
);
