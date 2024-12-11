import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import sendCircle from "@iconify/icons-mdi/send-circle";
import Swal from "sweetalert2";
import axios from "axios";
import "./form.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const formRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`${name}: ${value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, message } = formData;

    console.log("Submitted Data:", formData);

    axios
      .post("http://localhost:8080/contacts/create-contact", {
        name,
        email,
        phone,
        message,
      })
      .then(() =>
        Swal.fire({
          title: "Your message has been sent successfully!",
          icon: "success",
        })
      )
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "There was an issue sending your message.",
          icon: "error",
        });
        console.error("Error submitting contact form:", error);
      });
  };

  const formFields = [
    {
      id: "name",
      type: "text",
      label: "Your Name",
      placeholder: "Enter Your Name",
      name: "name",
    },
    {
      id: "phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "+1 (123) 456-7890",
      name: "phone",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      placeholder: "you@example.com",
      name: "email",
    },
    {
      id: "message",
      type: "textarea",
      label: "Your Message",
      placeholder: "How can we help you?",
      name: "message",
    },
  ];

  return (
    <form className="form" onSubmit={handleSubmit} ref={formRef}>
      <h2 className="form-h2">Send Us a Message</h2>

      {formFields.map((field) => (
        <label key={field.id} className="form-label">
          {field.label}
          {field.type === "textarea" ? (
            <textarea
              className="form-textarea"
              placeholder={field.placeholder}
              name={field.name}
              onChange={handleInputChange}
            />
          ) : (
            <input
              className="form-input"
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              onChange={handleInputChange}
            />
          )}
        </label>
      ))}

      <Icon className="form-submit" icon={sendCircle} />
      <button
        type="submit"
        className="form-submit"
        style={{ height: "90px", width: "300px", fontSize: "20px" }}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
