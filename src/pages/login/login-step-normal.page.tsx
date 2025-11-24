import { useState, useEffect } from "react";
import StepDepartment from "./components/step-departament.component";
import StepPosition from "./components/step-position.component";
import { Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import type { AreaDto } from "../../interfaces/area.interface";
import type { LoginStepNormalProps, StepItemNormal } from "../../interfaces/login.interface";
import type { PositionDto } from "../../interfaces/position.interface";
import type { BranchDto } from "../../interfaces/branch.interface";
import StepBranch from "./components/step-branch.component";
import { useApis } from "./hooks/use-apis";

const LoginStepNormal: React.FC<LoginStepNormalProps> = ({ user, onFinish }) => {
  const [step, setStep] = useState<number>(0);
  const [branch, setBranch] = useState<BranchDto | null>(null);
  const [department, setDepartment] = useState<AreaDto | null>(null);
  const [position, setPosition] = useState<PositionDto | null>(null);
  const [departmentList, setDepartmentList] = useState<AreaDto[] | null>(null);
  const [positionList, setPositionList] = useState<PositionDto[] | null>(null);
  const { selectBranchApi, selectAreaApi, selectPositionApi } = useApis();

  useEffect(() => {
    if (user && !user.branches) {
      handleFinish();
    }
  }, [user]);

  const handleNext = async () => {
    if (!steps[step]) return;
    const currentStepType = steps[step].type;
  
    try {
      switch (currentStepType) {
        case "branch":
          if (!branch) return;
          const branchResult = await selectBranchApi(branch.id);
          if (!branchResult?.success) return;
          setDepartmentList(branchResult.data?.areas ?? []);

          break;
        case "department":
          if (!department) break;
          const departmentResult = await selectAreaApi(department.id, branch?.id ?? 0);
          if (!departmentResult?.success) return;
          setPositionList(departmentResult.data?.positions ?? []);

          break;
        case "position":
          if (!position) break;
          const positionResult = await selectPositionApi(department?.id ?? 0, position.id ?? 0);
          if (!positionResult?.success) return;
          handleFinish();

          break;
      }
  
      if (step === steps.length - 1) {
        handleFinish();
      } else {
        setStep(step + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFinish = () => {
    onFinish();
  };

  const buildSteps = (): StepItemNormal[] => {
    const steps: StepItemNormal[] = [];
    
    steps.push({
      type: "branch",
      component: (
        <StepBranch
          key="branch"
          branch={branch}
          setBranch={setBranch}
          onNext={handleNext}
          branchList={user?.branches ?? []}
        />
      ),
    });
    
    steps.push({
      type: "department",
      component: (
        <StepDepartment
          key="department"
          department={department}
          setDepartment={setDepartment}
          onNext={handleNext}
          onBack={handleBack}
          departamentList={departmentList ?? []}
        />
      ),
    });
    
    steps.push({
      type: "position",
      component: (
        <StepPosition
          key="position"
          position={position}
          setPosition={setPosition}
          onBack={handleBack}
          handleNext={handleNext}
          positionList={positionList ?? []}
        />
      ),
    });
    
    return steps;
  };

  const steps = buildSteps();
  
  if (steps.length === 0) {
    return null;
  }

  return (
    <Layout className="bg-primary-antd" style={{ minHeight: "100vh" }}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={24}>{steps[step]?.component}</Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginStepNormal;