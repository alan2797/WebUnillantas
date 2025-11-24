import type { ButtonProps, ModalProps, StepProps, SwitchProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { CSSProperties, ReactNode } from "react";
import type { Control } from "react-hook-form";

export type Validation =
  | { type: "required"; message?: string }
  | { type: "min"; value: number; message?: string }
  | { type: "max"; value: number; message?: string }
  | { type: "email"; message?: string }
  | { type: "matches"; regex: RegExp; message?: string }
  | { type: "passwordSpecialChar"; message?: string }
  | { type: "passwordNumber"; message?: string }
  | { type: "passwordUpper"; message?: string }
  | { type: "passwordLower"; message?: string }
  | { type: "matchField"; field: string; message?: string };

// export interface FieldConfig<T extends Record<string, unknown> = Record<string, unknown>> {
export interface FieldConfig<T extends Record<string, unknown> = Record<string, unknown>> {
  key: keyof T;
  label?: string;
  type?:
    | "text"
    | "password"
    | "switch"
    | "select"
    | "number"
    | "readOnly"
    | "date"
    | "radio"
    | "divider"
    | "mask"
    | "title"
    | "textArea"
    | "counter"
    | "checkbox"
    | "dropdownService"
    | "dualInput"
    | "timer"
    | "multiSwitch"
    | "ckEditor";
  typeValue?: "string" | "number" | "boolean" | "date" | "array" | "object";
  placeholder?: string;
  valueInitial?: T[keyof T];
  xl?: string | number;
  lg?: string | number;
  md?: string | number;
  sm?: string | number;
  xs?: string | number;
  disabled?: boolean;
  showAllErrors?: boolean;
  validations?: Validation[];
  options?: Options[];
  showSearch?: boolean;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5; // para el tamaño del campo readOnly
  format?: string; // para pasarle el formato de la fecha m/d/y, d/m/y

  addonBefore?: string; // agrega un simbolo al input number +,-,$
  min?: number;
  max?: number;
  mask?: any;
  maskChar?: string;
  alwaysShowMask?: boolean;

  fontSize?: string;
  color?: string;
  display?: string;
  textAlign?: CSSProperties["textAlign"];
  padding?: string;
  margin?: string;
  fontWeight?: string;
  typeText?: "secondary" | "success" | "warning" | "danger";
  textTransform?: "lowercase" | "uppercase";
  style?: CSSProperties;
  children?: ReactNode;
  autoSize?: boolean | { minRows?: number; maxRows?: number };

  helpText?: string;
  helpTextClickable?: boolean;
  onHelpTextClick?: () => void;

  singleSelect?: boolean; // para checkbox, si es selección única (como radio) o múltiple
  mode?: "tags" | "multiple" | null; // para select, modo de selección

  onOptionDataChange?: (optionValue: string, data: OptionData) => void;

  minHeight?: number;
  visible?: boolean;
  use12Hour?: boolean;

  widthDualInput?: number | string;
  sufixLeft?: string;
  sufixRight?: string;
  required?: boolean;

  gridColumns?:number;
  editableOptions?: (string | number | boolean)[];
  //campo para mostrar input debajo de la lista de switch
  extraInputKey?:string;
  showExtraInput?: boolean;
  extraInputLabel?:string;
  showCount?:boolean;
  maxLenght?:number;
  classTitle?:string; // para agregar clases a los title
  offset?:number; // para dar espaciado a los config(xs:22, offset:2)
  prefix?: React.ReactNode; // para colocar iconos a los input text al inicio
  suffix?: React.ReactNode; // para colocar iconos a los input text al final

}

export interface OptionData {
  fifoName?: string;
  calendarName?: string;
}

export interface FormFieldProps<T extends Record<string, unknown> = Record<string, unknown>> {
  fieldConfig: FieldConfig<T>;
  control: Control<T>;
  error?: string | any;
}
export interface ApiResponse<T = any> {
  timestamp: string; // Fecha y hora de la respuesta
  path: string; // Endpoint que se llamó
  status: number; // Código HTTP
  success: boolean; // Éxito de la operación
  message: string; // Mensaje descriptivo
  data: T; // Contenido de la respuesta, genérico
  error: string | null | object; // Mensaje de error, si existe
}

export interface HandleOptions {
  showSpinner?: boolean;
  successMessage?: string;
  errorMessage?: string;
  showMessageApi?: boolean;
}

export interface ButtonCustomProps extends ButtonProps {
  to?: string; // ruta a la que navegará
  text?: string | ReactNode; // texto del botón
}

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => ReactNode;
  width?: number | string;
}

export interface FilterColumn {
  key: string;
  content: ReactNode;
  span?: number;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pageSizeOptions?: string[];
}

export interface TableProps {
  data: any[];
  columns: Column[];
  filters?: FilterColumn[];
  pagination?: Pagination;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  loading?: boolean;
  scroll?: { x?: number | string; y?: number | string };
}

export interface Options {
  value: string | number | boolean;
  label?: string;
}

export interface SelectMenuConfigProps {
  placeholder?: string;
  options?: Options[];
  icon?: ReactNode;
  color?: string;
  size?: "small" | "middle" | "large";
  showSearch?: boolean;
  value?: string | number;
  onChange?: (value: string | number) => void;
  defaultValue?: string | number;
}

export interface TableCustomProps<T> {
  columns: ColumnsType<T>; // Columnas de la tabla
  dataSource?: T[]; // Datos
  rowKey: string; // Clave única
  pageSize?: number; // Paginación
  searchable?: boolean; // Barra de búsqueda global
  selectable?: boolean; // Si se pueden seleccionar filas
  onView?: (record: T) => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  extraActions?: (record: T) => React.ReactNode; // acciones adicionales
  newButtonLabel?: React.ReactNode; // <-- puede ser string o nodo
  showNewButton?: boolean; // Flag para mostrar/ocultar
  onNewButtonClick?: () => void; // Función al hacer click
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  showPageSize?: boolean;
  showPagination?: boolean;
  editableColumns?: string[];
  onSaveEdit?: (record: T, field: string, value: any) => void; // Callback para guardar
  scrollY?: number | string; // nueva prop opcional
  permissionsNew?: string[];
}

export interface BreadcrumbItem {
  label: string;
  path?: string; // opcional si quieres que sea clickeable
}
export interface PageContainerProps {
  title: string;
  icon?: ReactNode; // puede ser un ícono React
  children: ReactNode; // contenido de la página
  breadcrumb?: BreadcrumbItem[]; // lista de breadcrumb
  iconOnTop?: boolean; // NEW
  tabs?: {
    items: TabItem[]; // lista de pestañas
    defaultActiveKey?: string; // pestaña activa por defecto
    onChange?: (key: string) => void; // callback al cambiar pestaña
  };
}

export interface TabItem {
  key: string; // identificador único de la pestaña
  label: string; // texto que se muestra en la pestaña
  children?: ReactNode; // contenido dentro de la pestaña
  icon?: ReactNode; // ícono opcional
}
export interface StepCustomProps {
  current: number;
  steps: (StepProps & { icon2?: ReactNode })[];
  onChange?: (current: number) => void;
}

export interface SwitchCustomProps extends SwitchProps {
  // Puedes agregar props personalizadas si quieres
  label?: string; // ejemplo: etiqueta opcional junto al switch
}

export interface ConfirmModalProps extends ModalProps {
  visible: boolean; // controla si se muestra
  title?: string; // título del modal
  content?: string | React.ReactNode; // mensaje
  onConfirm?: () => void; // callback al confirmar
  onCancel?: () => void; // callback al cancelar
  okText?: string; // texto botón confirmar
  cancelText?: string; // texto botón cancelar
}

export interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  /** Funciones predefinidas si no se pasan botones personalizados */
  onSave?: () => void;
  onPreview?: () => void;
  onClear?: () => void;

  /** Ícono o imagen opcional */
  icon?: ReactNode;
  imageSrc?: string;

  /** Contenido dinámico (formulario, texto, etc.) */
  children?: ReactNode;

  /** Permite mostrar o no los botones del footer */
  showFooter?: boolean;

  /** Botones personalizados del footer */
  footerButtons?: ButtonCustomProps[];

  /** Título personalizable */
  title?: string;
  width?: number;

  maxHeight?: string;
}

export interface CustomListItem {
  id: string | number;
  title: string;
  description: string;
  date?: string;
}

export interface CustomListProps {
  data: CustomListItem[];
  onView?: (item: CustomListItem) => void;
  showButton?: boolean;
  topButton?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export interface NursingNote {
  key: string;
  date: string;
  content: string;
}

export interface NursingNotesTableProps {
  data: NursingNote[];
  onViewNote?: (record: NursingNote) => void;
}

export interface CustomCKEditorProps {
  value?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
  minHeight?: string | number;
}

export interface PaginationDto {
  limit?: number;
  offset?: number;
  page?: string | number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
}
