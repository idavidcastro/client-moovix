export default function LoadingSpinner({ size = "md" }) {
  const sizeClasses = {
    sm: "h-8 w-8 border-2",
    md: "h-12 w-12 border-t-2 border-b-2",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={`animate-spin rounded-full border-primary ${sizeClasses[size]}`}
      ></div>
    </div>
  );
}
