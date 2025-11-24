import { z, ZodObject, type ZodTypeAny } from "zod";
import type { FieldConfig } from "../interfaces/components.interface";

export const generateZodSchema = <T extends Record<string, any>>(fields: FieldConfig<T>[]) => {
  const shape: Record<string, ZodTypeAny> = {};
  const matchFieldValidations: {
    key: string;
    field: string;
    message?: string;
  }[] = [];

  fields.forEach((field) => {
    let schema: ZodTypeAny;
    if (field.type == "divider" || field.type == "title") return;
    switch (field.typeValue) {
      case "string":
        schema = z.string();
        break;
      case "number":
        // Acepta number, null, undefined y string vacío, pero transforma a number o null
        schema = z
          .union([z.number(), z.null(), z.undefined(), z.literal("")])
          .refine(
            (val) => {
              // Si es vacío, null o undefined, es válido
              if (val === null || val === undefined || val === "") return true;
              // Si es número, es válido
              if (typeof val === "number") return true;
              // Si es string numérico, es válido
              if (typeof val === "string" && !isNaN(Number(val))) return true;
              return false;
            },
            {
              message: "Debe ser un número válido",
            }
          )
          .transform((val) => {
            // Transformar a number o null
            if (val === null || val === undefined || val === "") return null;
            if (typeof val === "number") return val;
            if (typeof val === "string") return Number(val);
            return null;
          });
        break;
      case "boolean":
        schema = z.boolean();
        break;
      case "array":
        schema = z.array(z.any());
        break;
      case "object":
        schema = z.object({}).passthrough(); // {} pero permite otras props
        break;
      case "date":
        // Schema base que acepta diferentes formatos de fecha (incluyendo Dayjs)
        // Pero permite valores vacíos/undefined
        schema = z
          .union([
            z.undefined(),
            z.null(),
            z.string(),
            z.date(),
            z.any().refine(
              (val) => {
                // Verificar si es un objeto Dayjs válido
                if (val && typeof val === "object") {
                  const dayjsObj = val as any;
                  if (typeof dayjsObj.isValid === "function") {
                    return dayjsObj.isValid();
                  }
                }
                return false;
              },
              {
                message: "Fecha no válida",
              }
            ),
          ])
          .refine(
            (val) => {
              // Validación de formato: si existe un valor, debe ser una fecha válida
              if (val === null || val === undefined || val === "") {
                return true; // Valores vacíos son válidos para el formato
              }

              if (typeof val === "string") {
                return !isNaN(new Date(val).getTime());
              }

              if (val instanceof Date) {
                return !isNaN(val.getTime());
              }

              if (val && typeof val === "object") {
                const dayjsObj = val as any;
                if (typeof dayjsObj.isValid === "function") {
                  return dayjsObj.isValid();
                }
              }

              return false;
            },
            {
              message: "Formato de fecha no válido",
            }
          );
        break;
      default:
        schema = z.string({
          error: "Este campo es requerido",
        }); // Por defecto string
    }
    field.validations?.forEach((val) => {
      switch (val.type) {
        case "required":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).nonempty(val.message || "El campo es requerido");
          } else if (field.typeValue === "number") {
            //schema = (schema as z.ZodNumber).min(0.0001, val.message || "El campo es requerido");
            schema = schema.refine((val) => val !== null && val !== undefined && val !== "", val.message || "Este campo es obligatorio");
          } else if (field.typeValue === "boolean") {
            // Para boolean, required significa que debe ser true
            schema = (schema as z.ZodBoolean).refine((value) => value === true || value === false, val.message || "Este campo debe ser aceptado");
          } else if (field.typeValue === "date") {
            schema = schema.refine((value) => {
              if (value === null || value === undefined || value === "") return false;

              // Verificación segura para Dayjs
              if (value && typeof value === "object") {
                const dayjsObj = value as any;
                if (typeof dayjsObj.isValid === "function") {
                  return dayjsObj.isValid();
                }
              }

              // Para otros tipos (string, Date), ya fueron validados en el refine principal
              return true;
            }, val.message || "La fecha es obligatoria");
          } else if (field.typeValue === "object") {
            schema = schema.refine((val) => {
              // Verificar que no sea null/undefined
              if (val === null || val === undefined) return false;
              // Verificar que sea un objeto
              if (typeof val !== "object") return false;
              // Verificar que tenga al menos una propiedad
              return Object.keys(val).length > 0;
            }, val.message || "Este campo es obligatorio");
          }

          break;
        case "min":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).min(val.value, val.message || `El campo requiere mínimo ${val.value} caracteres`);
          } else if (field.typeValue === "number") {
            schema = (schema as z.ZodNumber).min(val.value, val.message || `El valor debe ser mayor o igual a ${val.value}`);
          }
          break;
        case "max":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).max(val.value, val.message || `El campo requiere máximo ${val.value} caracteres`);
          } else if (field.typeValue === "number") {
            schema = (schema as z.ZodNumber).max(val.value, val.message || `El valor debe ser menor o igual a ${val.value}`);
          }
          break;
        case "email":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).email(val.message || "Formato de correo inválido");
          }
          break;
        case "matches":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).regex(val.regex, val.message);
          }
          break;
        case "passwordSpecialChar":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).regex(/[!@#$%^&*(),.?":{}|<>]/, val.message || "Debe contener al menos un carácter especial");
          }
          break;
        case "passwordNumber":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).regex(/\d/, val.message || "Debe contener al menos un número");
          }
          break;
        case "passwordUpper":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).regex(/[A-Z]/, val.message || "Debe contener al menos una letra mayúscula");
          }
          break;
        case "passwordLower":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).regex(/[a-z]/, val.message || "Debe contener al menos una letra minúscula");
          }
          break;
        case "matchField":
          matchFieldValidations.push({
            key: field.key as string,
            field: val.field as string,
            message: val.message,
          });
          break;
      }
    });

    shape[field.key as string] = schema;
  });
  // Creamos el schema base
  let schema = z.object(shape) as ZodObject<Record<keyof T, ZodTypeAny>>;

  // Aplicamos los refinamientos de "matchField"
  matchFieldValidations.forEach((mf) => {
    schema = schema.refine((data: any) => data[mf.key] === data[mf.field], {
      message: mf.message || `El campo ${mf.key} debe coincidir con ${mf.field}`,
      path: [mf.key],
    });
  });

  return schema;
};

export const buildDefaultValues = <T extends Record<string, any>>(fields: FieldConfig<T>[]): T =>
  fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.key]: field.valueInitial ?? getDefaultValueByType(field.typeValue),
    }),
    {} as T
  );

// Función auxiliar para obtener valores por defecto según el tipo
const getDefaultValueByType = (typeValue?: string): any => {
  switch (typeValue) {
    case "number":
      return null;
    case "boolean":
      return false;
    case "array":
      return [];
    case "string":
      return "";
    default:
      return "";
  }
};
