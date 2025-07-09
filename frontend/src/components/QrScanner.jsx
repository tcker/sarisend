import { useEffect, useRef } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { X } from "lucide-react";

const QrScanner = ({ onScan, onClose }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  const stopScanner = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    codeReader.current?.reset();
  };

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
          (result) => {
            if (result) {
              const rawText = result.getText().trim();

              // If it starts with 0x and is at least 32 characters, treat it as an Aptos address
              if (/^0x[a-fA-F0-9]{32,}$/.test(rawText)) {
                stopScanner();
                onScan(rawText);
              } else {
                console.warn("Scanned QR is not a valid Aptos address:", rawText);
              }
            }
          }
        );
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
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

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 border-4 border-green-500 rounded-lg relative">
          <div className="absolute w-6 h-6 border-t-4 border-l-4 border-green-500 top-0 left-0" />
          <div className="absolute w-6 h-6 border-t-4 border-r-4 border-green-500 top-0 right-0" />
          <div className="absolute w-6 h-6 border-b-4 border-l-4 border-green-500 bottom-0 left-0" />
          <div className="absolute w-6 h-6 border-b-4 border-r-4 border-green-500 bottom-0 right-0" />
        </div>
      </div>

      <button
        onClick={() => {
          stopScanner();
          onClose();
        }}
        className="absolute top-4 right-4 z-50 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};

export default QrScanner;
