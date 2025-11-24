import {
    ArrowRightOutlined,
    ArrowLeftOutlined,
    ShoppingOutlined,
  } from "@ant-design/icons";
  import { Button } from "antd";
import StepLayout from "./step-layout.component";
import type { AreaDto } from "../../../interfaces/area.interface";
import { env } from "../../../config/env";
  
  interface StepDepartmentProps {
    onNext: () => void;
    onBack: () => void;
    setDepartment: (department: AreaDto | null) => void;
    department?: AreaDto  | null;
    departamentList: AreaDto[];
    canSkipSelection?: boolean
  }
  
  const StepDepartment: React.FC<StepDepartmentProps> = ({
    onNext,
    onBack,
    setDepartment,
    department,
    departamentList,
    canSkipSelection
  }) => {
    const departments: AreaDto[] = departamentList;
  
    const handleClick = (data: AreaDto) => {
      if (department?.id === data.id) {
        setDepartment(null)
      } else {
        setDepartment(data)
      }
    }

    return (
      <StepLayout<AreaDto>
      imgSrc={`${env.baseHref}svg/logo-sm.svg`}
        title="¿A qué área desea entrar?"
        items={departments}
        renderItem={(data) => (
          <Button
            type={department?.id === data.id ? "primary" : "default"}
            className="w-100 fw-bolder"
            color="primary"
            variant={department?.id !== data.id ? 'outlined' : 'solid'}
            style={{
                borderRadius: 16,
                fontSize: 22,
                marginBottom: 8,
                transition: 'all 0.3s ease',
                padding: 22
            }}
            icon={<ShoppingOutlined style={{ fontSize: 20 }} />}
            onClick={() => handleClick(data)}
          >
            {data.name}
          </Button>
        )}
        onBack={onBack}
        onNext={onNext}
        disableNext={!department?.id && !canSkipSelection}
        backLabel={
          <>
            Regresar <ArrowLeftOutlined style={{ marginLeft: 8 }} />
          </>
        }
        nextLabel={
          <>
            Ingresar <ArrowRightOutlined style={{ marginLeft: 8 }} />
          </>
        }
      />
    );
  };
  
  export default StepDepartment;
  