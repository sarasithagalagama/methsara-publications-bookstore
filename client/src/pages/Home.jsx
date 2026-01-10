import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  DollarSign,
  Award,
  ArrowRight,
  Truck,
  CreditCard,
  Shield,
  Star as StarIcon,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/Button";

const Home = () => {
  const features = [
    {
      icon: <Truck className="h-6 w-6 text-primary-600" />,
      title: "Island-wide Delivery",
      description: "Fast delivery to your doorstep anywhere in Sri Lanka",
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary-600" />,
      title: "Secure Payment",
      description: "100% secure payment with Cash on Delivery option",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary-600" />,
      title: "Quality Assured",
      description: "Curriculum-aligned books verified by experts",
    },
    {
      icon: <StarIcon className="h-6 w-6 text-primary-600" />,
      title: "Top Rated",
      description: "Trusted by thousands of students nationwide",
    },
  ];

  const categories = [
    {
      title: "Grade 6-11",
      description: "Essential O/L Guides",
      link: "/shop?category=Grade 6-11",
      color: "bg-blue-50 text-blue-900",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Advanced Level",
      description: "Complete A/L Syllabus",
      link: "/shop?category=Advanced Level",
      color: "bg-purple-50 text-purple-900",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Past Papers",
      description: "Exam Preparation",
      link: "/shop?category=Past Papers",
      color: "bg-green-50 text-green-900",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-10 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-100 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary-100 blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-primary-100 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="flex h-2 w-2 relative mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-gray-800">
                  New Study Guides Available for 2026
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Master Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  Exams Today
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Unlock your potential with Sri Lanka's most trusted educational
                resources. Comprehensive guides, past papers, and model
                questions crafted by expert educators.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/shop">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-14 px-8 text-base rounded-full shadow-lg hover:shadow-primary-500/30 transition-shadow"
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-14 px-8 text-base rounded-full border-gray-300 hover:bg-gray-50 bg-white"
                  >
                    Explore Catalog
                  </Button>
                </Link>
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start space-x-8 text-gray-500 text-sm font-medium">
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  <span>Verified Content</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  <span>Latest Syllabus</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative mx-auto lg:ml-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000"
                  alt="Student Studying"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="font-bold text-lg">Recommended by Teachers</p>
                    <p className="text-sm text-gray-200">
                      Used in 500+ Schools
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce duration-[3000ms]">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <StarIcon className="w-6 h-6 text-yellow-600 fill-yellow-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">4.9/5</p>
                  <p className="text-xs text-gray-500 font-medium">
                    Student Rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex-shrink-0 bg-primary-50 p-3 rounded-lg">
                  {feature.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Categories */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Find exactly what you need for your grade level and subject
                stream.
              </p>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              View All Categories <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.link}
                className="group relative block h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 bg-white/20 text-white backdrop-blur-md border border-white/20`}
                  >
                    Popular
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-gray-200 text-sm flex items-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {cat.description} <ArrowRight className="ml-2 w-4 h-4" />
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/shop">
              <Button variant="outline" className="w-full">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary-600 rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-600 rounded-full blur-3xl mix-blend-screen"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-16">
            Trusted by the Education Community
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { label: "Students", value: "50k+" },
              { label: "Book Titles", value: "1,200+" },
              { label: "Schools", value: "500+" },
              { label: "Years Active", value: "10+" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
