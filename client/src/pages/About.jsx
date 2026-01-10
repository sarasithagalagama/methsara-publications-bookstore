import React from "react";
import {
  BookOpen,
  Target,
  Heart,
  Users,
  Award,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Baby,
  GraduationCap,
  School,
  CheckCircle2,
  FileText,
  Beaker,
  BookCopy,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";

const About = () => {
  const publications = [
    {
      title: "Question & Answer Series",
      description:
        "Comprehensive Q&A books covering all major subjects for Grades 6–11, with answers aligned to marking schemes.",
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      color: "bg-blue-50 border-blue-100",
    },
    {
      title: "Textbooks & Lesson Guides",
      description:
        "Subject-specific books that explain concepts clearly and follow the official curriculum structure.",
      icon: <BookCopy className="h-8 w-8 text-purple-600" />,
      color: "bg-purple-50 border-purple-100",
    },
    {
      title: "Practical Books",
      description:
        "A/L Biology practicals, science experiments, and hands-on workbooks for subjects that require practical understanding.",
      icon: <Beaker className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-100",
    },
    {
      title: "Past Paper Collections",
      description:
        "Unit-wise categorized exam papers with detailed solutions and model answers for Advanced Level students.",
      icon: <FileText className="h-8 w-8 text-orange-600" />,
      color: "bg-orange-50 border-orange-100",
    },
  ];

  const audience = [
    {
      title: "Students",
      description:
        "Seeking clear explanations, structured practice, and confidence for school and national exams",
      icon: <Baby className="h-6 w-6 text-primary-600" />,
    },
    {
      title: "Teachers & Tutors",
      description:
        "Looking for reliable supplementary material and well-organized question banks",
      icon: <GraduationCap className="h-6 w-6 text-primary-600" />,
    },
    {
      title: "Parents",
      description:
        "Wanting trusted resources to support their child's education at home",
      icon: <Heart className="h-6 w-6 text-primary-600" />,
    },
    {
      title: "Schools & Institutions",
      description:
        "Needing bulk study materials and comprehensive curriculum-aligned books",
      icon: <School className="h-6 w-6 text-primary-600" />,
    },
  ];

  const commitments = [
    {
      title: "Accuracy & Relevance",
      description:
        "Every book reflects the current syllabus and exam standards",
    },
    {
      title: "Clarity",
      description:
        "Simple explanations that make complex topics easier to understand",
    },
    {
      title: "Practical Value",
      description:
        "Exam-style questions and solutions that build real confidence",
    },
    {
      title: "Continuous Improvement",
      description:
        "Regular updates based on feedback from students, teachers, and educators",
    },
    {
      title: "Accessibility",
      description:
        "Affordable pricing and wide availability across bookstores and online platforms",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 border-b border-gray-100 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000"
            alt="Library Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary-900/60 mix-blend-multiply"></div>
        </div>

        {/* Background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            About{" "}
            <span className="text-primary-400 italic">
              Methsara Publications
            </span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Dedicated to creating high-quality learning materials for school and
            Advanced Level students.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-lg max-w-none text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Methsara Publications is an educational publishing house based in
              Sri Lanka, dedicated to creating high-quality learning materials
              for school and Advanced Level students. Since our inception, we
              have been committed to making exam preparation simpler, clearer,
              and more effective for every student.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that quality educational content should be accessible,
              affordable, and aligned with what students actually need to
              succeed in national exams. That's why every book we publish is
              carefully written, reviewed, and updated to reflect current
              syllabi and exam patterns.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-10 inline-flex items-center justify-center p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
            <Target className="w-6 h-6 text-primary-400 mr-2" />
            <span className="text-sm font-bold uppercase tracking-widest text-primary-200">
              Our Mission
            </span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-8 leading-tight">
            "To empower Sri Lankan students with reliable, exam-focused
            educational resources that build clarity, confidence, and real exam
            success—regardless of their background or learning environment."
          </h2>
        </div>
      </section>

      {/* What We Publish */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What We Publish
            </h2>
            <p className="text-lg text-gray-600">
              Specialized resources tailored for academic success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((pub, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row items-start p-8 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 ${pub.color}`}
              >
                <div className="flex-shrink-0 p-4 bg-white rounded-xl shadow-sm mb-4 sm:mb-0 sm:mr-6">
                  {pub.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {pub.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {pub.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Who We Serve
            </h2>
            <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audience.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-primary-100 hover:bg-primary-50/30 transition-all text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Commitment
            </h2>
            <p className="text-gray-400">
              The core values that define our publications
            </p>
          </div>

          <div className="space-y-6">
            {commitments.map((commit, index) => (
              <div
                key={index}
                className="flex items-start bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex-shrink-0 mt-1 mr-4">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {commit.title}
                  </h3>
                  <p className="text-gray-300">{commit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
            Contact Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 flex flex-col items-center">
              <MapPin className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">
                Kottawa, Colombo
                <br />
                Sri Lanka
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 flex flex-col items-center">
              <Phone className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+94 11 234 5678</p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 flex flex-col items-center">
              <Facebook className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Follow Us
              </h3>
              <p className="text-gray-600 font-medium">Methsara Books</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
