import { Row, Col, Button, Card, Typography, Space } from "antd"

const { Title } = Typography

interface StepLayoutProps<T = any> {
  imgSrc?: string
  title?: string
  items?: T[]
  renderItem?: (item: T) => React.ReactNode
  onBack?: () => void
  onNext?: () => void
  backLabel?: React.ReactNode
  nextLabel?: React.ReactNode
  disableNext?: boolean
}

const StepLayout = <T,>({
  imgSrc,
  title,
  items = [],
  renderItem,
  onBack,
  onNext,
  backLabel = "Regresar",
  nextLabel = "Ingresar",
  disableNext = false,
}: StepLayoutProps<T>) => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Col xs={22} sm={22} md={22} lg={20} xl={18}>
        <Card
          style={{ borderRadius: 24 }}
          bodyStyle={{ padding: "2rem", textAlign: "center" }}
        >
          {imgSrc && <img src={imgSrc} alt="logo" style={{ marginBottom: 40 }} />}
          {title && (
            <Title level={3} className="text-primary-antd" style={{marginBottom: 24 }}>
              {title}
            </Title>
          )}

          <Row gutter={[16, 16]} justify="center">
            {items.map((item: any) => (
              <Col key={item.id} xs="auto">
                {renderItem ? renderItem(item) : <span>{item.name}</span>}
              </Col>
            ))}
          </Row>

          <Space style={{ marginTop: 32 }}>
            {onBack && (
              <Button type="default" variant="outlined" onClick={onBack} 
              className="fw-bold text-primary-antd" style={{borderColor: "#006eb5",
                    borderWidth: "2px",}}>
                {backLabel}
              </Button>
            )}
            {onNext && (
              <Button
                className="fw-bold"
                type="primary"
                color="primary"
                onClick={onNext}
                disabled={disableNext}
              >
                {nextLabel}
              </Button>
            )}
          </Space>
        </Card>
      </Col>
    </Row>
  )
}

export default StepLayout
