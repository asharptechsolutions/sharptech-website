"use client";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: February 11, 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">
            When you use SharpTech.ai, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
            <li><strong>Contact information</strong> — name, email address, and message content submitted through our contact form</li>
            <li><strong>Usage data</strong> — pages visited, time spent, browser type, and device information collected automatically</li>
            <li><strong>Account data</strong> — email and authentication details if you create an account on any SharpTech application</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>To respond to your inquiries and provide requested services</li>
            <li>To improve our website and applications</li>
            <li>To send relevant updates about our services (only if you opt in)</li>
            <li>To maintain the security and functionality of our platforms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Data Storage & Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your data is stored securely using Google Firebase infrastructure. We implement industry-standard security measures including encryption in transit and at rest. We do not sell, trade, or rent your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use the following third-party services that may process your data:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
            <li><strong>Google Firebase</strong> — authentication, database, and hosting</li>
            <li><strong>Stripe</strong> — payment processing (for paid applications)</li>
            <li><strong>Resend</strong> — transactional email delivery</li>
            <li><strong>GitHub Pages</strong> — static site hosting</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-2">
            Each service has its own privacy policy governing their use of your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use essential cookies for authentication and site functionality. We do not use advertising or tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">
            You have the right to access, update, or delete your personal data at any time. To exercise these rights, contact us at aaron.sharp2011@gmail.com.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this policy from time to time. Changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about this policy? Email us at{" "}
            <a href="mailto:aaron.sharp2011@gmail.com" className="text-primary hover:underline">
              aaron.sharp2011@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
