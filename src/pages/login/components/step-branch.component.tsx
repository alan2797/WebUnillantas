import { ShoppingOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { Button } from "antd"
import StepLayout from "./step-layout.component"
import type { BranchDto } from "../../../interfaces/branch.interface"
import { env } from "../../../config/env"


interface StepBranchProps {
  onNext: () => void
  setBranch: (branch: BranchDto | null) => void
  branch?: BranchDto | null
  branchList?: BranchDto[]
  canSkipSelection?: boolean
}

const StepBranch: React.FC<StepBranchProps> = ({ onNext, setBranch, branch, branchList, canSkipSelection }) => {
  const branches: BranchDto[] | undefined = branchList ?? []

  const handleClick = (data: BranchDto) => {
    if (branch?.id === data.id) {
      setBranch(null)
    } else {
      setBranch(data)
    }
  }

  return (
    <StepLayout
      imgSrc={`${env.baseHref}svg/logo-sm.svg`}
      title="¿A qué sucursal desea entrar?"
      items={branches}
      renderItem={(data) => (
        <Button
          type={branch?.id === data.id ? "primary" : "default"}
          block
          size="large"
          variant={branch?.id !== data.id ? 'outlined' : 'solid'}
          className="fw-bolder"
          color="primary"
          style={{
            borderRadius: 16,
            fontSize: 22,
            marginBottom: 8,
            transition: 'all 0.3s ease',
            padding: 22
          }}
          onClick={() => handleClick(data)}
          icon={<ShoppingOutlined />}
        >
          {data.name}
        </Button>
      )}
      onNext={onNext}
      disableNext={!branch?.id && !canSkipSelection}
      nextLabel={
        <>
          Ingresar <ArrowRightOutlined style={{ marginLeft: 8 }} />
        </>
      }
    />
  )
}

export default StepBranch
