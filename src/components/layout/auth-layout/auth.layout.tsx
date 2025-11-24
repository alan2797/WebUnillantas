import React from "react";
import { Row, Col } from "antd";
import { env } from "../../../config/env";

export type AuthVariant =
  | "login"
  | "recovery"
  | "change-password"
  | "custom";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: AuthVariant;
  curveSize?: number; // tamaño base de curvas (default 320)
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  icon,
  children,
  variant = "custom",
  curveSize = 320,
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
          .curve-small { width: ${curveSize * 0.4}px !important; }
          .auth-title { font-size: 28px !important; }
          .auth-container {
            max-width: 350px !important;
            padding: 0 20px !important;
          }
        }

        /* TABLETS 769 - 991px */
        @media (min-width: 769px) and (max-width: 991px) {
          .curve-small { width: ${curveSize * 0.7}px !important; }
          .auth-title { font-size: 36px !important; }
          .auth-container {
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
          width: curveSize,
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
          width: curveSize,
          height: "auto",
        }}
      />

      <Row justify="center" align="middle" style={{ minHeight: "100vh", zIndex: 2 }}>
        <Col xs={22} sm={18} md={12} lg={8}>
          <div className="auth-container" style={{ margin: "0 auto" }}>
            
            {/* ICONO */}
            {icon && (
              <div style={{ textAlign: "center", marginBottom: 15 }}>
                {icon}
              </div>
            )}

            {/* TITULO */}
            <h2
              className="auth-title"
              style={{
                marginBottom: subtitle ? 10 : 30,
                fontSize: 46,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {title}
            </h2>

            {/* SUBTITULO */}
            {subtitle && (
              <p
                style={{
                  textAlign: "center",
                  marginBottom: 25,
                  color: "#666",
                  fontSize: 16,
                }}
              >
                {subtitle}
              </p>
            )}

            {/* FORMULARIO */}
            {children}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AuthLayout;
