import { useEffect, useRef } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

const QrScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  useEffect(() => {
    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        codeReader.current = new BrowserQRCodeReader();
        codeReader.current.decodeFromVideoElementContinuously(
          videoRef.current,
          (result, error) => {
            if (result) {
              onScan(result.getText());
              stopScanner();
            }
          }
        );
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    const stopScanner = () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      codeReader.current?.reset();
    };

    startScanner();

    return () => stopScanner();
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
      />

      {/* FRAME OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 border-4 border-green-500 rounded-lg relative">
          <div className="absolute w-6 h-6 border-t-4 border-l-4 border-green-500 top-0 left-0"></div>
          <div className="absolute w-6 h-6 border-t-4 border-r-4 border-green-500 top-0 right-0"></div>
          <div className="absolute w-6 h-6 border-b-4 border-l-4 border-green-500 bottom-0 left-0"></div>
          <div className="absolute w-6 h-6 border-b-4 border-r-4 border-green-500 bottom-0 right-0"></div>
        </div>
      </div>
    </div>
  );
};

export default QrScanner;
