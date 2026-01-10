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
  Star,
} from "lucide-react";
import { Button } from "../components/ui/Button";

const Home = () => {
  const categories = [
    {
      title: "Grade 6–8 Essential Books",
      description:
        "Science, Mathematics, History, Geography, Civics, Health & PE, and Buddhist Studies.",
      link: "/shop?category=Grade 6-8",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
      color: "bg-primary-50",
    },
    {
      title: "Grade 9–11 Comprehensive Guides",
      description:
        "Complete coverage of core and elective subjects with practical workbooks.",
      link: "/shop?category=Grade 9-11",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800",
      color: "bg-secondary-50",
    },
    {
      title: "Advanced Level Mastery",
      description:
        "Biology practicals, marking-scheme based questions, and revision guides.",
      link: "/shop?category=Advanced Level",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
      color: "bg-stone-50",
    },
  ];

  const featuredBooks = [
    {
      id: 1,
      title: "Science Part 1 (Grade 10)",
      price: "LKR 1,250",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      title: "Mathematics Part 1 (Grade 9)",
      price: "LKR 1,100",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 3,
      title: "A/L Biology - Unit Papers",
      price: "LKR 1,800",
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 4,
      title: "Civics Q&A (Grade 7)",
      price: "LKR 950",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const testimonials = [
    {
      name: "Saman Perera",
      role: "A/L Student",
      text: "The Biology practical guide was a lifesaver. Clear diagrams and exam-focused explanations.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Nimali Fernando",
      role: "Grade 9 Teacher",
      text: "I recommend Methsara books to all my students. The questions are perfectly aligned with the syllabus.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Kumara Sangakkara",
      role: "Parent",
      text: "Found exactly what my daughter needed for her O/Ls. Fast delivery and high print quality.",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-secondary-900 selection:bg-primary-200 selection:text-primary-900">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000"
            alt="Library Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary-900/60 mix-blend-multiply"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight tracking-tight">
            Explore your world <br />
            <span className="text-primary-400 italic">through books</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Methsara Publications provides trusted exam-focused textbooks and
            study guides for Grade 6 through Advanced Level.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/shop">
              <Button
                size="lg"
                className="rounded-full bg-primary-500 hover:bg-primary-600 text-white px-10 py-7 text-lg shadow-lg hover:shadow-primary-500/40 transition-all font-serif italic"
              >
                Browse Collection
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-white text-white hover:bg-white hover:text-secondary-900 px-10 py-7 text-lg backdrop-blur-sm transition-all"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories / Best Seller Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-secondary-900">
              Best Seller
            </h2>
            <Link to="/shop" className="hidden sm:block">
              <Button className="rounded-full bg-primary-500 hover:bg-primary-600 text-white px-6">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <div key={book.id} className="group cursor-pointer">
                <div className="bg-secondary-50 rounded-[2rem] p-6 mb-4 relative overflow-hidden aspect-[4/5] flex items-center justify-center transition-all duration-300 group-hover:bg-secondary-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-40 h-56 object-cover rounded shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-secondary-900 mb-1 leading-tight group-hover:text-primary-600 transition-colors">
                  {book.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-semibold text-secondary-800">
                    {book.price}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-secondary-500 font-medium">
                      {book.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section 1: "Many Online Book fair" -> What We Offer */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Left Image */}
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-primary-400 rounded-[3rem] transform -rotate-3 translate-x-2 translate-y-2"></div>
              <img
                src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=800"
                alt="Bookshelf"
                className="relative rounded-[3rem] shadow-xl w-full object-cover h-[500px] z-10"
              />
            </div>

            {/* Right Text */}
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-secondary-900 mb-6 leading-tight">
                Educational Books <br />
                <span className="text-primary-600 italic">
                  Curated for Excellence
                </span>
              </h2>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Our collection includes carefully selected textbooks, past
                papers, and revision guides designed to help students master
                their subjects. From Grade 6 basics to Advanced Level
                complexities, we have everything you need.
              </p>

              <div className="space-y-4 mb-8">
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center p-4 rounded-xl hover:bg-secondary-50 transition-colors border border-transparent hover:border-secondary-100 cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center mr-4 flex-shrink-0`}
                    >
                      <BookOpen className="w-5 h-5 text-secondary-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary-900">
                        {cat.title}
                      </h4>
                      <p className="text-sm text-secondary-500 line-clamp-1">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/shop">
                <Button className="rounded-full bg-primary-500 hover:bg-primary-600 text-white px-8 h-12">
                  Explore Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section / Download Now */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-secondary-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 right-10 w-64 h-64 bg-primary-500 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Start Your Journey to <br />
                <span className="italic text-primary-400">
                  Academic Success
                </span>
              </h2>
              <p className="text-secondary-300 text-lg mb-10">
                Join thousands of students who trust Methsara Publications for
                their exam preparation. Get 20% off your first bulk order for
                schools or tuition classes.
              </p>
              <Link to="/shop">
                <Button
                  size="lg"
                  className="rounded-full bg-primary-500 hover:bg-primary-600 text-white px-10 h-14 text-lg font-serif italic"
                >
                  Browse Store
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-secondary-900 mb-2">
            What did they say? 🤔
          </h2>
          <p className="text-secondary-500 mb-16">Stories from our community</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-secondary-100 shadow-soft hover:shadow-lg transition-all text-left"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-secondary-900">{t.name}</h4>
                    <span className="text-xs text-primary-600 font-bold uppercase tracking-wide">
                      {t.role}
                    </span>
                  </div>
                </div>
                <p className="text-secondary-600 italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
