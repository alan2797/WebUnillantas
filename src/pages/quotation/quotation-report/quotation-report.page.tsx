import { Card, Col, Dropdown, Row, Space, type MenuProps } from "antd";
import ButtonCustom from "../../../components/button/button.component";
import { IconCirclePlus, IconClockDown, IconClockUp, IconContainer, IconEraser, IconFilter2, IconSortAscending2, IconSortAscendingLetters,IconSortDescendingLetters } from "@tabler/icons-react";
import { useState } from "react";
import type { FieldConfig } from "../../../interfaces/components.interface";
import type { QuotationReportFilters } from "../../../interfaces/quotation.interface";
import { useForm } from "react-hook-form";
import { buildDefaultValues, generateZodSchema } from "../../../validators/validations";
import { FormField } from "../../../components/form-field/form-field.component";
import { TableCustom } from "../../../components/table/table-custom.component";
import { columns, mockQuotationData } from "./config/quotation-report.table";
import { configFormFilters } from "./config/quotation-report.config";


const QuotationReport: React.FC = () => {
    const [configFormFiltersSchema] = useState<FieldConfig<QuotationReportFilters>[]>(configFormFilters());
    const form = useForm<QuotationReportFilters>({
        defaultValues: buildDefaultValues(configFormFiltersSchema),
        mode: "onChange",
    });
    const asd = () => {
        console.log("click");
    };
    const items: MenuProps['items'] = [
  {
    label: (
      <a onClick={asd} rel="noopener noreferrer" style={{textDecoration:"none"}}>
        <IconClockUp style={{marginRight: 8}}/>
        De más reciente a más antiguo
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a onClick={asd} rel="noopener noreferrer" style={{textDecoration:"none"}}>
        <IconClockDown style={{marginRight: 8}}/>
        De más antiguo a más reciente
      </a>
    ),
    key: '1',
  },
  {
    label: (
      <a onClick={asd} rel="noopener noreferrer" style={{textDecoration:"none"}}>
        <IconSortAscendingLetters style={{marginRight: 8}}/>
        Alfabeto Ascendente
      </a>
    ),
    key: '2',
  },
  {
    label: (
      <a onClick={asd} rel="noopener noreferrer" style={{textDecoration:"none"}}>
        <IconSortDescendingLetters style={{marginRight: 8}}/>
        Alfabeto Descendente
      </a>
    ),
    key: '3',
  },
];
    return (
        <Card>
            <Row justify={"space-between"} className="mb-4">
                <Col><h3 className="fw-bolder">Cotizaciones</h3></Col>
                <Col>
                    <ButtonCustom 
                        text="Nueva Cotización"
                        color="primary"
                        variant="solid"
                        icon={<IconCirclePlus style={{marginTop: 7}}/>}>

                    </ButtonCustom>
                </Col>
            </Row>
            <Row gutter={30}> 
                {configFormFiltersSchema.map((field) => (
                    <Col
                        className="mb-2"
                        key={String(field.key)}
                        xs={field.xs}
                        md={field.md}
                    >
                    {(
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
                <Col className="d-flex align-items-center justify-content-end mb-2" xs={24} md={12}>
                    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
                    <a onClick={(e) => e.preventDefault()} style={{textDecoration:"none"}}>
                        <ButtonCustom
                            icon={<IconFilter2 />}
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                border: "none",
                                marginRight: 10
                            }}
                        />
                    </a>
                    </Dropdown>
                    <ButtonCustom
                        className="filterBtn"
                        text="Limpiar Filtros"
                        style={{background:"#8082851A", borderColor:"#000000", color:"#000000"}}
                        variant="outlined"
                        onClick={() => form.reset()}
                        icon={<IconEraser />}>
                    </ButtonCustom>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <TableCustom
                        columns={columns}
                        dataSource={mockQuotationData}
                        rowKey="quotationCode"
                        pageSize={5}
                        showPagination
                    />
                </Col>
                
            </Row>
        </Card>
    
    )
}

export default QuotationReport;