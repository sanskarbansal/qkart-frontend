import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    if (validateInput(formData) === false) {
      return false;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${config.endpoint}/auth/register`, {
        username: formData.username,
        password: formData.password,
      });
      if (response.status === 201) {
        enqueueSnackbar("Registered successfully", {
          variant: "success",
        });
      }
    } catch (error) {
      let message =
        "Something went wrong. Check that the backend is running, reachable and returns valid JSON.";

      if (error.response.status === 400) {
        message = error.response.data.message;
      }

      enqueueSnackbar(message, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    const { username, password, confirmPassword } = data;
    let message = "";
    if (!username) {
      message = "Username is a required field";
    } else if (username.length < 6) {
      message = "Username must be at least 6 characters";
    } else if (!password) {
      message = "Password is a required field";
    } else if (password.length < 6) {
      message = "Password must be at least 6 characters";
    } else if (confirmPassword !== password) {
      message = "Passwords do not match";
    }
    if (message.length !== 0) {
      enqueueSnackbar(message, {
        variant: "error",
      });
      return false;
    }
    return true;
  };

  const handleChange = (field) => {
    return function (event) {
      switch (field) {
        case "username":
          setUsername(event.target.value);
          break;
        case "password":
          setPassword(event.target.value);
          break;
        case "confirmPassword":
          setConfirmPassword(event.target.value);
          break;
        default:
          break;
      }
    };
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            onChange={handleChange("username")}
            value={username}
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            onChange={handleChange("password")}
            value={password}
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            onChange={handleChange("confirmPassword")}
            value={confirmPassword}
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
          />
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Button
              className="button"
              variant="contained"
              onClick={() => register({ username, password, confirmPassword })}
            >
              Register Now
            </Button>
          )}
          <p className="secondary-action">
            Already have an account?{" "}
            <a className="link" href="#">
              Login here
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
