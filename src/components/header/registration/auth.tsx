import { useState, ChangeEvent, FormEvent } from "react";
import useModal from "../../../hooks/useModal";
import { User, X } from "lucide-react";
import useBodyScrollLock from "../../../hooks/useBodyScrollLock";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  formType: "registration" | "login";
}

interface LoginRequestData {
  email: string;
  password: string;
  formType: "login";
}

type FormErrors = {
  [key in keyof FormData]?: string;
};

const Auth = () => {
  const { isOpen, isClosing, openModal, closeModal } = useModal();
  useBodyScrollLock(isOpen);
  const handleCloseModal = () => {
    closeModal();
    setFormData((prevData) => ({
      ...prevData,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    }));
    setErrors({});
  };

  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    formType: "registration",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const toggleFormType = () => {
    setFormData((prevData) => ({
      ...prevData,
      formType: prevData.formType === "registration" ? "login" : "registration",
    }));
    setErrors({});
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (formData.formType === "registration") {
      if (!formData.firstname) newErrors.firstname = "Введите имя";
      if (!formData.lastname) newErrors.lastname = "Введите фамилию";
      if (!formData.email) newErrors.email = "Введите email";
      if (!formData.password) newErrors.password = "Введите пароль";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Пароли не совпадают";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Подтвердите пароль";
    } else {
      if (!formData.email) newErrors.email = "Введите email";
      if (!formData.password) newErrors.password = "Введите пароль";
    }
    return newErrors;
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let requestData: FormData | LoginRequestData;
    if (formData.formType === "registration") {
      requestData = formData;
    } else {
      requestData = {
        email: formData.email,
        password: formData.password,
        formType: "login",
      };
    }


    const endpoint =
      formData.formType === "registration"
        ? "https://jsonplaceholder.typicode.com/posts"
        : "https://jsonplaceholder.typicode.com/posts";

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        handleCloseModal()
        console.log("Данные успешно отправлены:", data);
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных:", error);
      });
  };

  const inputClassNames = (fieldName: keyof FormData) => {
    return `border p-2 ${
      errors[fieldName] ? "border-red-500" : "border-gray-300"
    }`;
  };

  return (
    <>
      <div
        onClick={openModal}
        className="flex justify-center items-center transition-all duration-300 rounded cursor-pointer w-10 h-10 hover:bg-slate-500"
      >
        <User color="white" size={30} />
      </div>
      {isOpen && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10 ${
            isClosing ? "animate-fade-out" : "animate-fade-in"
          }`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div className={`bg-white p-6 rounded-lg max-xs:w-full`}>
            <div className="flex justify-end">
              <X
                className="cursor-pointer text-labelCol hover:text-red-400 transition-colors duration-300"
                onClick={handleCloseModal}
                size={24}
              />
            </div>
            <form
              className="flex flex-col max-xs:w-full justify-start w-80"
              onSubmit={handleSubmit}
            >
              {formData.formType === "registration" && (
                <>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 mt-3 text-labelCol"
                      htmlFor="firstname"
                    >
                      Имя:
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className={inputClassNames("firstname")}
                    />
                    {errors.firstname && (
                      <span className="text-red-500 text-xs">
                        {errors.firstname}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 mt-3 text-labelCol"
                      htmlFor="lastname"
                    >
                      Фамилия:
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className={inputClassNames("lastname")}
                    />
                    {errors.lastname && (
                      <span className="text-red-500 text-xs">
                        {errors.lastname}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 mt-3 text-labelCol"
                      htmlFor="email"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClassNames("email")}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 mt-3 text-labelCol"
                      htmlFor="password"
                    >
                      Пароль:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={inputClassNames("password")}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-xs">
                        {errors.password}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 mt-3 text-labelCol"
                      htmlFor="confirmPassword"
                    >
                      Подтверждение пароля:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={inputClassNames("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-xs">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </>
              )}
              {formData.formType === "login" && (
                <>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 mt-3 text-labelCol"
                      htmlFor="email"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClassNames("email")}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 mt-3 text-labelCol"
                      htmlFor="password"
                    >
                      Пароль:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={inputClassNames("password")}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-xs">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </>
              )}
              <button className="buttonCurrent mt-3" type="submit">
                {formData.formType === "registration"
                  ? "Зарегистрироваться"
                  : "Войти"}
              </button>
              <button
                className="mt-3 buttonTab"
                type="button"
                onClick={toggleFormType}
              >
                <span>
                  {formData.formType === "registration"
                    ? "Войти"
                    : "Зарегистрироваться"}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
