export function Progress({ value = 0, className = "" }: { value?: number; className?: string }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className="bg-indigo-500 h-2 rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
