import type { FieldConfig } from "../interfaces/components.interface";

/**
 * Habilita o deshabilita un campo específico en la configuración del formulario
 * @param config - Configuración actual del formulario
 * @param fieldKey - Key del campo a modificar
 * @param disabled - true para deshabilitar, false para habilitar
 * @returns Nueva configuración con el campo modificado
 */
export const toggleFieldDisabled = <T extends Record<string, unknown>>(
  config: FieldConfig<T>[],
  fieldKey: keyof T,
  disabled: boolean
): FieldConfig<T>[] => {
  return config.map((field) => (field.key === fieldKey ? { ...field, disabled } : field)) as FieldConfig<T>[];
};

/**
 * Habilita o deshabilita las validaciones de un campo específico
 * @param config - Configuración actual del formulario
 * @param fieldKey - Key del campo a modificar
 * @param disabled - true para quitar validaciones, false para restaurar validaciones originales
 * @param originalValidations - Validaciones originales (opcional, para restaurar)
 * @returns Nueva configuración con las validaciones modificadas
 */
export const toggleFieldValidations = <T extends Record<string, unknown>>(
  config: FieldConfig<T>[],
  fieldKey: keyof T,
  disabled: boolean
): FieldConfig<T>[] => {
  return config.map((field) => {
    if (field.key === fieldKey) {
      return {
        ...field,
        validations: disabled ? [] : field.validations || [],
      };
    }
    return field;
  }) as FieldConfig<T>[];
};

/**
 * Habilita o deshabilita múltiples campos a la vez
 * @param config - Configuración actual del formulario
 * @param fieldKeys - Array de keys de campos a modificar
 * @param disabled - true para deshabilitar, false para habilitar
 * @returns Nueva configuración con los campos modificados
 */
export const toggleMultipleFieldsDisabled = <T extends Record<string, unknown>>(
  config: FieldConfig<T>[],
  fieldKeys: (keyof T)[],
  disabled: boolean
): FieldConfig<T>[] => {
  return config.map((field) => (fieldKeys.includes(field.key) ? { ...field, disabled } : field)) as FieldConfig<T>[];
};

/**
 * Habilita o deshabilita validaciones de múltiples campos a la vez
 * @param config - Configuración actual del formulario
 * @param fieldKeys - Array de keys de campos a modificar
 * @param disabled - true para quitar validaciones, false para restaurar validaciones
 * @param originalValidationsMap - Mapa de validaciones originales (opcional)
 * @returns Nueva configuración con las validaciones modificadas
 */
export const toggleMultipleFieldsValidations = <T extends Record<string, unknown>>(
  config: FieldConfig<T>[],
  fieldKeys: (keyof T)[],
  disabled: boolean
): FieldConfig<T>[] => {
  return config.map((field) => {
    if (fieldKeys.includes(field.key)) {
      const originalValidations = field.validations;
      field.visible = disabled ? false : true;
      return {
        ...field,
        validations: disabled ? [] : originalValidations || field.validations || [],
      };
    }
    return field;
  }) as FieldConfig<T>[];
};

/**
 * Actualiza las opciones de un campo select
 * @param config - Configuración actual del formulario
 * @param fieldKey - Key del campo select a modificar
 * @param options - Nuevas opciones para el select
 * @returns Nueva configuración con las opciones actualizadas
 */
export const updateFieldOptions = <T extends Record<string, unknown>>(
  config: FieldConfig<T>[],
  fieldKey: keyof T,
  options: any[]
): FieldConfig<T>[] => {
  return config.map((field) => (field.key === fieldKey ? { ...field, options } : field)) as FieldConfig<T>[];
};

/**
 * Modifica el valor inicial de un campo
 * @param config - Configuración actual del formulario
 * @param fieldKey - Key del campo a modificar
 * @param valueInitial - Nuevo valor inicial
 * @returns Nueva configuración con el valor inicial actualizado
 */
export const updateFieldInitialValue = <T extends Record<string, unknown>>(
  config: FieldConfig<T>[],
  fieldKey: keyof T,
  valueInitial: any
): FieldConfig<T>[] => {
  return config.map((field) => (field.key === fieldKey ? { ...field, valueInitial } : field)) as FieldConfig<T>[];
};

// utils/form-utils.ts
export interface FieldMapping {
  fieldKey: string;
  data: any[];
  labelKey?: string;
  valueKey?: string;
}

export const updateFormFieldsWithOptions = (
  prevFields: any[],
  fieldMappings: FieldMapping[]
): any[] => {
  return prevFields.map((field) => {
    const mapping = fieldMappings.find(mapping => mapping.fieldKey === field.key);
    
    if (mapping) {
      const { data, labelKey = 'name', valueKey = 'id' } = mapping;
      return {
        ...field,
        options: data?.map((item: any) => ({
          label: item[labelKey],
          value: item[valueKey]
        })) || []
      };
    }
    return field;
  });
};
