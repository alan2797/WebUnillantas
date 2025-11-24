
import { Form } from "antd";
import type { CustomCKEditorProps, FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, Context, ContextWatchdog } from "ckeditor5";
import { ckEditorConfigs } from "./configs/ck-editor.config";
import "ckeditor5/ckeditor5.css";

// Versión directa (como la tenías originalmente)
export const CustomCKEditorDirect: React.FC<CustomCKEditorProps> = ({
  value = "",
  onChange,
  placeholder,
  minHeight = 200
}) => {
  return (
    <CKEditorContext context={Context} contextWatchdog={ContextWatchdog}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          ...ckEditorConfigs,
          placeholder,
        }}
        onReady={(editor) => {
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange?.(data);
        }}
      />
      <style>{`
        .ck-editor__editable_inline {
          min-height: ${typeof minHeight === "number" ? `${minHeight}px` : minHeight};
        }
      `}</style>
    </CKEditorContext>
  );
};

const CustomCKEditor = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const { 
    key, 
    label, 
    placeholder,
    minHeight = 200 
  } = fieldConfig;

  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : ""}
      help={error}
      style={{ marginBottom: 16 }}
      layout="vertical"
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => (
          <CustomCKEditorDirect
            value={field.value as string}
            onChange={field.onChange}
            placeholder={placeholder}
            minHeight={minHeight}
          />
        )}
      />
    </Form.Item>
  );
};

export default CustomCKEditor;