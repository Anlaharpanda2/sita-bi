// Server Component
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-gradient-to-r from-red-900 to-red-700 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              ✨ Welcome to SITA-BI
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Your{' '}
              <span className="bg-gradient-to-r from-red-900 to-red-700 bg-clip-text text-transparent">
                Ultimate Solution
              </span>{' '}
              for Managing Thesis Projects
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Stay organized, stay on track, and achieve your academic goals
              with ease. Transform your thesis journey into a seamless
              experience.
            </p>
            <div className="flex flex-wrap gap-5">
              <a
                href="/login"
                className="bg-gradient-to-r from-red-900 to-red-800 text-white px-10 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Get Started
              </a>
              <a
                href="#tawarantopik"
                className="border-2 border-red-900 text-red-900 px-10 py-4 rounded-full font-semibold bg-white hover:bg-red-900 hover:text-white hover:-translate-y-1 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative p-5">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-yellow-600 rounded-3xl transform -rotate-6" />
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYB48qcI4RmLRUfQqoGwJb6GIM7SqYE9rcBg&s"
              alt="SITA-BI Illustration"
              width={512}
              height={512}
              priority
              className="relative w-full max-w-lg rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
