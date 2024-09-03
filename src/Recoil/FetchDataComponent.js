import axios from 'axios';
import { atom, useRecoilState } from 'recoil';
import { useEffect } from 'react';

// Recoil atoms
export const rdState = atom({
  key: 'rdState',
  default: [],
});

export const rd1State = atom({
  key: 'rd1State',
  default: [],
});

export const rd2State = atom({
  key: 'rd2State',
  default: [],
});

export const rd3State = atom({
  key: 'rd3State',
  default: [],
});

export const rd4State = atom({
  key: 'rd4State',
  default: [],
});
export const rd5State = atom({
  key: 'rd5State',
  default: [],
});

export const YearCodeState = atom({
  key: 'YearCodeState',
  default: '', // Initial state as a string for Yearcode
});

function FetchDataComponent() {
  const [rd, setRd] = useRecoilState(rdState);
  const [rd1, setRd1] = useRecoilState(rd1State);
  const [rd2, setRd2] = useRecoilState(rd2State);
  const [rd3, setRd3] = useRecoilState(rd3State);
  const [rd4, setRd4] = useRecoilState(rd4State);
  const [rd5, setRd5] = useRecoilState(rd5State);
  const [yearCode, setYearCode] = useRecoilState(YearCodeState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: 'Bearer 9065471700535651',
            Yearcode: '',
            Version: 'v1',
            sp: '4',
            domain: '',
            'Content-Type': 'application/json',
            Cookie: 'ASP.NET_SessionId=ro1minpbubgu5dw0tejcii4a',
          },
        };

        const data = {
          con: '{"id":"","mode":"INITQC","appuserid":"kp23@gmail.com"}',
          p: 'eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2dpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=',
          dp: '{"empbarcode":"","deviceid":"DeviceID_SMIT1","deviceName":"DeviceName_SMIT1","brand":"mybrand","model":"mymodel","manufacturer":"mymanufacturer","appver":"appver1", "appvercode":"22","device_type":"android/ios","onesignal_uid":"abc123_onesignal_uid"}',
        };

        const response = await axios.post('http://zen/api/ReactStore.aspx', data, config);
        const responseData = response.data.Data.rd[0].yearcode;
        setYearCode(responseData);
        localStorage.setItem('yearCode', responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setYearCode]);

  useEffect(() => {
    if (!yearCode) return; 

    const headers = {
      Authorization: 'Bearer 9065471700535651',
      Yearcode: yearCode,
      Version: 'v1',
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

    axios
      .post('http://zen/api/ReactStore.aspx', data, { headers })
      .then((response) => {
        const responseData = response.data.Data;

        setRd(responseData.rd);
        setRd1(responseData.rd1);
        setRd2(responseData.rd2);
        setRd3(responseData.rd3);
        setRd4(responseData.rd4);
        setRd5(responseData.rd5);

        localStorage.setItem('rd', JSON.stringify(responseData.rd));
        localStorage.setItem('rd1', JSON.stringify(responseData.rd1));
        localStorage.setItem('rd2', JSON.stringify(responseData.rd2));
        localStorage.setItem('rd3', JSON.stringify(responseData.rd3));
        localStorage.setItem('rd4', JSON.stringify(responseData.rd4));
        localStorage.setItem('rd5', JSON.stringify(responseData.rd5));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [yearCode, setRd, setRd1, setRd2, setRd3, ,setRd4,setRd5]);
}

export default FetchDataComponent;
