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
  Star,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

const Home = () => {
  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Island-wide Delivery",
      description: "Fast and reliable shipping across Sri Lanka",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Secure Payment",
      description: "Safe and verified payment process",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Assured",
      description: "Curriculum-aligned educational materials",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Expert Authors",
      description: "Written by experienced educators",
    },
  ];

  const categories = [
    {
      title: "Grade 6-11 Books",
      description: "O/L Preparation Materials",
      link: "/shop?category=Grade 6-11",
      badge: "#BestSeller",
    },
    {
      title: "Advanced Level Books",
      description: "A/L Examination Guides",
      link: "/shop?category=Advanced Level",
      badge: "#Trending",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="flex gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  #BestSeller
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                  #Trending
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Empowering Sri Lankan Students
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Quality educational books for Grades 6-13, crafted by expert
                educators. Comprehensive syllabus coverage aligned with Sri
                Lankan curriculum.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-gray-300 text-gray-900 hover:bg-gray-50"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Book Display */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 lg:p-12 shadow-xl">
                {/* Decorative circles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute top-10 left-10 w-32 h-32 border-2 border-gray-300 rounded-full opacity-30"></div>
                  <div className="absolute top-20 left-20 w-48 h-48 border-2 border-gray-300 rounded-full opacity-20"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-gray-300 rounded-full opacity-25"></div>
                </div>

                {/* Book placeholder */}
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                  <div className="aspect-[3/4] flex items-center justify-center">
                    <div className="text-center">
                      <BookOpen className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Mathematics
                      </h3>
                      <p className="text-gray-600 mb-1">Grade 10</p>
                      <p className="text-sm text-gray-500">
                        Comprehensive Guide
                      </p>
                      <div className="mt-6">
                        <span className="text-3xl font-bold text-gray-900">
                          Rs. 750
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect books for your academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Link key={index} to={category.link} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-gray-200">
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        {category.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>

                    <p className="text-gray-600 mb-6">{category.description}</p>

                    <div className="flex items-center text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                      Explore Now
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Methsara Publications?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by over 10,000 students across Sri Lanka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Authors
              </h3>
              <p className="text-gray-600">
                Written by experienced teachers and subject specialists
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Complete Coverage
              </h3>
              <p className="text-gray-600">
                Full syllabus coverage aligned with curriculum
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Affordable Pricing
              </h3>
              <p className="text-gray-600">
                Quality materials at student-friendly prices
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Trusted Brand
              </h3>
              <p className="text-gray-600">
                Serving students since 2015 with excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Excel in Your Studies?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of successful students who trust Methsara
            Publications
          </p>
          <Link to="/shop">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
