import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

          <div className="prose prose-lg max-w-none">
            <p>
              Welcome to StyleHub. These terms and conditions outline the rules
              and regulations for the use of StyleHub's website.
            </p>

            <p>
              By accessing this website, we assume you accept these terms and
              conditions in full. Do not continue to use StyleHub's website if
              you do not accept all of the terms and conditions stated on this
              page.
            </p>

            <h2>1. Definitions</h2>
            <p>
              "Client", "You" and "Your" refers to you, the person accessing
              this website and accepting the Company's terms and conditions.
              <br />
              "The Company", "Ourselves", "We", "Our" and "Us", refers to
              StyleHub.
              <br />
              "Party", "Parties", or "Us", refers to both the Client and
              ourselves, or either the Client or ourselves.
            </p>

            <h2>2. Products</h2>
            <p>
              All products displayed on our website are subject to availability.
              We reserve the right to discontinue any product at any time. The
              images of the products on our website are for illustrative
              purposes only. The actual product may vary slightly from the image
              shown.
            </p>

            <h2>3. Pricing and Payment</h2>
            <p>
              All prices are in Indian Rupees (INR) and include GST where
              applicable. We reserve the right to change prices at any time
              without prior notice. Payment can be made using the methods
              specified on our website. All payments are processed securely.
            </p>

            <h2>4. Shipping and Delivery</h2>
            <p>
              We aim to deliver products within the timeframe specified at
              checkout. However, delivery times are estimates and not
              guaranteed. We are not responsible for delays in delivery caused
              by circumstances beyond our control.
            </p>

            <h2>5. Returns and Refunds</h2>
            <p>
              You may return products within 30 days of delivery for a full
              refund or exchange, provided the products are in their original
              condition. Certain products, such as personalized items, cannot be
              returned unless they are defective.
            </p>

            <h2>6. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate,
              complete, and up-to-date information. You are responsible for
              maintaining the confidentiality of your account and password.
            </p>

            <h2>7. Privacy Policy</h2>
            <p>
              Your use of our website is also governed by our Privacy Policy,
              which is incorporated into these terms and conditions by
              reference.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we will not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages, or any loss of profits or revenues.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Your
              continued use of the website after any changes indicates your
              acceptance of the modified terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the
              laws of India, and you submit to the non-exclusive jurisdiction of
              the courts located in Delhi for the resolution of any disputes.
            </p>

            <p>Last updated: April 7, 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
