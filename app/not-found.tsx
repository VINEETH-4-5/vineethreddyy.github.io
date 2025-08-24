export default function NotFound() {
    return (
      <main className="min-h-[60vh] grid place-items-center p-8 text-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Page not found</h1>
          <p className="text-foreground/70 mb-6">Let’s get you back to safety.</p>
          <a href="/" className="px-4 py-2 rounded-lg bg-primary-500 text-white">Go home</a>
        </div>
      </main>
    )
  }
  