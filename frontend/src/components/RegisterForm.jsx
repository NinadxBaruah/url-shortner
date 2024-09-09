import React from 'react'

export const RegisterForm = ({formData , handleInputChange ,usernameStatus,setUsernameStatus , onHandleSubmit}) => {
  return (
    <form className="flex flex-col gap-4" onSubmit={onHandleSubmit}>
        <label htmlFor="username" className="text-base font-semibold">
          Username:
        </label>
        {usernameStatus == null ? (
          ""
        ) : usernameStatus == false ? (
          <sup className="text-red-600" id="userNameSup">Not Unique</sup>
        ) : usernameStatus == true ? (
          <sup className="text-green-600" id="userNameSup">Unique</sup>
        ) : (
          ""
        )}
        <input
          type="text"
          id="username"
          name="username"
          className="border border-gray-300 rounded p-2"
          placeholder="Enter your username"
          required
          value={formData.username}
          onChange={handleInputChange}
        />

        <label htmlFor="firstName" className="text-base font-semibold">
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="border border-gray-300 rounded p-2"
          placeholder="Enter your first name"
          required
          value={formData.firstName}
          onChange={handleInputChange}
        />

        <label htmlFor="lastName" className="text-base font-semibold">
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="border border-gray-300 rounded p-2"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleInputChange}
        />

        <label htmlFor="email" className="text-base font-semibold">
          Email Address:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border border-gray-300 rounded p-2"
          placeholder="Enter your email address"
          required
          value={formData.email}
          onChange={handleInputChange}
        />

        <label htmlFor="password" className="text-base font-semibold">
          Password:
        </label>

        <input
          type="password"
          id="password"
          name="password"
          className="border border-gray-300 rounded p-2"
          placeholder="Enter your password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />

        <label htmlFor="confirmPassword" className="text-base font-semibold">
          Confirm Password:
        </label>
        {formData.password == "" ? (
          ""
        ) : formData.password == formData.confirmPassword ? (
          ""
        ) : formData.password != formData.confirmPassword ? (
          <sup className="text-red-500">password did not matched</sup>
        ) : (
          ""
        )}

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="border border-gray-300 rounded p-2"
          placeholder="Confirm your password"
          required
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
          disabled={
            formData.password === formData.confirmPassword ? false : true
          }
        >
          Register
        </button>
      </form>
  )
}
