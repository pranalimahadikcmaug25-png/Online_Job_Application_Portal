import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <Container className="my-5">
      <div className="glass p-5 fade-in show">
        <div className="text-center">
          <h2 className="fw-bold mb-4">About Us</h2>
          <p
            className="text-muted mb-5"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            Welcome to <strong>Online Job Portal</strong> — We aim to make job
            searching intuitive and visually elegant.
          </p>
        </div>

        <Row className="mt-4 justify-content-center">
          <Col md={4} sm={6} className="mb-3">
            <div className="glass p-4 text-center h-100">
              <h5 className="fw-bold mb-2">Pranali Mahadik</h5>
              <p className="text-muted mb-0">PRN: 250840320128</p>
            </div>
          </Col>
          <Col md={4} sm={6} className="mb-3">
            <div className="glass p-4 text-center h-100">
              <h5 className="fw-bold mb-2">Deepa Jadhav</h5>
              <p className="text-muted mb-0">PRN: 250840320051</p>
            </div>
          </Col>
          <Col md={4} sm={6} className="mb-3">
            <div className="glass p-4 text-center h-100">
              <h5 className="fw-bold mb-2">Rutuja Gholap</h5>
              <p className="text-muted mb-0">PRN: 250840320159</p>
            </div>
          </Col>
        </Row>

        <div className="text-center mt-5">
          <p
            className="text-muted"
            style={{ maxWidth: "1000px", margin: "0 auto" }}
          >
            Guided by our passion for design, we combined technology and
            creativity to build this responsive full-stack web portal.
          </p>
        </div>
      </div>
    </Container>
  );
}
