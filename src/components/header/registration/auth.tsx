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

const Auth = () => {
  const { isOpen, isClosing, openModal, closeModal } = useModal();

  useBodyScrollLock(isOpen);

  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    formType: "registration",
  });

  const toggleFormType = () => {
    setFormData((prevData) => ({
      ...prevData,
      formType: prevData.formType === "registration" ? "login" : "registration",
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
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
        console.log("Данные успешно отправлены:", data);
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных:", error);
      });
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
              closeModal();
            }
          }}
        >
          <div className={`bg-white p-6 rounded-lg max-xs:w-full`}>
            <div className="flex justify-end">
              <X
                className="cursor-pointer text-labelCol hover:text-red-400 transition-colors duration-300"
                onClick={closeModal}
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
                      className="text-xs mb-1 text-labelCol"
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
                      required
                    />
                  </div>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 text-labelCol"
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
                      required
                    />
                  </div>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 text-labelCol"
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
                      required
                    />
                  </div>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 text-labelCol"
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
                      required
                    />
                  </div>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 text-labelCol"
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
                      required
                    />
                  </div>
                </>
              )}
              {formData.formType === "login" && (
                <>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 text-labelCol"
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
                      required
                    />
                  </div>
                  <div className="flex flex-col text-start">
                    <label
                      className="text-xs mb-1 text-labelCol"
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
                      required
                    />
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
