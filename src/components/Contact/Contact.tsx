import React, { useState } from "react";
import "./Contact.css";
import LoadingSpinner from "./LoadingSpinner";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
// import { NetlifyForm, Honeypot } from "react-netlify-forms";
// import { sendEmail } from "@netlify/emails";

interface IFormState {
  name: string;
  email: string;
  message: string;
  sent: boolean;
}

const Contact = () => {
  const [formState, setFormState] = useState<IFormState>({
    name: "",
    email: "",
    message: "",
    sent: false,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormState>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit: SubmitHandler<IFormState> = async (data) => {

    setLoading(true);
    const { name, email, message } = data;

    try {
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        body: JSON.stringify({
          from: "MyOutlookEmail@outlook.com",
          to: "MyOutlookEmail@outlook.com",
          subject: "You have a new email from your portfolio",
          parameters: {
            name: name,
            email: email,
            message: message,
          },
        }),
      });
      if (response.status >= 400) {
        setError(true);
        setFormState({ ...formState, sent: false });
      } else {
        setFormState({ ...formState, sent: true });
      }
    } catch (error) {
      setError(true);
      setFormState({ ...formState, sent: false });
    }
    setLoading(false);
  };

  const { name, email, message, sent } = formState;

  if (sent) {
    return (
      <div className="contact">
        Your message has been sent, thank you for contacting me!
      </div>
    );
  }

  return (
    <div className="contact">
      {/* <pre className="hidden">{JSON.stringify(process.env, undefined, 2)}</pre> */}
      {error && !loading && (
        <div className="error-text">
          There has been an error with sending your form, please try sending to{" "}
          <a className="mail-to" href="mailto:lawr">
            Example@gmail.com
          </a>
        </div>
      )}
      {!error && !loading && (
        <form
          className={`${error ? "error" : ""} contact-form`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-header">Contact Me</div>

          <div className="name-email">
            <div className="form-name">
              <input
                className={`name-email-input ${errors.name && "input-error"}`}
                type="text"
                placeholder="Name"
                {...register("name", { required: "Please enter your name" })}
              />
              {/* <div className="error error-name"> */}
              {errors.name && (
                <p className="error error-name">{errors.name.message}</p>
              )}
              {/* </div> */}
            </div>
            <div className="form-email">
              <input
                className={`name-email-input ${errors.email && "input-error"}`}
                type="text"
                placeholder="Email address"
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/i,
                    message: "Invalid email",
                  },
                  required: "Please enter your email address",
                })}
              />
              {/* <div > */}
              {errors.email && (
                <p className="error-email error">{errors.email.message}</p>
              )}
              {/* </div> */}
            </div>
          </div>
          <div className="message">
            <textarea
              className={`message-area ${errors.message && "input-error"}`}
              placeholder="Your message here"
              {...register("message", {
                required: "Please enter your message",
              })}
            />
            {/* <div className="error error-message"> */}
            {errors.message && (
              <p className="error error-message">{errors.message.message}</p>
            )}
            {/* </div> */}
          </div>
          <button className="send" type="submit">
            Send
          </button>
          <input type="hidden" name="form-name" value="name_of_my_form1" />
        </form>
      )}
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default Contact;
