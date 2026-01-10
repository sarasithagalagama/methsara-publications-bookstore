import React from "react";
import {
  BookOpen,
  Target,
  Heart,
  Users,
  Award,
  TrendingUp,
  Shield,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";

const About = () => {
  const values = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Quality Education",
      description:
        "Every student deserves access to high-quality educational materials",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Student Success",
      description: "Helping students achieve their academic aspirations",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Passion for Teaching",
      description: "Created by educators passionate about accessible learning",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Focus",
      description:
        "Supporting Sri Lankan students with locally relevant content",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students Served" },
    { number: "50+", label: "Books Published" },
    { number: "9", label: "Years of Excellence" },
    { number: "100%", label: "Curriculum Aligned" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-16 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600">
            Empowering students through quality education since 2015
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Founded in 2015, Methsara Publications emerged from a simple
              vision: to make quality educational materials accessible to every
              Sri Lankan student. What started as a small initiative by a group
              of passionate educators has grown into a trusted name in
              educational publishing.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our journey began when we noticed a gap in the market for
              comprehensive, curriculum-aligned educational books that were both
              affordable and high-quality. We assembled a team of experienced
              teachers, subject specialists, and education experts who shared
              our vision of transforming education in Sri Lanka.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we're proud to serve over 10,000 students across the
              country, helping them excel in their O/L and A/L examinations. Our
              books are used in schools, tuition classes, and homes throughout
              Sri Lanka, making a real difference in students' academic
              journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
          </div>

          <Card className="bg-white shadow-sm border-gray-200">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We are committed to empowering students through comprehensive,
                curriculum-aligned educational materials. Our mission is to:
              </p>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    Provide{" "}
                    <strong className="text-gray-900">
                      accessible education
                    </strong>{" "}
                    for all Sri Lankan students, regardless of their economic
                    background
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    Deliver{" "}
                    <strong className="text-gray-900">
                      high-quality, curriculum-aligned content
                    </strong>{" "}
                    that simplifies complex concepts and enhances understanding
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    Support{" "}
                    <strong className="text-gray-900">
                      academic excellence
                    </strong>{" "}
                    by building confidence in students preparing for O/L and A/L
                    examinations
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    Continuously{" "}
                    <strong className="text-gray-900">
                      innovate and improve
                    </strong>{" "}
                    our publications based on student feedback and curriculum
                    changes
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-700">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
