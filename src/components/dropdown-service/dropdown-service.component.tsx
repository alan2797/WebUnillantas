import { Form, Dropdown, Button, Modal, Input, Tag, type MenuProps, Row, Col } from "antd";
import { Controller } from "react-hook-form";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { DownOutlined, CloseOutlined, PlusCircleOutlined, CloseCircleOutlined, PlusSquareOutlined, CheckCircleOutlined } from "@ant-design/icons";

interface OptionData {
  fifoName?: string;
  calendarName?: string;
}

interface DropdownCustomProps<TFormValues extends Record<string, any>> 
  extends FormFieldProps<TFormValues> {}

export interface DropdownServiceCustomRef {
  resetOptionsData: () => void;
  getOptionsData: () => Record<string, OptionData>;
  setOptionsDataForm: (data: Record<string, OptionData>) => void;
}

const DropdownServiceCustom = forwardRef(<TFormValues extends Record<string, any>>({
  fieldConfig,
  control,
  error,
}: DropdownCustomProps<TFormValues>, ref: React.Ref<DropdownServiceCustomRef>) => {
  const {
    key,
    label,
    placeholder,
    options = [],
    disabled = false,
    onOptionDataChange
  } = fieldConfig;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentOption, setCurrentOption] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'fifo' | 'calendar' | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [optionsData, setOptionsData] = useState<Record<string, OptionData>>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Agrega este estado al componente
  const [expandedOptions, setExpandedOptions] = useState<Record<string, boolean>>({});

  // Función para toggle del estado expandido
  const toggleExpanded = (optionValue: string) => {
    setExpandedOptions(prev => ({
      ...prev,
      [optionValue]: !prev[optionValue]
    }));
  };

  useEffect(() => {
    if(control._formValues.personalServices){
      setOptionsData(control._formValues.personalServices);
    }
  }, [])
  useImperativeHandle(ref, () => ({
    resetOptionsData: () => {
      setOptionsData({});
    },
    getOptionsData: () => {
      return optionsData;
    },
    setOptionsDataForm: (data: Record<string, OptionData>) => {
      setOptionsData(data);
    }
  }));

  let displayError = error;
  if (error && typeof error === "string") {
    displayError = error.includes("Invalid input")
      ? "El campo es requerido"
      : error;
  }

  const handleOpenModal = (optionValue: string, type: 'fifo' | 'calendar', e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setCurrentOption(optionValue);
    setModalType(type);
    setInputValue(optionsData[optionValue]?.[`${type}Name`] || '');
    setModalVisible(true);
    setDropdownOpen(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentOption(null);
    setModalType(null);
    setInputValue('');
  };

  const handleDropdownOpenChange = (open: boolean) => {
    setDropdownOpen(open);
  };

  const handleSaveName = () => {
    if (currentOption && modalType) {
      const newOptionsData = {
        ...optionsData,
        [currentOption]: {
          ...optionsData[currentOption],
          [`${modalType}Name`]: inputValue,
        },
      };
      
      setOptionsData(newOptionsData);
      
      if (onOptionDataChange) {
        onOptionDataChange(currentOption, newOptionsData[currentOption]);
      }
      
      handleCloseModal();
    }
  };

  const handleRemoveSavedName = (optionValue: string, type: 'fifo' | 'calendar', e: React.MouseEvent) => {
    e.stopPropagation();
    
    const newOptionsData = {
      ...optionsData,
      [optionValue]: {
        ...optionsData[optionValue],
        [`${type}Name`]: undefined,
      },
    };
    
    // Si ambos nombres están undefined, eliminar completamente la entrada
    if (!newOptionsData[optionValue].fifoName && !newOptionsData[optionValue].calendarName) {
      delete newOptionsData[optionValue];
    }
    
    setOptionsData(newOptionsData);
    
    // Llamar al callback si existe
    if (onOptionDataChange) {
      onOptionDataChange(optionValue, newOptionsData[optionValue] || {});
    }
  };

  const handleRemoveTag = (valueToRemove: string, e: React.MouseEvent, field: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    const currentValues = Array.isArray(field.value) ? field.value : [];
    const newValues = currentValues.filter((val: string) => val !== valueToRemove);
    field.onChange(newValues);
  };

  // Crear los items del dropdown
  const getDropdownItems = (): MenuProps['items'] => {
    return options.map((option) => {
      const optionData = optionsData[option.value as string] || {};
      return {
  key: String(option.value),
  label: (
    <div 
      className="flex flex-col gap-2 p-2 min-w-[250px]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Label principal de la opción con ícono de desplegar */}
      <Row onClick={(e) => {
            e.stopPropagation();
            toggleExpanded(option.value as string);
          }}>
        <Col flex={"auto"} className="mb-1">
          <span className="fw-medium text-primary-antd">{option.label}</span>
        </Col>
        <Col>
           <Button
          type="text"
          size="small"
          icon={<PlusCircleOutlined className="text-primary-antd"/>}
          
          style={{ width: '24px', height: '24px' }}
        />
        </Col>
      </Row>
      
      {/* Contenido que se mostrará/ocultará */}
      {expandedOptions[option.value as string] && (
        <Row>
          <Col span={12} className="text-xs text-gray-500 p-1">
            {optionData.fifoName ? (
              <div className="flex items-center justify-between">
                <div 
                  className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200 cursor-default flex-1 mr-1 text-center"
                >
                  {optionData.fifoName}  
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<CloseCircleOutlined />}
                    onClick={(e) => handleRemoveSavedName(option.value as string, 'fifo', e)}
                    style={{ width: '24px', height: '24px', marginLeft: '8px' }}
                  />
                </div>
              </div>
            ) : (
              <Button
                type="primary"
                size="middle"
                className="w-full text-xs"
                style={{width: "100%"}}
                onClick={(e) => handleOpenModal(option.value as string, 'fifo', e)}
              >
                FIFO <PlusCircleOutlined />
              </Button>
            )}
          </Col>
          <Col span={12} className="text-xs text-gray-500 p-1">
            {optionData.calendarName ? (
              <div className="flex items-center justify-between">
                <div 
                  className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200 cursor-default flex-1 mr-1 text-center"
                >
                  {optionData.calendarName}
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<CloseCircleOutlined />}
                    onClick={(e) => handleRemoveSavedName(option.value as string, 'calendar', e)}
                    style={{ width: '24px', height: '24px', marginLeft: '8px' }}
                  />
                </div>
              </div>
            ) : (
              <Button
                type="primary"
                size="middle"
                style={{width: "100%"}}
                className="w-full text-xs"
                onClick={(e) => handleOpenModal(option.value as string, 'calendar', e)}
              >
                Calendar <PlusCircleOutlined />
              </Button>
            )}
          </Col>
        </Row>
      )}
    </div>
  ),
};
    });
  };

  // Obtener los labels de los valores seleccionados
  const getSelectedLabels = (values: any[]): string[] => {
    if (!Array.isArray(values)) return [];
    
    return values.map(value => {
      const selectedOption = options.find(opt => String(opt.value) === String(value));
      return selectedOption?.label || String(value);
    });
  };

  // Renderizar el contenido del botón del dropdown
  const renderDropdownButton = (field: any) => {
    const selectedValues = Array.isArray(field.value) ? field.value : [];
    const selectedLabels = getSelectedLabels(selectedValues);
    return (
      <Row>
        <Col span={24} className="mb-1">
          <Button 
            size="large" 
            style={{ width: "100%", textAlign: "left", height: "auto", minHeight: "40px" }}
            onBlur={field.onBlur}
          >
            <Row justify="space-between" align="middle" style={{ width: "100%" }}>
              <Col flex="auto" className="pr-2">
                <div className="flex flex-wrap gap-1">
                  {selectedLabels.length > 0 ? (
                    selectedLabels.map((label, index) => (
                      <Tag
                        key={index}
                        closable
                        onClose={(e) => handleRemoveTag(selectedValues[index], e, field)}
                        closeIcon={<CloseOutlined style={{ fontSize: '10px' }} />}
                        style={{ fontSize: '12px', margin: '2px' }}
                      >
                        {label}
                      </Tag>
                    ))
                  ) : (
                    <span className="text-gray-400">{placeholder}</span>
                  )}
                </div>
              </Col>
              <Col flex="none">
                <DownOutlined style={{ fontSize: '12px' }} />
              </Col>
            </Row>
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Form.Item
        validateStatus={error ? "error" : undefined}
        help={displayError}
        style={{ marginBottom: 16 }}
        label={label}
        layout="vertical"
      >
        <Controller
          name={key as any}
          control={control}
          render={({ field }) => (
            <Dropdown
              menu={{ 
                items: getDropdownItems()
              }}
              disabled={disabled}
              trigger={['click']}
              open={dropdownOpen}
              onOpenChange={handleDropdownOpenChange}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                </div>
              )}
            >
              {renderDropdownButton(field)}
            </Dropdown>
          )}
        />
      </Form.Item>

      <Modal
        open={modalVisible}
        onOk={handleSaveName}
        onCancel={handleCloseModal}
        okText="Guardar"
        centered
        cancelText="Cancelar"
        destroyOnClose
        footer={
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <Button size="large" type="primary" onClick={handleSaveName}>
              Guardar <CheckCircleOutlined />
            </Button>
          </div>
        }
        styles={{
        content: {
          position: "relative",
          border: "3px solid #1890ff",
          borderRadius: 30,
          padding: "32px 40px",
          background: "#fff",
        },
      }}
      >
        <>
        <div style={{ textAlign: "center", marginTop: 0 }}>
          <div
            style={{
              width: 60,
              height: 60,
              margin: "8px auto 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius:  "50%",
              backgroundColor: "#E6F4FF",
            }}
          >
          <PlusSquareOutlined style={{ fontSize: 23, color: "#1890ff" }} />
        </div>
        </div>
          
        <label className="mt-3">Insertar Nombre</label>
        <Input
          placeholder={`Ingrese el nombre para ${modalType}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSaveName}
          autoFocus
          size="large"
          className="mb-3"
        />
        </>
      </Modal>
    </>
  );
});

export default DropdownServiceCustom;