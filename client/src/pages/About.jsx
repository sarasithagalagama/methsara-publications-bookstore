import React from 'react';
import { BookOpen, Target, Heart, Users } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";

const About = () => {
  const values = [
    {
      icon: <BookOpen className="h-10 w-10 text-primary-600" />,
      title: "Quality Education",
      description:
        "We believe every student deserves access to high-quality educational materials",
    },
    {
      icon: <Target className="h-10 w-10 text-primary-600" />,
      title: "Student Success",
      description:
        "Our primary goal is to help students achieve their academic aspirations",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary-600" />,
      title: "Passion for Teaching",
      description:
        "Created by educators who are passionate about making learning accessible",
    },
    {
      icon: <Users className="h-10 w-10 text-primary-600" />,
      title: "Community Focus",
      description:
        "Supporting the Sri Lankan student community with locally relevant content",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Empowering students through quality education since 2015
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
          </div>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We are committed to empowering students through comprehensive,
                curriculum-aligned educational materials. Our mission is to:
              </p>

              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    Provide <strong>accessible education</strong> for all Sri
                    Lankan students, regardless of their economic background
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    Deliver{" "}
                    <strong>high-quality, curriculum-aligned content</strong>{" "}
                    that simplifies complex concepts and enhances understanding
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    Support <strong>academic excellence</strong> by building
                    confidence in students preparing for O/L and A/L
                    examinations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    Continuously <strong>innovate and improve</strong> our
                    publications based on student feedback and curriculum
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-xl text-primary-100">Students Served</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl text-primary-100">Books Published</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">9 Years</div>
              <div className="text-xl text-primary-100">Of Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

