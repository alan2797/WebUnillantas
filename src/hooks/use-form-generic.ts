
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldConfig } from "../interfaces/components.interface";
import { buildDefaultValues, generateZodSchema } from "../validators/validations";

export const useFormGeneric = (config: FieldConfig<Record<string, unknown>>[]) => {
  const schema = generateZodSchema<Record<string, unknown>>(config);

  const form = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaultValues(config),
    mode: "onChange"
  });

  return { ...form, schema };
};
