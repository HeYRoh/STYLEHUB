import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p>
              At StyleHub, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website or make a purchase.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              <strong>Personal Information:</strong> When you create an account,
              place an order, or contact us, we collect personal information
              such as your name, email address, phone number, shipping address,
              and payment details.
            </p>
            <p>
              <strong>Automatically Collected Information:</strong> We
              automatically collect certain information about your device,
              including your IP address, browser type, referring/exit pages, and
              operating system.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We may use the information we collect for various purposes,
              including:
            </p>
            <ul>
              <li>To process and fulfill your orders</li>
              <li>
                To communicate with you about your orders, products, and
                services
              </li>
              <li>To provide customer support</li>
              <li>To improve our website and services</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2>3. Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>
                Service providers who help us operate our business (payment
                processors, shipping companies, etc.)
              </li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>

            <h2>4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our website and hold certain information. You can instruct your
              browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your
              personal information. However, no method of transmission over the
              Internet or electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Data portability</li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at privacy@stylehub.in.
            </p>

            <p>Last updated: April 7, 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
