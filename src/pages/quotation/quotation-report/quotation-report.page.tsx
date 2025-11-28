import { Card, Col, Row } from "antd";
import PageContainer from "../../../components/page-container/page-container.component";
import ButtonCustom from "../../../components/button/button.component";
import { PlusCircleOutlined } from "@ant-design/icons";
import { IconCirclePlus } from "@tabler/icons-react";
import { useState } from "react";
import type { FieldConfig } from "../../../interfaces/components.interface";
import type { QuotationReportFilters } from "../../../interfaces/quotation.interface";
import { configFormFilters } from "./config/quotation-report.config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildDefaultValues, generateZodSchema } from "../../../validators/validations";
import { FormField } from "../../../components/form-field/form-field.component";
import { TableCustom } from "../../../components/table/table-custom.component";
import { columns, mockQuotationData } from "./config/quotation-report.table";

const QuotationReport: React.FC = () => {
    const [configFormFiltersSchema] = useState<FieldConfig<QuotationReportFilters>[]>(configFormFilters());
    const form = useForm<QuotationReportFilters>({
        defaultValues: buildDefaultValues(configFormFiltersSchema),
        mode: "onChange",
    });
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
            </Row>
            <Row>
                <Col xs={24}>
                    <TableCustom
                        columns={columns}
                        dataSource={mockQuotationData}
                        rowKey="quotationCode"
                    />
                </Col>
                
            </Row>
        </Card>
    
    )
}

export default QuotationReport;