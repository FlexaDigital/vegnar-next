// components/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}>
      <div className="loader" />
      <style jsx>{`
        .loader {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #4caf50;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {transform: rotate(0deg);}
          100% {transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
