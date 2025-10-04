import React, { useState, useCallback, useMemo } from "react";
import SendIcon from "@mui/icons-material/Send";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import toast from "react-hot-toast";

const MessageModal = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div
      className={`p-4 mb-4 rounded-lg flex justify-between items-center ${bgColor} text-white font-semibold shadow-lg`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-white/20 transition"
      >
        <CloseIcon style={{ fontSize: "18px" }} />
      </button>
    </div>
  );
};

export const Signup = () => {
  const [modal, setModal] = useState({ message: "", type: "" });
  const [otpState] = useState({
    currentOTP: null as string | null,
    expiryTime: null as number | null,
    OTP_LENGTH: 6,
    OTP_VALIDITY_SECONDS: 60,
  });

  const [name, setName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [inputOTP, setInputOTP] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const closeMessage = () => setModal({ message: "", type: "" });

  const getCountryCode = useCallback(async (country) => {
    if (!country.trim()) {
      setModal({ message: "Please enter a country name.", type: "error" });
      return;
    }
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${country.trim()}?fullText=true`
      );

      const data = response.data[0];
      const root = data.idd?.root || "";
      const suffix = data.idd?.suffixes?.[0] || "";

      const code = `${root}${suffix}`;

      if (code) {
        setCountryCode(code);
        setModal({ message: `Country code set to ${code}.`, type: "success" });
      } else {
        setCountryCode("");
        setModal({
          message: "Could not find dialing code for that country.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching country code:", error);
      setCountryCode("");
      setModal({
        message:
          "Could not find that country or get its dialing code. Please enter the full name.",
        type: "error",
      });
    }
  }, []);

  const generateRandomOTP = (length) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  };

  const sendOTP = useCallback(() => {
    if (
      !phoneNumber.trim() ||
      !name.trim() ||
      !countryCode.trim() ||
      countryCode === "Loading..."
    ) {
      setModal({
        message:
          "Please enter your Name, Phone Number, and ensure the country code is set.",
        type: "error",
      });
      return;
    }

    const otp = generateRandomOTP(otpState.OTP_LENGTH);
    const expiryTime = Date.now() + otpState.OTP_VALIDITY_SECONDS * 1000;

    otpState.currentOTP = otp;
    otpState.expiryTime = expiryTime;

    console.log(
      `[SIMULATED OTP] for ${name} (${countryCode}${phoneNumber}): ${otp}`
    );
    setModal({
      message: `Your OTP is: ${otp}. It expires in ${otpState.OTP_VALIDITY_SECONDS} seconds.`,
      type: "success",
    });
  }, [name, phoneNumber, countryCode, otpState]);

  const handleSignup = useCallback(() => {
    if (!otpState.currentOTP) {
      setModal({ message: "Please request an OTP first.", type: "error" });
      return;
    }

    if (!otpState.expiryTime || Date.now() > otpState.expiryTime) {
      setModal({ message: "OTP expired. Please resend.", type: "error" });
      otpState.currentOTP = null;
      setIsRegistered(false);
      return;
    } else if (inputOTP === otpState.currentOTP) {
      setModal({
        message: `Registration successful! Welcome, ${name}.`,
        type: "success",
      });
      setIsRegistered(true);
      otpState.currentOTP = null;
    } else {
      setModal({ message: "Invalid OTP. Please try again.", type: "error" });
      setIsRegistered(false);
    }
  }, [inputOTP, name, otpState]);

  const href = isRegistered ? "/ChatSection" : "/Signup";

  return (
    <div className="w-screen flex justify-center h-screen bg-gray-950 font-inter">
      <div className="bg-white/10 ease-in-out hover:scale-[1.02] transition backdrop-blur-lg w-full max-w-lg m-auto rounded-[30px] p-6 sm:p-10 shadow-2xl">
        <div className="input flex flex-col gap-5 mx-auto rounded-lg">
          <h2 className="text-4xl font-extrabold text-white text-center tracking-wide">
            Sign Up
          </h2>

          <MessageModal
            message={modal.message}
            type={modal.type}
            onClose={closeMessage}
          />

          <input
            className="p-4 w-full bg-gray-100 text-black rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            type="text"
            placeholder="Enter Your Full Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <div className="flex flex-row gap-0">
            <input
              className="p-4 w-3/4 bg-gray-100 text-black rounded-l-xl focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              type="text"
              placeholder="Enter Country Name (e.g., India)"
              onChange={(e) => setCountryName(e.target.value)}
              value={countryName}
            />
            <button
              type="button"
              className="flex rounded-r-xl h-auto items-center justify-center border border-green-400 bg-green-500 text-white font-semibold hover:bg-green-600 w-1/4 py-2.5 transition duration-200 shadow-md"
              onClick={() => getCountryCode(countryName)}
            >
              Get Code
            </button>
          </div>

          <div className="flex flex-row gap-0">
            <input
              className="p-4 w-1/4 bg-gray-100 text-black rounded-l-xl mr-0 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              type="text"
              placeholder="Code"
              value={countryCode}
              readOnly
            />
            <input
              className="p-4 w-2/4 bg-gray-100 text-black mr-0 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              type="tel"
              placeholder="Enter Your Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
            <button
              type="button"
              className="flex rounded-r-xl h-auto items-center justify-center border border-green-400 bg-green-500 text-white font-semibold hover:bg-green-600 w-1/4 py-2.5 transition duration-200 shadow-md"
              onClick={sendOTP}
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-row gap-0">
            <input
              className="p-4 w-3/4 bg-gray-100 text-black rounded-l-xl mr-0 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              type="text"
              value={inputOTP}
              onChange={(e) => setInputOTP(e.target.value)}
              placeholder="Enter The OTP"
              maxLength={otpState.OTP_LENGTH}
            />
            <button
              type="button"
              className="flex rounded-r-xl h-auto items-center justify-center border border-green-400 bg-green-500 text-white font-semibold hover:bg-green-600 w-1/4 py-2.5 transition duration-200 shadow-md"
              onClick={handleSignup}
            >
              <TaskAltOutlinedIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-row pt-5 gap-4">
            <a
              className="flex flex-1 rounded-xl h-10 items-center justify-center font-semibold bg-indigo-500 text-white hover:bg-indigo-600 transition shadow-md"
              href={href}
            >
              {isRegistered ? "Continue to Chat" : "Sign Up"}
            </a>
            <a
              className="flex flex-1 rounded-xl h-10 items-center justify-center font-semibold border border-indigo-500 bg-white text-indigo-500 hover:bg-indigo-50 transition shadow-md"
              href="/login"
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
export {MessageModal};
