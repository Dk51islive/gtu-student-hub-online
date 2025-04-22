
import PageTemplate from "@/components/layout/PageTemplate";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <PageTemplate 
      title="Privacy Policy" 
      subtitle="Our commitment to protecting your privacy and personal data"
      icon={<Shield />}
    >
      <div className="prose max-w-none">
        <p className="text-gtu-gray-600">Last updated: April 22, 2025</p>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
          <p>
            Welcome to GTUinsta's Privacy Policy. This policy explains how we collect, use, disclose, and safeguard your information when you use our platform. We respect your privacy and are committed to protecting your personal data.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
          <p className="mb-3">We collect several types of information from and about users of our platform, including:</p>
          <ul className="list-disc pl-6 mb-3">
            <li>Personal identifiers (name, email address, phone number, enrollment number)</li>
            <li>Educational information (course, semester, university details)</li>
            <li>Usage data (how you interact with our platform)</li>
            <li>Device information (browser type, IP address, device type)</li>
            <li>User-generated content (uploads, comments, forum posts)</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
          <p className="mb-3">We use the information we collect for various purposes, including:</p>
          <ul className="list-disc pl-6 mb-3">
            <li>Providing and maintaining our platform</li>
            <li>Personalizing your experience</li>
            <li>Processing downloads and uploads</li>
            <li>Communicating with you</li>
            <li>Ensuring copyright protection through watermarking</li>
            <li>Improving our services</li>
            <li>Protecting against unauthorized access</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Watermarking of Resources</h2>
          <p className="mb-3">
            As part of our copyright protection measures, we add a watermark containing your enrollment number and phone number to all resources you download. This helps prevent unauthorized distribution of our content and protects the intellectual property of content creators.
          </p>
          <p>
            By using our platform, you agree to this watermarking process and understand that sharing watermarked materials may disclose your personal information to third parties.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Sharing Your Information</h2>
          <p className="mb-3">We may share your information with:</p>
          <ul className="list-disc pl-6 mb-3">
            <li>Service providers who perform services on our behalf</li>
            <li>Educational institutions for verification purposes</li>
            <li>Law enforcement when required by law</li>
            <li>Other users in community features (limited to your public profile)</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Your Privacy Rights</h2>
          <p className="mb-3">Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 mb-3">
            <li>Access to your personal data</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your data</li>
            <li>Objection to processing</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise these rights, please contact us at privacy@gtuinsta.com</p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2">
            privacy@gtuinsta.com<br />
            GTUinsta Privacy Team<br />
            Gujarat, India
          </p>
        </section>
      </div>
    </PageTemplate>
  );
};

export default PrivacyPolicy;
