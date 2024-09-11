import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners'; // import a spinner component
import axios from 'axios';
import banner from '../Assets/proqc.png';

const Login = () => {
  const [companyCode, setCompanyCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [proqctoken, setProqctoken] = useState('');
  const [yearcode, setYearcode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!companyCode || !password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    setLoading(true);
    localStorage.clear();
    try {
      const response = await axios.post('https://api.optigoapps.com/ReactStore/ReactStore.aspx', {
        con: JSON.stringify({
          id: "",
          mode: "INITQC",
          appuserid: "kp23@gmail.com"
        }),
        p: "eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgw",
        dp: JSON.stringify({
          empbarcode: "",
          deviceid: "DeviceID_SMIT1",
          deviceName: "DeviceName_SMIT1",
          brand: "mybrand",
          model: "mymodel",
          manufacturer: "mymanufacturer",
          appver: "appver1",
          appvercode: "22",
          device_type: "android/ios",
          onesignal_uid: "abc123_onesignal_uid",
          companycode: companyCode,
          companypass: password
        })
      }, {
        headers: {
          Authorization: "proqc_json_api",
          Version: "qcv1",
          sp: "4",
          domain: "",
          sv: "2",
          "Content-Type": "application/json",
          Cookie: "ASP.NET_SessionId=z2cfg3oh2v5rydatgx43dqqb"
        }
      });

      if (response.data.Data.rd[0].stat === 1) {
        const yearcode = response.data.Data.rd[0].yearcode;
        const dbUniqueKey = response.data.Data.rd[0].dbUniqueKey;
        const UploadLogicalPathData = response.data.Data.rd[0].UploadLogicalPath;
        const ukeyData = response.data.Data.rd[0].ukey;
        localStorage.setItem('UploadLogicalPath', UploadLogicalPathData);
        localStorage.setItem('ukey', ukeyData);
        localStorage.setItem('yearcode', yearcode);
        localStorage.setItem('proqctoken', dbUniqueKey);

        setProqctoken(dbUniqueKey);
        setYearcode(yearcode);

        navigate('/empscan');
      } else {
        setErrorMessage('Invalid Company Code or Password. Please try again.');
      }

    } catch (error) {
      console.error("There was an error making the request!", error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const clearError = () => {
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  useEffect(() => {
    if (proqctoken && yearcode) {
      const fetchData = async () => {
        const headers = {
          Authorization: proqctoken,
          Yearcode: yearcode,
          Version: 'qcv1',
          sp: '4',
          domain: '',
          'Content-Type': 'application/json',
          Cookie: 'ASP.NET_SessionId=i4btgm10k555buulfvmqyeyc',
        };

        const data = {
          con: '{"id":"","mode":"GETMASTER","appuserid":"kp23@gmail.com"}',
          p: 'eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2dpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=',
          dp: '{"PackageId":"1","FrontEnd_RegNo":"80kgizbiduw5e7gg","Customerid":"10"}',
        };

        try {
          const response = await axios.post('https://api.optigoapps.com/ReactStore/ReactStore.aspx', data, { headers });
          const responseData = response.data.Data;

          localStorage.setItem('rd', JSON.stringify(responseData.rd));
          localStorage.setItem('rd1', JSON.stringify(responseData.rd1));
          localStorage.setItem('rd2', JSON.stringify(responseData.rd2));
          localStorage.setItem('rd3', JSON.stringify(responseData.rd3));
          localStorage.setItem('rd4', JSON.stringify(responseData.rd4));
          localStorage.setItem('rd5', JSON.stringify(responseData.rd5));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [proqctoken, yearcode]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-50 to-green-100 p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-xl shadow-2xl p-6">
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 h-60 md:h-auto">
          <img src={banner} alt="banner" className="object-contain w-full h-full md:h-auto md:rounded-none rounded-xl md:rounded-l-xl" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Welcome To ProQC</h2>

          <div className="h-7">
            {errorMessage && (
              <div className="mb-3 text-center text-red-600 rounded-lg">
                {errorMessage}
              </div>
            )}
          </div>

          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyCode">
              Company Code
            </label>
            <input
              id="companyCode"
              type="text"
              placeholder="Enter your company code"
              value={companyCode}
              onChange={(e) => { setCompanyCode(e.target.value); clearError(); }}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
            />
          </div>

          <div className="mb-6 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded-lg shadow-sm">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border-none outline-none rounded-l-lg"
              />
              <div
                className="px-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              onClick={handleLogin}
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none transition-transform transform hover:scale-105"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
