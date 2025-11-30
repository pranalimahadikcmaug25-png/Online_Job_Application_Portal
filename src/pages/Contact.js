import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e) => {
    e.preventDefault();
    console.log("Contact form", form);
    alert("Message sent (demo)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container className="my-5">
      <div className="glass p-5 mx-auto" style={{ maxWidth: "700px" }}>
        <h2 className="fw-bold mb-3">Contact Us</h2>
        <p className="text-muted mb-4">Have questions? Send us a message.</p>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Control
              size="lg"
              className="form-glass"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              size="lg"
              type="email"
              className="form-glass"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              className="form-glass"
              rows={5}
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </Form.Group>
          <Button
            className="w-100"
            size="lg"
            type="submit"
            style={{
              background: "linear-gradient(135deg, #4078FF 0%, #3461E0 100%)",
              border: "none",
              borderRadius: "12px",
            }}
          >
            Send Message
          </Button>
        </Form>
      </div>
    </Container>
  );
}
