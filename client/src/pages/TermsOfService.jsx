import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            1. Agreement to Terms
          </h2>
          <p className="mb-4">
            These Terms of Service constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity ("you")
            and Methsara Publications ("we," "us" or "our"), concerning your
            access to and use of our website. By accessing the site, you agree
            that you have read, understood, and agree to be bound by all of
            these Terms of Service.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            2. Intellectual Property Rights
          </h2>
          <p className="mb-4">
            Unless otherwise indicated, the Site is our proprietary property and
            all source code, databases, functionality, software, website
            designs, audio, video, text, photographs, and graphics on the Site
            (collectively, the "Content") and the trademarks, service marks, and
            logos contained therein (the "Marks") are owned or controlled by us
            or licensed to us, and are protected by copyright and trademark
            laws.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            3. User Representations
          </h2>
          <p className="mb-4">
            By using the Site, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              All registration information you submit will be true, accurate,
              current, and complete.
            </li>
            <li>
              You will maintain the accuracy of such information and promptly
              update such registration information as necessary.
            </li>
            <li>
              You have the legal capacity and you agree to comply with these
              Terms of Service.
            </li>
            <li>
              You will not access the Site through automated or non-human means,
              whether through a bot, script or otherwise.
            </li>
            <li>
              You will not use the Site for any illegal or unauthorized purpose.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            4. Products and Purchases
          </h2>
          <p className="mb-4">
            We make every effort to display as accurately as possible the
            colors, features, specifications, and details of the products
            available on the Site. However, we do not guarantee that the colors,
            features, specifications, and details of the products will be
            accurate, complete, reliable, current, or free of other errors, and
            your electronic display may not accurately reflect the actual colors
            and details of the products.
          </p>
          <p className="mb-4">
            All products are subject to availability, and we cannot guarantee
            that items will be in stock. We reserve the right to discontinue any
            products at any time for any reason. Prices for all products are
            subject to change.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            5. Contact Us
          </h2>
          <p className="mb-4">
            In order to resolve a complaint regarding the Site or to receive
            further information regarding use of the Site, please contact us at:
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

export default TermsOfService;
