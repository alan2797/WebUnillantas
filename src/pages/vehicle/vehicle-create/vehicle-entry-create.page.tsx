import React, { useState } from "react";
import { Button, Card, Checkbox, Col, DatePicker, Divider, Dropdown, Form, Input, Row, Select, Space } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeOutlined,
  FileAddOutlined,
  FilterOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../components/button/button.component";
import type { VehicleEntryCreate } from "../../../interfaces/vehicle-entry.interface";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { configForm, configForm2 } from "./configs/vehicle-entry-create.config";
import {
  buildDefaultValues,
  generateZodSchema,
} from "../../../validators/validations";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/form-field/form-field.component";
import CheckboxGroupCustom from "../../../components/checkbox/checkbox.component";
import CustomSelect from "../../../components/select/select.component";
import ModalForm from "../../../components/modals/modal-form.component";
import { IconCheckupList, IconSend } from "@tabler/icons-react";

const brandsOptions = [
  { value: "kia", label: "KIA", image: "https://logo.clearbit.com/suzuki.fr" },
  {
    value: "toyota",
    label: "TOYOTA",
    image: "https://logo.clearbit.com/toyotacomauto.com",
  },
  {
    value: "chery",
    label: "CHERY",
    image: "https://logo.clearbit.com/chery.cn",
  },
  {
    value: "chery22",
    label: "CHERY",
    image: "https://logo.clearbit.com/chery.cn",
  },
  {
    value: "chery3",
    label: "CHERY",
    image: "https://logo.clearbit.com/chery.cn",
  },
];

const colorsOptions = [
  { value: "azul", label: "Azul", color: "#4A90E2" },
  { value: "rojo", label: "Rojo", color: "red" },
  { value: "amarillo", label: "Amarillo", color: "yellow" },
  { value: "verde", label: "Verde", color: "green" },
  { value: "rosado", label: "Rosado", color: "pink" },
];

const VehicleEntryCreate: React.FC = () => {
  const [valueFilterBrand, setValueFilterBrand] = useState("");
  const [valueFilterColor, setValueFilterColor] = useState("");
  const [openDropDownFilterBrand, setOpenDropDownFilterBrand] = useState(false);
  const [openDropDownFilterColor, setOpenDropDownFilterColor] = useState(false);
  const [tempFilters, setTempFilters] = useState({search: ""});
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const menuFilterBrand = (
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
      value={valueFilterBrand}
      style={{ width: "100%", marginBottom: 12 }}
      onChange={(e) => setValueFilterBrand(e.target.value)}
    />

    <Button
      type="primary"
      style={{ width: "100%" }}
      onClick={(e) => {
        e.stopPropagation();
        console.log("Filtros aplicados:", valueFilterBrand);
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
    />

    <Button
      type="primary"
      style={{ width: "100%" }}
      onClick={(e) => {
        e.stopPropagation();
        console.log("Filtros aplicados:", valueFilterColor);
        setOpenDropDownFilterColor(false);
      }}
    >
      Aplicar filtros
    </Button>
  </div>
  );
  
  // Combinar ambas configuraciones en una sola
  const [configFormSchema] = useState<FieldConfig<VehicleEntryCreate>[]>(configForm());
  const [configForm2Schema] = useState<FieldConfig<VehicleEntryCreate>[]>(configForm2());
  
  // Combinar ambos esquemas de validación
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

  const onSubmit = (data: VehicleEntryCreate) => {
    console.log("Datos recibidos:", data);
    console.log("📋 Todos los valores del form:", form.getValues());
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
                  typeValue: "string",
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
                  }
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
                  options: [],
                  valueInitial: "",
                  typeValue: "string",
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
                  typeValue: "string",
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
                  }
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
        onClose={() => setOpenModalCancel(false)}
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
            },
            className: "border-primary-antd text-primary-antd",
            icon: <IconCheckupList />,
            iconPosition: "start",
          },
          {
            text: "Enviar Comentarios",
            type: "primary",
            onClick: () => {
              // handleCreate();
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
                  <Checkbox.Group style={{ width: "100%" }}>
                    <Row>
                      <Col span={24}>
                        <Checkbox value="No entendí algún punto  de la cotización">No entendí algún punto  de la cotización</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="El precio es más alto de los esperado">El precio es más alto de los esperado</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="Aún no estoy listo para decidir">Aún no estoy listo para decidir</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="Necesito consultar con alguien má">Necesito consultar con alguien más</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="No confío del todo en el proceso">No confío del todo en el proceso</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="Otro mótivo">Otro mótivo:</Checkbox>
                        
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