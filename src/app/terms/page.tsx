"use client";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: February 11, 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using SharpTech.ai and any applications built by SharpTech (&quot;Services&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our Services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            SharpTech.ai provides AI consulting, custom application development, and software-as-a-service products. Our applications include but are not limited to booking platforms, job search tools, and business utilities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>You are responsible for maintaining the security of your account credentials</li>
            <li>You must provide accurate information when creating an account</li>
            <li>You may not use another person&apos;s account without permission</li>
            <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Acceptable Use</h2>
          <p className="text-muted-foreground leading-relaxed">You agree not to:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
            <li>Use our Services for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the Services</li>
            <li>Upload malicious code or content</li>
            <li>Scrape or harvest data from our platforms without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Payments & Subscriptions</h2>
          <p className="text-muted-foreground leading-relaxed">
            Some Services require payment. Subscriptions are billed on a recurring basis and can be cancelled at any time. Refunds are handled on a case-by-case basis. Payment processing is handled securely through Stripe.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            All content, code, designs, and branding on SharpTech.ai and its applications are the property of SharpTech. You retain ownership of any content you submit through our platforms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            SharpTech.ai and its Services are provided &quot;as is&quot; without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of our Services. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Modifications</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update these terms at any time. Continued use of our Services after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            Either party may terminate this agreement at any time. Upon termination, your right to use the Services ceases immediately. We may retain your data as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about these terms? Email us at{" "}
            <a href="mailto:aaron.sharp2011@gmail.com" className="text-primary hover:underline">
              aaron.sharp2011@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
