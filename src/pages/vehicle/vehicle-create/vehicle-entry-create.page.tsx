import React, { useState } from 'react';
import { Button, Card, Col, Divider, Form, Row } from 'antd';
import {CloseCircleOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useNavigate } from 'react-router-dom';
import ButtonCustom from '../../../components/button/button.component';
import type { VehicleEntryCreate } from '../../../interfaces/vehicle-entry.interface';
import type { FieldConfig } from '../../../interfaces/components.interface';
import { configForm } from './configs/vehicle-entry-create.config';
import { buildDefaultValues, generateZodSchema } from '../../../validators/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../components/form-field/form-field.component';

const VehicleEntryCreate: React.FC = () => {
  const [filters, setFilters] = useState({dateRange: null as any, status: "all"});
//   const [openDropDown, setOpenDropDown] = useState(false);
  const [configFormSchema, setConfigFormSchema] = useState<FieldConfig<VehicleEntryCreate>[]>(configForm());
  const [tempFilters, setTempFilters] = useState({dateRange: null as any, status: "all",});
  dayjs.extend(isBetween);
  const navigate = useNavigate();
  const form = useForm<VehicleEntryCreate>({
    resolver: zodResolver(
      generateZodSchema<VehicleEntryCreate>(configFormSchema)
    ),
    defaultValues: buildDefaultValues(configFormSchema),
    mode: "onChange",
  });

  const onSubmit = () => {
    console.log('Ver historial de:');
  };

  return (
      <Card>
        <h2>Ingreso del Vehiculo</h2>
              <Form
                onFinish={form.handleSubmit(onSubmit)}
                layout="vertical"
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: 24,
                  marginTop: 20,
                }}
              >
                <Row gutter={30}>
                  <Col xs={24}>
                    <Row gutter={30}>
                      {configFormSchema
                        .filter(field => field.visible !== false)
                        .map((field) => (
                        <Col
                          className="mb-2"
                          key={String(field.key)}
                          xs={field.xs}
                          md={field.md}
                          lg={field.lg}
                        >
                          <FormField
                            fieldConfig={field}
                            control={form.control}
                            error={form.formState.errors[field.key]?.message as string}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
                <Row justify={"end"} gutter={16}>
                  <Col xs={24} md={10} lg={6} xl={4}>
                    <ButtonCustom
                      block
                      htmlType="button"
                      type="primary"
                      variant="solid"
                      text={
                        <>
                          {" "}
                          <CloseCircleOutlined /> Cancelar
                        </>
                      }
                      onClick={() => {
                        // setIsModalVisible(true);
                      }}
                      className="bg-error-antd"
                    />
                  </Col>
                  <Col xs={24} md={10} lg={6} xl={4}>
                    <ButtonCustom
                      block
                      htmlType="submit"
                      type="primary"
                      variant="solid"
                      text={
                        <>
                          <PlusCircleOutlined /> Crear{" "}
                        </>
                      }
                      className="bg-primary-antd"
                    />
                  </Col>
                </Row>
              </Form>
      </Card>
  );
};

export default VehicleEntryCreate;