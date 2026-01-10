import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Globe,
  School,
  Mail,
  Book,
} from "lucide-react";
import { Button } from "../components/ui/Button";

const Home = () => {
  const categories = [
    {
      title: "Grade 6–8 Essential Books",
      description:
        "Science, Mathematics, History, Geography, Civics, Health & PE, and Buddhist Studies—structured for foundational learning with exam-style questions.",
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      link: "/shop?category=Grade 6-8",
      color: "bg-blue-50 border-blue-100",
    },
    {
      title: "Grade 9–11 Comprehensive Guides",
      description:
        "Complete coverage of core and elective subjects with practical workbooks, question-and-answer series, and unit-wise exam papers.",
      icon: <School className="h-8 w-8 text-purple-600" />,
      link: "/shop?category=Grade 9-11",
      color: "bg-purple-50 border-purple-100",
    },
    {
      title: "Advanced Level Mastery",
      description:
        "Biology practicals, marking-scheme based questions, unit-wise past papers, and revision guides for A/L streams.",
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      link: "/shop?category=Advanced Level",
      color: "bg-green-50 border-green-100",
    },
  ];

  const reasons = [
    {
      title: "Exam-Ready Content",
      description:
        "Every book is crafted with national exam patterns in mind—no fluff, only what students need to succeed.",
      icon: <CheckCircle2 className="h-6 w-6 text-primary-600" />,
    },
    {
      title: "Written by Experienced Educators",
      description:
        "Subject specialists and practicing teachers ensure accuracy, clarity, and relevance to the current syllabus.",
      icon: <Users className="h-6 w-6 text-primary-600" />,
    },
    {
      title: "Structured for Mastery",
      description:
        "Progressive difficulty levels, clear explanations, and abundant practice questions build confidence step by step.",
      icon: <TrendingUp className="h-6 w-6 text-primary-600" />,
    },
    {
      title: "Affordable & Accessible",
      description:
        "Wide distribution across major bookstores and online platforms means you can always find the book you need.",
      icon: <Award className="h-6 w-6 text-primary-600" />,
    },
  ];

  const featuredBooks = [
    {
      id: 1,
      title: "Science Part 1",
      grade: "Grade 10",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
      color: "bg-blue-100",
    },
    {
      id: 2,
      title: "Mathematics Part 1",
      grade: "Grade 9",
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
      color: "bg-orange-100",
    },
    {
      id: 3,
      title: "Advanced Level Biology",
      grade: "Unit-wise Paper Solutions",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
      color: "bg-green-100",
    },
    {
      id: 4,
      title: "General Knowledge & Civics Q&A",
      grade: "Grade 7",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Trusted Educational Books <br className="hidden md:block" />
            <span className="text-primary-600">
              for Every Sri Lankan Student
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Methsara Publications delivers exam-focused textbooks, question
            banks, and study guides for Grade 6 through Advanced Level. Clear,
            practical, and aligned with the national curriculum.
          </p>

          <div className="flex justify-center">
            <Link to="/shop">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base shadow-lg hover:shadow-primary-500/25 transition-all"
              >
                Browse All Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${cat.color} bg-opacity-40`}
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {cat.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {cat.description}
                </p>
                <Link
                  to={cat.link}
                  className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800"
                >
                  Explore Books <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Titles
            </h2>
            <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                    {book.grade}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 mb-4 line-clamp-2 min-h-[3.5rem]">
                    {book.title}
                  </h3>
                  <Link to={`/books/${book.id}`}>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button className="rounded-full px-8 py-3">View All Books</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Methsara Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Students & Teachers Trust Methsara
            </h2>
            <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-6 text-primary-600">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Get Your Books Today
            </h2>
            <p className="text-slate-300 text-lg">
              Multiple ways to purchase Methsara Publications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Option 1 */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <Globe className="h-10 w-10 text-blue-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Online Bookstores</h3>
              <p className="text-slate-300 mb-0">
                Available on Grantha.lk and other leading online retailers with
                home delivery.
              </p>
            </div>

            {/* Option 2 */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <MapPin className="h-10 w-10 text-green-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Physical Bookstores</h3>
              <p className="text-slate-300 mb-0">
                Find Methsara titles at major bookshops across Sri Lanka.
              </p>
            </div>

            {/* Option 3 */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <School className="h-10 w-10 text-purple-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Bulk Orders</h3>
              <p className="text-slate-300 mb-0">
                Schools, tuition classes, and institutions can place bulk orders
                with special rates. Contact us for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-primary-100">
            <Mail className="h-12 w-12 text-primary-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated on New Releases
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Get notified when new titles and revised editions are released.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
              />
              <Button className="rounded-full px-8 py-4">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
