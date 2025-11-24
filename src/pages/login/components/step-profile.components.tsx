
import { Button } from 'antd';
import { ArrowRightOutlined, ShopOutlined } from '@ant-design/icons';
import StepLayout from './step-layout.component';
import type { ProfileDto } from '../../../interfaces/profile.interface';
import { env } from '../../../config/env';

interface StepProfileProps {
  profile: ProfileDto | null;
  setProfile: (profile: ProfileDto) => void;
  onNext: () => void;
  profilesList: ProfileDto[];
}

const StepProfile: React.FC<StepProfileProps> = ({ onNext, setProfile, profile, profilesList }) => {
  const profiles: ProfileDto[] = profilesList || [];

  const handleProfileSelect = (p: ProfileDto) => {
    setProfile(p);
  };

  return (
    <StepLayout
      imgSrc={`${env.baseHref}svg/logo-sm.svg`}
      title="¿A qué perfil desea entrar?"
      items={profiles}
      renderItem={(data) => (
        <Button
        className='fw-bolder'
          type={profile?.id !== data.id ? 'primary' : 'primary'}
          block
          color="primary"
          variant={profile?.id !== data.id ? 'outlined' : 'solid'}
          style={{
            borderRadius: 16,
            fontSize: 22,
            marginBottom: 8,
            transition: 'all 0.3s ease',
            padding: 22
          }}
          onClick={() => handleProfileSelect(data)}
          icon={<ShopOutlined />}
        >
          {data.name}
        </Button>
      )}
      onNext={onNext}
      disableNext={!profile?.id}
      nextLabel={
        <>
          Ingresar <ArrowRightOutlined style={{ marginLeft: 8 }} />
        </>
      }
    />
  );
};

export default StepProfile;
