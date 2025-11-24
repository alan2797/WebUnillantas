import { Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined, ShopOutlined } from '@ant-design/icons';
import StepLayout from './step-layout.component';
import type { PositionDto } from '../../../interfaces/position.interface';
import { env } from '../../../config/env';

interface StepPositionProps {
  position: PositionDto | null;
  setPosition: (pos: PositionDto | null) => void;
  onBack: () => void;
  handleNext: () => void;
  positionList: PositionDto[];
  canSkipSelection?: boolean
}

const StepPosition: React.FC<StepPositionProps> = ({ onBack, handleNext, setPosition, position, positionList, canSkipSelection }) => {
  const positions: PositionDto[] = positionList;

  const handleClick = (data: PositionDto) => {
    if (position?.id === data.id) {
      setPosition(null)
    } else {
      setPosition(data)
    }
  } 

  return (
    <StepLayout
      imgSrc={`${env.baseHref}svg/logo-sm.svg`}
      title="¿A qué puesto desea entrar?"
      items={positions}
      renderItem={(data) => (
        <Button
        className='fw-bolder'
          type={position?.id !== data.id ? 'default' : 'primary'}
          block
          variant={position?.id !== data.id ? 'outlined' : 'solid'}
          color="primary"
          style={{
            borderRadius: 16,
            fontSize: 22,
            marginBottom: 8,
            transition: 'all 0.3s ease',
            padding: 22
          }}
          onClick={() => handleClick(data)}
          icon={<ShopOutlined />}
        >
          {data.name}
        </Button>
      )}
      onBack={onBack}
      onNext={handleNext}
      disableNext={!position?.id && !canSkipSelection}
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

export default StepPosition;
