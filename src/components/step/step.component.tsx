import { Steps, Button } from "antd";
import type { StepCustomProps } from "../../interfaces/components.interface";

const { Step } = Steps;

export const StepCustom = ({ current, steps, onChange }: StepCustomProps) => {
  return (
    <Steps
            type="default"
        size="default"
      current={current}
      onChange={onChange}
        className="site-navigation-steps"
    >
      {steps.map((step, index) => {
        let type: "primary" | "default" = "default";
        let variant: "filled" | "outlined" | "text" | "dashed"  | "solid"   = "filled";

        if (index === current) {
          type = "primary";
          variant = "solid";
        } else if (index < current) {
          type = "primary";
          variant = "filled";
        } else {
          type = "default";
          variant = "filled";
        }

        return (
          <Step
            key={index}
            title={
              <div   style={{
                display: "flex",
                alignItems: "center", // alinea verticalmente
                gap: 16,              // espacio entre botón y texto
              }}>
                <Button
                  size="large"
                  variant={variant}
                  color={type}
                  icon={step.icon2}
                  style={{
                    width: 60,
                    height: 60,
                    fontSize: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // evita conflicto con Steps
                    onChange?.(index);
                  }}
                >
                </Button>
                <span className="ms-3">{step.title}</span>
              </div>
            }
            icon={<></>}
          />
        );
      })}
    </Steps>
  );
};
