import { useEffect, useRef } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';

const QrScanner = ({ onScan, onClose }) => {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  useEffect(() => {
    const startScanner = async () => {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const codeReader = new BrowserQRCodeReader();
      codeReaderRef.current = codeReader;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoElement.srcObject = stream;
        videoElement.setAttribute('playsinline', true);
        await videoElement.play();

        codeReader.decodeFromVideoElement(videoElement, (result, err) => {
          if (result) {
            onScan(result.getText());
            stopScanner();
          }
        });
      } catch (error) {
        console.error('Camera error:', error);
      }
    };

    const stopScanner = () => {
      const codeReader = codeReaderRef.current;
      if (codeReader) {
        codeReader.reset();
      }
      const videoElement = videoRef.current;
      if (videoElement?.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
  }, [onScan]);

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} />
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default QrScanner;
