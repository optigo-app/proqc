import React, { useEffect, useRef, useState } from react;
import .Activate.css;
import optigoLogo from ....assetsoraillogo.png;
import BarcodeScannerComponent from react-qr-barcode-scanner;
import { toast } from react-toastify;
import QrScanner from qr-scanner;
import Sound from react-sound;
import { useNavigate } from react-router-dom;
import notiSound from ....soundTimeout.mpeg;
import QrFrame from '....assetsqr-frame.svg'
import axios from axios;
import { Base64 } from 'js-base64';

const Activate = () = {

  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResults, setScannedResults] = useState();
  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);
  const navigation = useNavigate();

   const APIURL=`httpzenapistore.aspx`;
  const APIURL=`httpsapi.optigoapps.comteststore.aspx`;

  const INITMFGAPI = async (decodedString) = {
    if (decodedString) {
      const bodyparam = {
        deviceID DeviceID_SMIT1,
        deviceName DeviceID_SMIT1,
        brand Brand1,
        model Model1,
        manufacturer manufacturer1,
        appver 125,
        appvercode 125,
        device_type Phone,
        onesignal_uid abc123_onesignal_uid
      };
  
      const encodedBodyParam = btoa(JSON.stringify(bodyparam));
      
      const body = {
        con {id,modeINITMFG,appuserid},
        p encodedBodyParam,
        f formname (album)
      };
  
      const headers = {
        Authorization `Bearer ${decodedString}`,
        Yearcode ,
        Version V4,
        sp 2,
        'Content-Type' 'applicationjson'  Ensure correct content type if needed
      };
  
      try {
        const response = await fetch(APIURL, {
          method 'POST',
          headers headers,
          body JSON.stringify(body)
        });
  
         Check if the response is okay (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status ${response.status}`);
        }
  
        const data = await response.json();
        console.log(initmfgRes, data);
  
        if (data) {
          sessionStorage.setItem(token,JSON.stringify(decodedString))
          localStorage.setItem(initmfg,JSON.stringify(data.Data.rd[0]))
          navigation(homeone);
        }
      } catch (error) {
        console.error(initmfgErr, error);
        toast.error(`error ${error.message}`);
      }
    }
  };
  

  const onScanSuccess = (result) = {
    const newData = result.data;
    if(newData){
      playAudio();
      const decodedString = Base64.decode(newData)
      setScannedResults(decodedString)

    }
  };

  const handleScanning = () ={
    INITMFGAPI(9726350724901930)
  }

  useEffect(()={
    if(scannedResults.length  0){
      INITMFGAPI(scannedResults);
       toast.success()
    }
  },[scannedResults])

  const onScanFail = (err) = {
    console.log(err);
  };

  const playAudio = () = {
    setPlayStatus(Sound.status.PLAYING);
    setTimeout(() = {
      setPlayStatus(Sound.status.STOPPED);
    }, 150);
  };

  useEffect(() = {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError onScanFail,
        preferredCamera environment,
        highlightScanRegion true,
        highlightCodeOutline true,
        overlay qrBoxEl.current  undefined,
      });

      scanner.current
        .start()
        .then(() = setQrOn(true))
        .catch((err) = {
          if (err) setQrOn(false);
        });
    }

    return () = {
      if (scanner.current) {
        scanner.current.stop();
      }
    };
  }, []);

  useEffect(() = {
    if (!qrOn)
      alert(
        Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.
      );
  }, [qrOn]);


  return (
    div className=backImg_container
      Sound
        url={notiSound}
        playStatus={playStatus}
        onFinishedPlaying={() = setPlayStatus(Sound.status.STOPPED)}
        volume={100}
      
      div className=main_container
        img src={optigoLogo} style={{ width 300px }} alt=Logo.. 
        h1 style={{ fontFamily sans-serif,padding0,margin0,marginTop12px}}Pro Castingh1
        {scannedResults.length  0 && h4 style={{ fontFamily sans-serif}}{`DeviceToken${scannedResults}`}h4}
        div className=scaneBoxMain
        video ref={videoEl} className=scanneBoxvideo
      div
        h3
          style={{
            fontFamily sans-serif,
            fontWeight 500,
            padding 0,
            margin 0,
          }}
        
          Get Connected by scanning QR Code in OptigoApps
        h3
        h3
          style={{ fontFamily sans-serif, padding 0, margin 0 }}
        {`(System Admin  My Device  Setup)`}h3


        {button className=Activate_btn onClick={handleScanning}Activatebutton}
      div
    div
  );
};

export default Activate;
