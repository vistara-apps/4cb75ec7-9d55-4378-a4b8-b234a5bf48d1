export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-4xl mx-auto p-4">
        <div className="h-8 bg-surface rounded-md w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-32 bg-surface rounded-lg"></div>
          <div className="h-32 bg-surface rounded-lg"></div>
          <div className="h-32 bg-surface rounded-lg"></div>
        </div>
        <div className="h-64 bg-surface rounded-lg"></div>
      </div>
    </div>
  );
}
