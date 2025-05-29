import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <h1 className="text-4xl font-bold mb-8">About StyleHub</h1>

          <div className="prose prose-lg max-w-none">
            <p>
              StyleHub is India's premier online fashion destination, offering a
              curated collection of clothing for men, women, and kids. Founded
              in 2023, we've quickly established ourselves as a trusted name in
              the Indian e-commerce fashion industry.
            </p>

            <h2>Our Mission</h2>
            <p>
              At StyleHub, our mission is to make quality fashion accessible to
              everyone across India. We believe that everyone deserves to look
              and feel their best, regardless of their budget or location. We're
              committed to providing a seamless shopping experience with a
              diverse range of products that cater to all tastes and
              preferences.
            </p>

            <h2>Our Values</h2>
            <ul>
              <li>
                <strong>Quality:</strong> We carefully select each item in our
                collection to ensure it meets our high standards.
              </li>
              <li>
                <strong>Affordability:</strong> We offer competitive pricing
                without compromising on quality.
              </li>
              <li>
                <strong>Inclusivity:</strong> Our collections cater to diverse
                body types, styles, and preferences.
              </li>
              <li>
                <strong>Sustainability:</strong> We're committed to reducing our
                environmental impact through responsible sourcing and packaging.
              </li>
              <li>
                <strong>Customer Satisfaction:</strong> We prioritize customer
                experience at every touchpoint.
              </li>
            </ul>

            <h2>Our Team</h2>
            <p>
              StyleHub is powered by a passionate team of fashion enthusiasts,
              tech experts, and customer service professionals. Our diverse team
              brings together expertise from various fields to create an
              exceptional shopping experience for our customers.
            </p>

            <h2>Our Journey</h2>
            <p>
              What started as a small online store has grown into one of India's
              most loved fashion destinations. Our journey has been marked by
              continuous innovation, customer-centric approaches, and a
              commitment to excellence.
            </p>

            <h2>Join Our Community</h2>
            <p>
              We invite you to be part of the StyleHub community. Follow us on
              social media for the latest trends, style tips, and exclusive
              offers. Your feedback helps us improve and grow, so don't hesitate
              to reach out to us with your thoughts and suggestions.
            </p>

            <p>
              Thank you for choosing StyleHub for your fashion needs. We look
              forward to being your trusted fashion partner for years to come.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
