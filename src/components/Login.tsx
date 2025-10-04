import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import axios from "axios";
import { MessageModal } from "./SignUp";

export const Login = () => {
  const [modal, setModal] = useState({ message: "", type: "" });
  const closeMessage = () => setModal({ message: "", type: "" });

  const [otpState, setOtpState] = useState({
    currentOTP: null as string | null,
    expiryTime: null as number | null,
    OTP_LENGTH: 6,
    OTP_VALIDITY_SECONDS: 60,
  });

  const [inputOTP, setInputOTP] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function generateRandomOTP(length: number) {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }

  function sendOTP() {
    const otp = generateRandomOTP(otpState.OTP_LENGTH);
    const expiryTime = Date.now() + otpState.OTP_VALIDITY_SECONDS * 1000;
    setOtpState((prev) => ({
      ...prev,
      currentOTP: otp,
      expiryTime: expiryTime,
    }));
    setModal({ message: `your OTP is:  ${otp}.`, type: "success" });
  }

  function verifyOTP(inputOTP: string) {
    if (!otpState.expiryTime || Date.now() > otpState.expiryTime) {
      setModal({ message: "OTP expired", type: "error" });
      return false;
    } else if (inputOTP === otpState.currentOTP) {
      setModal({ message: "OTP verified successfully!", type: "success" });
      return true;
    } else {
      setModal({ message: "Invalid OTP. Please try again.", type: "error" });
      return false;
    }
  }
  const [countryCode, setCountryCode] = useState("");
  async function getCountryCode(countryName: string) {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      console.log(response.data[0].cca3);
      setCountryCode(
        response.data[0].idd?.root + response.data[0].idd?.suffixes[0]
      );
    } catch (error) {
      setModal({ message: "Please enter a valid/full country name", type: "error" });
    }
  }

  const [countryName, setCountryName] = useState("");

  const href = isAuthenticated ? "/ChatSection" : "/login";
  return (
    <div className="w-screen flex justify-center h-screen bg-gray-950">
      <div className=" bg-white/10 ease-in-out hover:scale-102 transition backdrop-blur-lg w-1/3 m-auto rounded-4xl">
        <div className="input flex flex-col gap-4  mx-auto p-10 rounded-lg">
          <h2 className="text-3xl font-bold text-white text-center">Login</h2>
          <MessageModal
            message={modal.message}
            type={modal.type}
            onClose={closeMessage}
          />
          <div className="flex flex-row gap-0">
            <input
              className=" p-3 w-3/4 bg-gray-100 text-black rounded-lg rounded-r-none"
              type="text"
              placeholder="Enter Your Country"
              onChange={(e) => setCountryName(e.target.value)}
              value={countryName}
            />
            <button
              type="button"
              className="flex rounded-lg h-12 items-center font-semibold justify-center border bg-green-400 text-white hover:border-black hover:bg-white hover:text-green-400 w-1/4 py-2.5 rounded-l-none"
              onClick={() => getCountryCode(countryName)}
            >
              Get Code
            </button>
          </div>
          <div className="flex flex-row gap-0">
            <input
              className=" p-3 mr-2 w-1/6 bg-gray-100 text-black rounded-lg"
              type="text"
              placeholder="Code"
              value={countryCode}
            />
            <input
              className=" p-3 w-3/4 bg-gray-100 text-black rounded-lg rounded-r-none"
              type="text"
              placeholder="Enter Your Number"
            />
            <button
              type="button"
              className="flex rounded-lg h-12 items-center justify-center border bg-green-400 text-white hover:border-black hover:bg-white hover:text-green-400 w-1/3 py-2.5 rounded-l-none"
              onClick={sendOTP}
            >
              <SendIcon />
            </button>
          </div>
          <div className="flex flex-row gap-0">
            <input
              className="p-3 w-3/4 bg-gray-100 text-black rounded-lg rounded-r-none"
              type="text"
              value={inputOTP}
              onChange={(e) => setInputOTP(e.target.value)}
              placeholder="Enter Your OTP"
            />
            <button
              type="button"
              className="flex rounded-lg h-12 items-center justify-center border bg-green-400 text-white hover:border-black hover:bg-white hover:text-green-400 w-1/4 py-2.5 rounded-l-none"
              onClick={() => setIsAuthenticated(verifyOTP(inputOTP))}
            >
              <TaskAltOutlinedIcon />
            </button>
          </div>

          <div className="flex flex-row px-10">
            <a
              className="flex rounded-lg h-9 align-middle justify-center border-1 bg-green-400 text-white hover:border-black hover:bg-white hover:text-black w-1/3 m-auto py-1"
              href={href}
            >
              Login
            </a>
            <a
              className="flex rounded-lg h-9 align-middle justify-center border-1 bg-green-400 text-white hover:border-black hover:bg-white hover:text-black w-1/3 m-auto py-1"
              href="/Signup"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
