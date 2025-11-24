import { Modal } from "antd";
import type { ModalFuncProps, ButtonProps } from "antd";

interface ConfirmOptions extends ModalFuncProps {
  content?: React.ReactNode;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

export const useConfirm = () => {
  const confirm = (props: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      Modal.confirm({
        title: props.title ?? "Confirmar",
        content: props.content ?? "¿Estás seguro?",
        okText: props.okText ?? "Aceptar",
        cancelText: props.cancelText ?? "Cancelar",
        okButtonProps: props.okButtonProps,
        cancelButtonProps: props.cancelButtonProps,
        centered: true,
        maskClosable: false,
        ...props,
        onOk: () => {
          resolve(true);
          props.onOk?.();
        },
        onCancel: () => {
          resolve(false);
          props.onCancel?.();
        },
      });
    });
  };

  return confirm;
};
