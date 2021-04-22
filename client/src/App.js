import React from "react";
import Register from "./components/Register";
import Alert from "./components/Alert";

const initialState = {
  phoneNumber: "",
  password: "",
};

function App() {
  const [formData, setFormData] = React.useState(initialState);
  const [error, setError] = React.useState({
    status: false,
    error: "",
  });

  const [registerMessage, setRegisterMessage] = React.useState({
    show: false,
    status: false,
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [secureEntry, setSecureEntry] = React.useState(true);
  const [disabledButton, setDisabledButton] = React.useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const validateFields = ({ phoneNumber, password }) => {
    setError({
      status: false,
      error: "",
    });

    if (!phoneNumber || !password)
      return setError({
        status: true,
        error: "Phone number or passowrd empty",
      });

    if (phoneNumber.length < 10)
      return setError({
        status: true,
        error: "Phone number is too short",
      });
    if (password.length < 6)
      return setError({
        status: true,
        error: "Password is too short",
      });
  };

  const handleDisableButton = (formData, error) => {
    Object.values(formData).map((fdata) => {
      if (!fdata) setDisabledButton(true);
      else setDisabledButton(false);
      return null;
    });

    Object.values(error).map((fdata) => {
      if (fdata === false || fdata === "") setDisabledButton(false);
      else setDisabledButton(true);
      return null;
    });
  };

  const loginUserIn = async (formData) => {
    try {
      const uri = "http://localhost:5000/api/register/";
      const res = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  const loginOrResetPassword = async (e) => {
    try {
      setRegisterMessage({
        show: false,
        status: false,
        message: "",
      });

      e.preventDefault();
      const res = await loginUserIn(formData);
      setRegisterMessage((data) => ({
        show: true,
        ...res,
      }));
      setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    validateFields(formData);
    return () => {};
  }, [formData]);

  React.useEffect(() => {
    handleDisableButton(formData, error);
    return () => {};
  }, [formData, error]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-r from-green-400 to-blue-500">
      {registerMessage.show && (
        <Alert
          registerMessage={registerMessage}
          setRegisterMessage={setRegisterMessage}
        />
      )}

      <div className="flex flex-col justify-center items-center w-full">
        <Register
          setError={setError}
          error={error}
          secureEntry={secureEntry}
          setSecureEntry={setSecureEntry}
          setLoading={setLoading}
          loading={loading}
          handleChange={handleChange}
          formData={formData}
          validateFields={validateFields}
          disabledButton={disabledButton}
          loginOrResetPassword={loginOrResetPassword}
        />
      </div>
    </div>
  );
}

export default App;
