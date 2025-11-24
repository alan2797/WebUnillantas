// src/components/form-layout/form-layout.component.tsx
import React from "react";
import { Row, Col, Form, Button } from "antd";
import { Link } from "react-router-dom";
import { env } from "../../../config/env";

interface FormLayoutProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitText?: string;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  icon,
  children,
  onSubmit,
  isSubmitting = false,
  submitText = "Continuar",
}) => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          /* CELULARES */
          @media (max-width: 768px) {
            .curve-small {
              width: 160px !important;
            }
            .form-title {
              font-size: 28px !important;
            }
            .form-container {
              max-width: 360px !important;
              padding: 0 20px !important;
            }
          }

          /* TABLETS 769px - 991px */
          @media (min-width: 769px) and (max-width: 991px) {
            .curve-small {
              width: 220px !important;
            }
            .form-title {
              font-size: 36px !important;
            }
            .form-container {
              max-width: 420px !important;
              padding: 0 40px !important;
            }
          }
        `}
      </style>

      {/* Curva izquierda */}
      <img
        src={`${env.baseHref}svg/curva-left.svg`}
        className="curve-small"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "320px",
          height: "auto",
        }}
      />

      {/* Curva derecha */}
      <img
        src={`${env.baseHref}svg/curva-right.svg`}
        className="curve-small"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "320px",
          height: "auto",
        }}
      />

      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Col xs={22} sm={18} md={12} lg={8}>
          <div className="form-container" style={{ margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              {icon && (
                <div style={{ marginBottom: 16 }}>
                  {icon}
                </div>
              )}
              <h2
                className="form-title"
                style={{
                  fontSize: 46,
                  fontWeight: 700,
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {title}
              </h2>
            </div>

            <Form layout="vertical" onFinish={onSubmit}>
              {children}

              <Button
                htmlType="submit"
                type="primary"
                loading={isSubmitting}
                block
                size="large"
                style={{
                  marginTop: 15,
                  backgroundColor: "#FB3748",
                  border: "none",
                  height: 45,
                  fontWeight: 500,
                }}
              >
                {submitText}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};