import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Checkbox, Col, Divider, Dropdown, Form, Input, notification, Row, Select, Space } from "antd";
import {
  DownOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../components/button/button.component";
import type { MarcasColoresData, OpcionesMotivosPedidos, OpcionesTipoDocumento, OpcionesTiposVehiculo, VehicleEntryCreate, VehiculoData } from "../../../interfaces/vehicle-entry.interface";
import type { ApiResponse, FieldConfig } from "../../../interfaces/components.interface";
import { configForm, configForm2 } from "./configs/vehicle-entry-create.config";
import {
  buildDefaultValues,
  generateZodSchema,
} from "../../../validators/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/form-field/form-field.component";
import CheckboxGroupCustom from "../../../components/checkbox/checkbox.component";
import CustomSelect from "../../../components/select/select.component";
import ModalForm from "../../../components/modals/modal-form.component";
import { IconCheckupList, IconSend, IconTimelineEvent, IconTransform } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { handleRequestAxios } from "../../../utils/handle-request-axios";
import { getInitialDataBrandColorService, searchVehicleService } from "../../../services/vehicle-entry";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { getBranchesService, getBrandsService, getColorsService, getDocumentTypesService, getEntryOptionsService, getModelsService, getVehicleTypesService } from "../../../services/catalogs";
import { toggleMultipleFieldsDisabled, updateFormFieldsWithOptions } from "../../../utils/form-config.util";
import { RoutePaths } from "../../../utils/constants";

const VehicleEntryCreate: React.FC = () => {
  const [valueFilterBrand, setValueFilterBrand] = useState("");
  const [valueFilterColor, setValueFilterColor] = useState("");
  const [openDropDownFilterBrand, setOpenDropDownFilterBrand] = useState(false);
  const [openDropDownFilterColor, setOpenDropDownFilterColor] = useState(false);
  const [cancelReasons, setCancelReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState("");
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const [brandsOptions, setBrandsOptions] = useState([]);
  const [colorsOptions, setColorsOptions] = useState([]);
  const [modelsOptions, setModelsOptions] = useState([]);
  const [vehicleExist, setVehicleExist] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const menuFilterBrand = (
  <div
    style={{
      padding: 16,
      width: 250,
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    }}
  >
    <Input
      value={valueFilterBrand}
      style={{ width: "100%", marginBottom: 12 }}
      onChange={(e) => setValueFilterBrand(e.target.value)}
      placeholder="Buscar Marca"
    />

    <Button
      type="primary"
      style={{ width: "100%" }}
      onClick={(e) => {
        e.stopPropagation();
        console.log("Filtros aplicados:", valueFilterBrand);
        searchBrand(valueFilterBrand);
        setOpenDropDownFilterBrand(false);
      }}
    >
      Aplicar filtros
    </Button>
  </div>
  );
  const menuFilterColor = (
  <div
    style={{
      padding: 16,
      width: 250,
      background: "#fff", // <-- fondo blanco siempre
      borderRadius: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    }}
  >
    <Input
      value={valueFilterColor}
      style={{ width: "100%", marginBottom: 12 }}
      onChange={(e) => setValueFilterColor(e.target.value)}
      placeholder="Buscar Color"
    />

    <Button
      type="primary"
      style={{ width: "100%" }}
      onClick={(e) => {
        e.stopPropagation();
        console.log("Filtros aplicados:", valueFilterColor);
        searchColors(valueFilterColor);
        setOpenDropDownFilterColor(false);
      }}
    >
      Aplicar filtros
    </Button>
  </div>
  );
  
  const [configFormSchema, setConfigFormSchema] = useState<FieldConfig<VehicleEntryCreate>[]>(configForm());
  const [configForm2Schema, setConfigForm2Schema] = useState<FieldConfig<VehicleEntryCreate>[]>(configForm2());
    // ✅ useRef para mantener el callback actualizado
  const validateLicencePlateRef = useRef<((value: string) => Promise<void>) | null>(null);
  
  const combinedSchema = [...configFormSchema, ...configForm2Schema];
  
  dayjs.extend(isBetween);
  const navigate = useNavigate();

  const form = useForm<VehicleEntryCreate>({
    resolver: zodResolver(
      generateZodSchema<VehicleEntryCreate>(combinedSchema)
    ),
    defaultValues: buildDefaultValues(combinedSchema),
    mode: "onChange",
  });

  const handleBrandChange = useCallback(async (brandId: number | null) => {
    if (brandId) {
      await getModelsByBrand(brandId);
    }
  }, []);

  const watchBrand = form.watch("vehicleBrand");
  const watchDocumentType = form.watch("documentType");

  useEffect(() => {
    if (watchBrand) {
      handleBrandChange(Number(watchBrand));
    }
  }, [watchBrand, handleBrandChange]);

  useEffect(() => {
    if (watchDocumentType) {
      console.log("cambiando ejecutandop")

      const updatedConfig = configFormSchema.map(field => {
        if (field.key === "licencePlateNumber") {
          let mask = "";
          let maxLength = 10;
          let type = "mask";
          let validations: any[] = [
            {
              type: "required",
              message: "El Número ID del Vehiculo es requerido"
            }
          ];
          
          switch(watchDocumentType) {
            case 'PLACA':
              type = "mask";
              mask = "*-*****"; // a = letra/dígito, 9 = sólo dígito
              maxLength = 8;
              validations.push({
                type: "matches", 
                regex: /^[A-Z0-9-]{6,20}$/i,
                message: "Formato de placa inválido. Use: X-XXXXX (Ej: P-12344)"
              });
              break;
              
            case 'VIN':
              type = "mask";
              mask = "aaaaaaaaaaaaaaaaa"; // 17 posiciones
              maxLength = 17;
              validations.push({
                type: "matches", 
                regex: /^[A-HJ-NPR-Z0-9]{17}$/i, // Sin I, O, Q
                message: "El VIN debe tener exactamente 17 caracteres alfanuméricos (sin I, O, Q)"
              });
              break;
              
            case 'POLIZA':
              type = "mask";
              mask = "***-***-******"; // Máscara flexible
              maxLength = 15;
              validations.push(
                {
                  type: "minLength",
                  value: 6,
                  message: "La póliza debe tener al menos 6 caracteres"
                },
                {
                  type: "maxLength", 
                  value: 20,
                  message: "La póliza no puede tener más de 20 caracteres"
                },
                {
                  type: "matches",
                  regex: /^[A-Z0-9-]{6,20}$/i,
                  message: "Formato de póliza inválido. Solo letras, números y guiones"
                }
              );
              break;
              
            default:
              // Si no hay tipo seleccionado
              type = "text";
              mask = "";
              maxLength = 20;
              validations = []; // Limpiar validaciones hasta que seleccione tipo
          }
          
          return {
            ...field,
            mask: mask,
            max: maxLength, // O usa maxLength si es el nombre correcto de la propiedad
            type: type,
            placeholder: getPlaceholderByDocType(watchDocumentType ?? ""),
            validations: validations
          };
        }
      return field;
    });
    
    setConfigFormSchema(updatedConfig as any);
    form.setValue("documentNumber", "");
    form.trigger("documentNumber");
    }
  }, [watchDocumentType]);
  const getPlaceholderByDocType = (docType: string): string => {
    switch(docType) {
      case 'PLACA':
        return "PBA-1234";
      case 'VIN':
        return "12345678901234";
      case 'POLIZA':
        return "PLZ-2024-ABC123";
      default:
        return "Ingrese el número";
    }
  };

  const validateLicencePlate = useCallback(async (value: string) => {
    if (!value || !watchDocumentType) {
      return;
    }
    
    console.log("Validando con tipo de documento:", watchDocumentType, "y valor:", value);
    
      const result: ApiResponse<VehiculoData> | null = await handleRequestAxios(
        dispatch, 
        () => searchVehicleService(watchDocumentType, value), 
        { showSpinner: true, showMessageApi: true }
      );
      
      if (result?.success) {
        console.log("Resultado de búsqueda:", result.data);
        
        // Aquí puedes llenar los campos del formulario con los datos encontrados
        if (result.data) {
          // Ejemplo de cómo podrías llenar los campos
          if (result.data.vehiculo.marca.marca_id) {
            form.setValue("vehicleBrand", result.data.vehiculo.marca.marca_id);
            if (!brandsOptions.find((item: any) => item.value == result.data.vehiculo.marca.marca_id)) {
              searchBrand(result.data.vehiculo.marca.nombre);
            }
          }
          if (result.data.vehiculo.modelo.modelo_id) {
            form.setValue("vehicleModel", result.data.vehiculo.modelo.modelo_id);
          }
          if (result.data.vehiculo.color.color_id) {
            form.setValue("vehicleColor", result.data.vehiculo.color.color_id);
            if (!colorsOptions.find((item: any) => item.value == result.data.vehiculo.color.color_id)) {
              searchColors(result.data.vehiculo.color.nombre);
            }
          }
          if (result.data.vehiculo.anio) {
            form.setValue("vehicleYear", result.data.vehiculo.anio);
          }
          if (result.data.cliente) {
            form.setValue("currentVehicleOwner", result.data.cliente.nombre_completo);
          }
          if (result.data.vehiculo.tipo_vehiculo) {
            form.setValue("vehicleType", result.data.vehiculo.tipo_vehiculo.tipo_vehiculo_id);
          }
          // Deshabilitar campos del vehículo
          const vehiculoFields: string[] = [
            'vehicleBrand',    // marca
            'vehicleModel',    // modelo  
            'vehicleYear',     // año
            'vehiclePlate',    // placa
            'vehicleColor',    // color
            'vehicleType',     // tipo de vehículo
            'currentVehicleOwner',
            'documentType'
          ];

          // Actualizar el estado de configForm
          setConfigFormSchema(prevConfig => 
            toggleMultipleFieldsDisabled(prevConfig, vehiculoFields, true)
          );
          setVehicleExist(true);
      
        }else{
          setVehicleExist(false);
          const vehiculoFields: string[] = [
            'vehicleBrand',    // marca
            'vehicleModel',    // modelo  
            'vehicleYear',     // año
            'vehiclePlate',    // placa
            'vehicleColor',    // color
            'vehicleType',     // tipo de vehículo
            'currentVehicleOwner',
            'documentType'
          ];

          // Actualizar el estado de configForm
          setConfigFormSchema(prevConfig => 
            toggleMultipleFieldsDisabled(prevConfig, vehiculoFields, false)
          );
        }
      } 
    
  }, [watchDocumentType, dispatch, form]);

 // ✅ Actualizar la referencia cuando cambia la función
  useEffect(() => {
    validateLicencePlateRef.current = validateLicencePlate;
    console.log("🔄 Referencia de validación actualizada");
  }, [validateLicencePlate]);

  // ✅ Agregar el callback SOLO UNA VEZ al inicio
  useEffect(() => {
    console.log("🎬 Inicializando callback de onBlur");
    setConfigFormSchema((prevConfig) =>
      prevConfig.map((field) => {
        if (field.key === "licencePlateNumber") {
          return {
            ...field,
            onBlur: (value: string) => {
              console.log("🎯 onBlur wrapper ejecutado con valor:", value);
              validateLicencePlateRef.current?.(value);
            }
          };
        }
        return field;
      })
    );
  }, []); // ⚠️ Solo una vez al montar

  useEffect(() => {
    getInitialData();
    getReasonAndDelivery();
    getDocumentTypes();
    getVehicleTypes();
  }, [])

  const getInitialData = async () => {
    const result: ApiResponse<MarcasColoresData> | null = await handleRequestAxios(dispatch, () => getInitialDataBrandColorService(), {
      showSpinner: false
    })
    if(result?.success){
      console.log(result);
      const brands: any = result.data.marcas.map((item) => {
        return {
          value: item.id,
          label: item.nombre,
          image: item.logoUrl,
        }
      });
      console.log(brands);
      setBrandsOptions(brands);
      const colors: any = result.data.colores.map((item) => {
        return {
          value: item.id,
          label: item.nombre,
          color: item.colorHex,
        }
      });
      setColorsOptions(colors);
    }
  }

  const getReasonAndDelivery = async() => {
    const result: ApiResponse<OpcionesMotivosPedidos> | null = await handleRequestAxios(dispatch, () => getEntryOptionsService(), {
      showSpinner: false
    })
    if(result?.success){
      console.log(result.data);
      setConfigForm2Schema((prev: any) =>
        updateFormFieldsWithOptions(prev, [
          {
            fieldKey: "visitReason",
            data: result.data.motivosVisita ?? [],
            labelKey: "label",
            valueKey: "value",
          },
          {
            fieldKey: "orderType",
            data: result.data.tiposPedido ?? [],
            labelKey: "label",
            valueKey: "value",
          },
        ])
      );
    }
  }

  const getDocumentTypes = async () => {
    const result: ApiResponse<OpcionesTipoDocumento> | null = await handleRequestAxios(dispatch, () => getDocumentTypesService(), {
      showSpinner: false
    })
    if(result?.success){
      console.log(result.data.tiposBusqueda)
      setConfigFormSchema((prev: any) =>
        updateFormFieldsWithOptions(prev, [
          {
            fieldKey: "documentType",
            data: result.data.tiposBusqueda ?? [],
            labelKey: "label",
            valueKey: "value",
          },
        ])
      );
    }
  }

  const getVehicleTypes = async () => {
    const result: ApiResponse<OpcionesTiposVehiculo> | null = await handleRequestAxios(dispatch, () => getVehicleTypesService(), {
      showSpinner: false
    })
    if(result?.success){
      console.log(result.data.results)
      setConfigFormSchema((prev: any) =>
        updateFormFieldsWithOptions(prev, [
          {
            fieldKey: "vehicleType",
            data: result.data.results ?? [],
            labelKey: "nombre",
            valueKey: "tipo_vehiculo_id",
          },
        ])
      );
    }
  }

  const getModelsByBrand = async(brandId: number) => {
    const result: ApiResponse<any> | null = await handleRequestAxios(dispatch, () => getModelsService(brandId), {
      showSpinner: true
    })
    if(result?.success){
      console.log(result.data.results);
      const models = result.data.results.map((item: any) => ({
        value: item.modelo_id,
        label: item.nombre
      }))
      setModelsOptions(models)
    }
  }

  const searchBrand = async (search?: string) => {
    const result: ApiResponse<any> | null = await handleRequestAxios(dispatch, () => getBrandsService(search), {
      showSpinner: false
    });
    if(result?.success){
      console.log(result.data);
      const brands: any = result.data.results.slice(0, 5).map((item: any) => {
        return {
          value: item.marca_id,
          label: item.nombre,
          image: null,
        }
      });
      console.log(brands);
      setBrandsOptions(brands);
    }
  }

  const searchColors = async (search?: string) => {
    const result: ApiResponse<any> | null = await handleRequestAxios(dispatch, () => getColorsService(search), {
      showSpinner: false
    });
    if(result?.success){
      console.log(result.data);
      const colors: any = result.data.results.slice(0, 5).map((item: any) => {
        return {
          value: item.color_id,
          label: item.nombre,
        }
      });
      console.log(colors);
      setColorsOptions(colors);
    }
  }

  const onSubmit = (data: VehicleEntryCreate) => {
    console.log("Datos recibidos:", data);
    console.log("📋 Todos los valores del form:", form.getValues());
  };

  const cancelQuotation = () => {
    console.log("Motivos seleccionados:", cancelReasons);
    console.log("Otro motivo:", otherReason);
    setCancelReasons([]);
    setOtherReason("");
  };

  return (
    <div className="p-0 p-md-4">
    <h3 className="fw-bolder">Ingreso del Vehiculo</h3>
    <Card>
      <Form
        onFinish={form.handleSubmit(onSubmit)}
        layout="vertical"
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 15,
          marginTop: 20,
        }}
      >
        <Row gutter={30}>
          <Col xs={24}>
            <Row gutter={30}>
              {configFormSchema.map((field) => (
                <Col
                  className="mb-2"
                  key={String(field.key)}
                  xs={field.xs}
                  md={field.md}
                >
                  {field.type === "divider" ? (
                    <Divider className="my-0 mb-2" />
                  ) : (
                    <FormField
                      fieldConfig={field}
                      control={form.control}
                      error={
                        form.formState.errors[field.key]?.message as string
                      }
                    />
                  )}
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

       {vehicleExist && <Row justify={"start"} gutter={16}>
          <Col xs={24} md={12} lg={6} xl={4} xxl={3}>
            <ButtonCustom
              block
              htmlType="button"
              type="primary"
              variant="solid"
              icon={<IconTransform />}
              text="Cambiar Dueño"
              className="mb-2"
              onClick={() => {
                // setOpenModalCancel(true);
              }}
            />
          </Col>
          <Col xs={24} md={12} lg={6} xl={4} xxl={3}>
            <ButtonCustom
              block
              htmlType="submit"
              color="danger"
              variant="filled"
              icon={<IconTimelineEvent/>}
              text="Historial"
              onClick={()=>{
              }}
            />
          </Col>
        </Row>}
        <Divider />
        <Row gutter={10} >
          <Col xs={24} lg={12} className="mb-3">
            <Card style={{borderColor: "#151515"}}>
              <h6>Marca</h6>
              <Dropdown
                popupRender={()=> menuFilterBrand}
                trigger={["click"]}
                open={openDropDownFilterBrand}
                onOpenChange={(val) => setOpenDropDownFilterBrand(val)}
                >
                <Button color="danger" variant="outlined" style={{color: "black", borderRadius: 15}}>
                  <Space>
                    <FilterOutlined />
                    Filtros
                    <DownOutlined />
                    </Space>
                </Button>
              </Dropdown>
              <CheckboxGroupCustom
                fieldConfig={{
                  key: "vehicleBrand",
                  label: "",
                  type: "checkbox",
                  typeValue: "number",
                  valueInitial: "",
                  options: brandsOptions,
                  direction: "horizontal",
                  displayMode: "image",
                  singleSelect: true,
                  xs: 24,
                  styleContainer: {
                    border: "1px solid #151515",
                    borderRadius: "8px",
                    marginTop: "5px",
                    padding: "8px 0px 8px 0px"
                  },
                  disabled: vehicleExist
                }}
                control={form.control}
                error={form.formState.errors.vehicleBrand?.message}
              />
              <h6>Modelo</h6>
              <CustomSelect
                fieldConfig={{
                  key: "vehicleModel",
                  type: "select",
                  label: "",
                  placeholder: "Seleccionar Modelo",
                  options: modelsOptions,
                  valueInitial: "",
                  typeValue: "string",
                  showSearch: true,
                  disabled: vehicleExist
                }}
                control={form.control} 
                error={form.formState.errors.vehicleModel?.message}
              />

              <h6>Color</h6>
              <Dropdown
                popupRender={()=> menuFilterColor}
                trigger={["click"]}
                open={openDropDownFilterColor}
                onOpenChange={(val) => setOpenDropDownFilterColor(val)}
                >
                <Button color="danger" variant="outlined" style={{color: "black", borderRadius: 15}}>
                <Space>
                  <FilterOutlined />
                  Filtros
                  <DownOutlined />
                  </Space>
                  </Button>
              </Dropdown>
              <CheckboxGroupCustom
                fieldConfig={{
                  key: "vehicleColor",
                  label: "",
                  type: "checkbox",
                  typeValue: "number",
                  valueInitial: "",
                  options: colorsOptions,
                  direction: "horizontal",
                  displayMode: "color",
                  singleSelect: true,
                  xs: 24,
                  styleContainer: {
                    border: "1px solid #151515",
                    borderRadius: "8px",
                    marginTop: "5px",
                    padding: "8px 0px 8px 0px"
                  },
                  disabled: vehicleExist
                }}
                control={form.control}
                error={form.formState.errors.vehicleColor?.message}
              />
            </Card>
          </Col>

          <Col  xs={24} lg={12} className="mb-3">
            <Card
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderColor: "#151515"
              }}
            >
              <Row gutter={30}>
                {configForm2Schema.map((field) => (
                  <Col
                    className="mb-2"
                    key={String(field.key)}
                    xs={field.xs}
                    md={field.md}
                  >
                    {field.type === "divider" ? (
                      <Divider className="my-0 mb-2" />
                    ) : (
                      <FormField
                        fieldConfig={field}
                        control={form.control}
                        error={
                          form.formState.errors[field.key]?.message as string
                        }
                      />
                    )}
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
          
        </Row>
        <Divider />
        <Row justify={"end"} gutter={16}>
          <Col xs={24} md={10} lg={4} xl={4} xxl={3} className="mb-2">
            <ButtonCustom
              block
              htmlType="button"
              type="default"
              variant="outlined"
              className="border-primary-antd"
              text="Cancelar Ingreso"
              onClick={() => {
                setOpenModalCancel(true);
              }}
              style={{borderColor:"#000000", color:"#000000"}}
              
              
              
              />
          </Col>
          <Col xs={24} md={10} lg={4} xl={4} xxl={3}>
            <ButtonCustom
              block
              htmlType="submit"
              type="primary"
              variant="solid"
              text="Crear Cotización"
              className="bg-primary-antd"
            />
          </Col>
        </Row>
      </Form>

      <ModalForm
        open={openModalCancel}
        onClose={() => {
          setOpenModalCancel(false);
          // Opcional: limpiar aquí también si cierras sin enviar
          setCancelReasons([]);
          setOtherReason("");
        }}
        width={600}
        title="Cotización Cancelada"
        description="Queremos entender tu decisión. Cuéntanos que te detuvo para poder mejorar tu experiencia o ajustar la propuesta."
        icon={null}
        footerButtons={[
          {
            text: "Volver a Revisar Cotización",
            type: "default",
            onClick: () => {
              setOpenModalCancel(false);
              cancelQuotation()
            },
            className: "border-primary-antd text-primary-antd",
            icon: <IconCheckupList />,
            iconPosition: "start",
          },
          {
            text: "Enviar Comentarios",
            type: "primary",
            onClick: () => {
              setOpenModalCancel(false)
              cancelQuotation();
              navigate(RoutePaths.VEHICLE_ENTRY);
              notification.success({message: "Cotización Cancelada", placement:"top"})
            },
            className: "bg-primary-antd",
            icon: <IconSend />,
            iconPosition: "start",
          },
        ]}
      >
        <Row gutter={20}>
          <Col xs={24}>
            <Form layout="vertical">
              <Form.Item>
                <Checkbox.Group
                  style={{ width: "100%" }}
                  value={cancelReasons}
                  onChange={(values) => {
                    setCancelReasons(values as string[]);
                    if (!values.includes("Otro motivo")) {
                      setOtherReason("");
                    }
                  }}
                >
                  <Row>
                    <Col span={24}>
                      <Checkbox value="No entendí algún punto  de la cotización">
                        No entendí algún punto de la cotización
                      </Checkbox>
                    </Col>

                    <Col span={24}>
                      <Checkbox value="El precio es más alto de los esperado">
                        El precio es más alto de lo esperado
                      </Checkbox>
                    </Col>

                    <Col span={24}>
                      <Checkbox value="Aún no estoy listo para decidir">
                        Aún no estoy listo para decidir
                      </Checkbox>
                    </Col>

                    <Col span={24}>
                      <Checkbox value="Necesito consultar con alguien más">
                        Necesito consultar con alguien más
                      </Checkbox>
                    </Col>

                    <Col span={24}>
                      <Checkbox value="No confío del todo en el proceso">
                        No confío del todo en el proceso
                      </Checkbox>
                    </Col>

                    <Col span={24}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <Checkbox value="Otro motivo">Otro motivo:</Checkbox>
                        <Input
                          placeholder="Escribe aquí tu motivo"
                          disabled={!cancelReasons.includes("Otro motivo")}
                          value={otherReason}
                          onChange={(e) => setOtherReason(e.target.value)}
                          style={{ marginLeft: "24px", width: "calc(100% - 24px)" }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </ModalForm>

    </Card>
    </div>
    

    
  );
};

export default VehicleEntryCreate;