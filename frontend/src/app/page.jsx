"use client";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow-md">
        <div className="text-2xl font-bold">Taleem.pk</div>
        <div className="space-x-6 hidden md:flex">
          <a href="#about" className="hover:underline">About</a>
          <a href="#admissions" className="hover:underline">Admissions</a>
          <a href="/universities" className="text-gray-700 hover:text-black">Browse Universities</a>
          <a href="#academics" className="hover:underline">Academics</a>
          <a href="#student-life" className="hover:underline">Student Life</a>

          {/* New Buttons */}
          <div className="flex space-x-4 ml-6">
            <a href="/login" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-semibold">
              Login
            </a>
            <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold">
              Register
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center h-[500px] px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Taleem.pk</h1>
          <p className="text-lg mb-8 max-w-2xl">
            Your Gateway to University Admissions Across Pakistan.
          </p>
          <a href="/login" className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 font-semibold">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white" id="about">
        <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Apply to Top Universities</h3>
            <p>Explore and apply to multiple universities with a single platform.</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Track Application Progress</h3>
            <p>Track your admission status and communication easily in your dashboard.</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Secure & Verified</h3>
            <p>All applications are securely stored and only visible to approved universities.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-center text-center bg-green-600 text-white py-20 px-4" id="admissions">
        <h2 className="text-4xl font-bold mb-4">Ready to start your journey?</h2>
        <p className="text-lg mb-8 max-w-2xl">
          Join Taleem.pk today and simplify your admission process to top universities.
        </p>
        <a href="/register" className="bg-white text-green-600 px-6 py-3 rounded-md hover:bg-gray-200 font-semibold">
          Register Now
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-6 text-center mt-auto">
        <p>© {new Date().getFullYear()} Taleem.pk. All rights reserved.</p>
      </footer>

    </div>
  );
}
