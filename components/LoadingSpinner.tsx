"use client"

export function LoadingSpinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
export function LoadingDiv() {
  return (
    <div className="relative w-full h-full flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
// backdrop-blur-sm

export function LoadingBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <div className="mt-6 p-4 rounded-lg animate-fade-in text-center bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent animate-progress-faster">
        {children}
      </div>
    </div>
  );
}

