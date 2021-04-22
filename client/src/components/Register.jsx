import React from "react";

const Register = ({
  secureEntry,
  setSecureEntry,
  loading,
  handleChange,
  formData,
  error,
  disabledButton,
  loginOrResetPassword,
}) => {
  return (
    <div className="w-full max-w-md">
      <form className="bg-white shadow-md rounded px-8 py-10 mb-4">
        <h1 className="font-bold text-lg text-center">Welcome to BezoMoney</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            {`Phone Number`}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            type="number"
            placeholder="0222442455"
            onChange={(e) => {
              e.persist();
              handleChange(e);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            {`Password`}
          </label>
          <div className={`flex items-center border  rounded shadow pr-3 `}>
            <input
              className={`appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              name="password"
              value={formData.password}
              type={secureEntry ? "password" : "text"}
              placeholder="*********"
              onChange={(e) => {
                e.persist();
                handleChange(e);
              }}
            />
            <button
              className="focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                setSecureEntry((data) => !data);
              }}
            >
              <p
                className={`text-right text-xs ${
                  secureEntry ? "text-red-500" : "text-blue-500"
                }`}
              >
                {secureEntry ? "Show" : "Hide"}
              </p>
            </button>
          </div>
          {/* {!formData.password && (
            <p className="text-red-500 text-xs italic">
              Please choose a password
            </p>
          )} */}
        </div>
        {error.status && (
          <p className="text-red-500 text-xs italic text-center">
            {error.error}
          </p>
        )}
        <div className="flex items-center justify-between">
          <button
            disabled={disabledButton}
            className={`  ${
              disabledButton ? "bg-gray-200" : "bg-blue-600 hover:bg-blue-700"
            }  text-white font-thin w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="button"
            onClick={loginOrResetPassword}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
      <p className="text-center text-white text-xs">
        &copy;2021 Castro Agbo. All rights reserved.
      </p>
    </div>
  );
};

export default Register;
