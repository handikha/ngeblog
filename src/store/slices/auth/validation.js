import * as Yup from "yup";

// @define register validation schema
export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .min(6, "username must be at least 6 characters.")
    .max(20, "username must be less than 20 characters.")
    .required("username is required."),

  email: Yup.string().email("email must be a valid email."),

  phone: Yup.string().matches(/^[0-9]+$/, "phone must be numeric."),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[0-9]/, "Password must contain at least one digit.")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character."
    )
    .required("Password is required."),

  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "password must match."
  ),
});

// @login validation
export const loginValidationSchema = Yup.object({
  username: Yup.string().required("username is required."),
  password: Yup.string().required("password is required."),
});

export const forgotPasswordVaidationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email input"
    )
    .required("Email is required"),
});

export const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[0-9]/, "Password must contain at least one digit.")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character."
    )
    .required("Password is required."),

  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "password must match."
  ),
});

export const changePasswordValidationSchema = Yup.object({
  currentPassword: Yup.string().required("Password is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[0-9]/, "Password must contain at least one digit.")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character."
    )
    .required("Password is required."),

  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "password must match."
  ),
});

export const createNewArticleValidationSchema = Yup.object({
  title: Yup.string().required("Title is required."),

  CategoryId: Yup.string().required("Category is required"),

  content: Yup.string().required("Content is required"),

  country: Yup.string().required("Country is required."),

  keywords: Yup.string().required("Keyword is required"),
});

export const changeUsernameValidationSchema = Yup.object({
  username: Yup.string()
    .min(6, "Username must be at least 6 characters")
    .matches(
      /^[a-zA-Z0-9._-]+$/,
      "Username must be alphanumeric and symbols (.) (_) (-)"
    )
    .required("Username is required"),
});

export const changePhoneNumberValidationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 characters")
    .max(12, "Max phone number is 12 characters")
    .required("Phone number is required"),
});

export const changeEmailValidationSchema = Yup.object({
  currentEmail: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email input"
    )
    .required("Email is required"),

  newEmail: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email input"
    )
    .required("New email is required"),
});
