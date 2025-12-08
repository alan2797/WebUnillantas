import { Card, Col, Dropdown, Row, Space, type MenuProps } from "antd";
import ButtonCustom from "../../../components/button/button.component";
import {
  IconCirclePlus,
  IconClockDown,
  IconClockUp,
  IconContainer,
  IconEraser,
  IconFilter2,
  IconSortAscending2,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { ApiResponse, FieldConfig } from "../../../interfaces/components.interface";
import type { BranchDto, CotizacionesResponse, CotizacionItem, EstacionDto, QuotationReportFilters, QuotationReportTable } from "../../../interfaces/quotation.interface";
import { useForm, useWatch } from "react-hook-form";
import { buildDefaultValues, generateZodSchema } from "../../../validators/validations";
import { FormField } from "../../../components/form-field/form-field.component";
import { TableCustom } from "../../../components/table/table-custom.component";
import { columns, mockQuotationData } from "./config/quotation-report.table";
import { configFormFilters } from "./config/quotation-report.config";
import { handleRequestAxios } from "../../../utils/handle-request-axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { getAllQuotationsService } from "../../../services/quotations";
import { getBranchService, getEstacionesByBranchIdService } from "../../../services/catalogs";
import { updateFormFieldsWithOptions } from "../../../utils/form-config.util";

const QuotationReport: React.FC = () => {
  const [configFormFiltersSchema, setConfigFormFiltersSchema] = useState<FieldConfig<QuotationReportFilters>[]>(configFormFilters());
  const [datasource, setDataSource] = useState<CotizacionItem[] | undefined>(undefined);
  const form = useForm<QuotationReportFilters>({
    defaultValues: buildDefaultValues(configFormFiltersSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch<AppDispatch>();
  const asd = () => {
    console.log("click");
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <a onClick={asd} rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <IconClockUp style={{ marginRight: 8 }} />
          De más reciente a más antiguo
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a onClick={asd} rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <IconClockDown style={{ marginRight: 8 }} />
          De más antiguo a más reciente
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a onClick={asd} rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <IconSortAscendingLetters style={{ marginRight: 8 }} />
          Alfabeto Ascendente
        </a>
      ),
      key: "2",
    },
    {
      label: (
        <a onClick={asd} rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <IconSortDescendingLetters style={{ marginRight: 8 }} />
          Alfabeto Descendente
        </a>
      ),
      key: "3",
    },
  ];

  const watchBranch = form.watch("divisionId");
  const filters = useWatch({
    control: form.control,
  }); 

  useEffect(() => {
    if (!filters) return;

    const timeout = setTimeout(() => {
      getQuotationsAll(filters);
    }, 500); // debounce de 500ms

    return () => clearTimeout(timeout);
  }, [filters]);

  useEffect(() => {
    if(watchBranch){
      console.log(watchBranch);
      getEstacionesByBranchId(watchBranch);
    }
  }, [watchBranch])

  useEffect(() => {
    getQuotationsAll();
  }, []);

  const getBranchAll = async() => {
    const result: ApiResponse<BranchDto[]> | null = await handleRequestAxios(dispatch, () => getBranchService(), {
      showSpinner: false,
    });
  }

  const getEstacionesByBranchId = async(branchId: number) => {
    const result: ApiResponse<EstacionDto[]> | null = await handleRequestAxios(dispatch, () => getEstacionesByBranchIdService(branchId), {
      showSpinner: false,
    });
    if(result?.success){
      console.log(result.data);
      setConfigFormFiltersSchema((prev: any) =>
        updateFormFieldsWithOptions(prev, [
          {
            fieldKey: "stationId",
            data: result.data ?? [],
            labelKey: "nombre",
            valueKey: "estacionId",
          },
        ])
      );
    }
  }

  const getQuotationsAll = async (filters?: QuotationReportFilters) => {
    setDataSource(undefined);
    const result: ApiResponse<CotizacionesResponse> | null = await handleRequestAxios(dispatch, () => getAllQuotationsService(filters), {
      showSpinner: false,
    });
    if (result?.success) {
      setDataSource(result?.data.items);
    } else {
      setDataSource([]);
    }
  };

  return (
    <Card>
      <Row justify={"space-between"} className="mb-4">
        <Col>
          <h3 className="fw-bolder">Cotizaciones</h3>
        </Col>
        <Col>
          <ButtonCustom text="Nueva Cotización" color="primary" variant="solid" icon={<IconCirclePlus style={{ marginTop: 7 }} />}></ButtonCustom>
        </Col>
      </Row>
      <Row gutter={30}>
        {configFormFiltersSchema.map((field) => (
          <Col className="mb-2" key={String(field.key)} xs={field.xs} md={field.md}>
            {<FormField fieldConfig={field} control={form.control} error={form.formState.errors[field.key]?.message as string} />}
          </Col>
        ))}
        <Col className="d-flex align-items-center justify-content-end mb-2" xs={24} md={12}>
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
            <a onClick={(e) => e.preventDefault()} style={{ textDecoration: "none" }}>
              <ButtonCustom
                icon={<IconFilter2 />}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  marginRight: 10,
                }}
              />
            </a>
          </Dropdown>
          <ButtonCustom
            className="filterBtn"
            text="Limpiar Filtros"
            style={{ background: "#8082851A", borderColor: "#000000", color: "#000000" }}
            variant="outlined"
            onClick={() => form.reset()}
            icon={<IconEraser />}
          ></ButtonCustom>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <TableCustom columns={columns} dataSource={datasource} rowKey="codigoCotizacion" pageSize={5} showPagination />
        </Col>
      </Row>
    </Card>
  );
};

export default QuotationReport;
