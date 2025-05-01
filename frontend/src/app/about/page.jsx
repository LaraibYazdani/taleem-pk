"use client";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-10 border border-blue-100">
        <h1 className="text-5xl font-extrabold mb-4 text-green-700 text-center drop-shadow-lg">About Taleem.pk</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          <span className="font-semibold text-blue-700">Taleem.pk</span> is your gateway to higher education in Pakistan. Our mission is to make university admissions transparent, accessible, and hassle-free for students, universities, and administrators alike.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-green-50 rounded-xl p-6 shadow hover:shadow-md transition flex flex-col items-center">
            <svg className="w-12 h-12 mb-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H6m6 0h6" /></svg>
            <h2 className="text-2xl font-bold mb-2 text-green-700">For Students</h2>
            <p className="text-gray-600 text-center">Easily discover, compare, and apply to top universities across Pakistan. Track your application status, receive real-time updates, and connect with institutions that match your aspirations.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-md transition flex flex-col items-center">
            <svg className="w-12 h-12 mb-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a5 5 0 00-2 4v5a2 2 0 002 2h10a2 2 0 002-2v-5a5 5 0 00-2-4z" /></svg>
            <h2 className="text-2xl font-bold mb-2 text-blue-700">For Universities</h2>
            <p className="text-gray-600 text-center">Showcase your programs, manage applications, and engage with prospective students. Our admin tools make it easy to streamline admissions and grow your academic community.</p>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 shadow flex flex-col items-center mb-8">
          <svg className="w-12 h-12 mb-4 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3m-8 9V3m0 0a9 9 0 0118 0v9a9 9 0 01-18 0z" /></svg>
          <h2 className="text-2xl font-bold mb-2 text-purple-700">Why Taleem.pk?</h2>
          <ul className="list-disc text-gray-700 text-left max-w-xl mx-auto">
            <li className="mb-2"><span className="font-semibold">Unified Platform:</span> One-stop solution for students, universities, and admins.</li>
            <li className="mb-2"><span className="font-semibold">Transparent Admissions:</span> Real-time application tracking and updates.</li>
            <li className="mb-2"><span className="font-semibold">Smart Matching:</span> Personalized university recommendations with Taleem Connect.</li>
            <li className="mb-2"><span className="font-semibold">Modern & Secure:</span> Built with the latest technologies and best security practices.</li>
            <li><span className="font-semibold">Community Driven:</span> Designed to empower the next generation of Pakistani students and educators.</li>
          </ul>
        </div>
        <div className="text-center mt-8">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold shadow">Empowering Education, Connecting Futures.</span>
        </div>
      </div>
    </div>
  );
}
