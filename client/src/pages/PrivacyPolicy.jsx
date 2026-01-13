import React from "react";
import SEO from "../components/SEO";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Methsara Publications. Learn how we collect, use, and protect your information."
      />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <p className="mb-6">
            At Methsara Publications, accessible from our website, one of our
            main priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by Methsara Publications and how we use it.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Information We Collect
          </h2>
          <p className="mb-4">
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information.
          </p>
          <p className="mb-4">
            When you register for an Account, we may ask for your contact
            information, including items such as name, company name, address,
            email address, and telephone number.
          </p>
          <p className="mb-4">
            If you contact us directly, we may receive additional information
            about you such as your name, email address, phone number, the
            contents of the message and/or attachments you may send us, and any
            other information you may choose to provide.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Process your orders and manage shipping</li>
            <li>
              Communicate with you, either directly or through one of our
              partners, including for customer service, to provide you with
              updates and other information relating to the website, and for
              marketing and promotional purposes
            </li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Log Files
          </h2>
          <p className="mb-4">
            Methsara Publications follows a standard procedure of using log
            files. These files log visitors when they visit websites. All
            hosting companies do this and a part of hosting services' analytics.
            The information collected by log files include internet protocol
            (IP) addresses, browser type, Internet Service Provider (ISP), date
            and time stamp, referring/exit pages, and possibly the number of
            clicks. These are not linked to any information that is personally
            identifiable. The purpose of the information is for analyzing
            trends, administering the site, tracking users' movement on the
            website, and gathering demographic information.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl mt-6">
            <p className="font-semibold text-gray-900">Methsara Publications</p>
            <p>Kottawa, Sri Lanka</p>
            <p>Email: methsarabooks@gmail.com</p>
            <p>Phone: 071 432 5383 / 071 448 5899</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
