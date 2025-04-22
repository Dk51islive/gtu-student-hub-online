
import PageTemplate from "@/components/layout/PageTemplate";
import { FileText } from "lucide-react";

const TermsOfService = () => {
  return (
    <PageTemplate 
      title="Terms of Service" 
      subtitle="Please read these terms carefully before using GTUinsta"
      icon={<FileText />}
    >
      <div className="prose max-w-none">
        <p className="text-gtu-gray-600">Last updated: April 22, 2025</p>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using GTUinsta, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">2. User Accounts</h2>
          <p className="mb-3">
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
          <p className="mb-3">
            You are responsible for safeguarding the password that you use to access the platform and for any activities or actions under your password. You agree not to disclose your password to any third party.
          </p>
          <p>
            You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">3. Intellectual Property</h2>
          <p className="mb-3">
            The platform and its original content, features, and functionality are and will remain the exclusive property of GTUinsta and its licensors. The platform is protected by copyright, trademark, and other laws.
          </p>
          <p className="mb-3">
            Our platform contains copyrighted material, trademarks, and other proprietary information, including but not limited to text, software, photos, and graphics. You may not modify, publish, transmit, distribute, perform, display, or sell any such proprietary information.
          </p>
          <p>
            All study materials downloaded from our platform are watermarked with your personal information for copyright protection. You agree not to remove, obscure, or alter such watermarks.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">4. User Content</h2>
          <p className="mb-3">
            By uploading content to our platform, you grant GTUinsta a non-exclusive, royalty-free, transferable, sublicensable, worldwide license to use, store, display, reproduce, and distribute your content on and through the platform.
          </p>
          <p className="mb-3">
            You represent and warrant that you own or have the necessary rights to all content you submit, and that such content does not violate the rights of any third party.
          </p>
          <p>
            GTUinsta reserves the right to remove any content that violates these Terms or is otherwise objectionable at our sole discretion.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Prohibited Uses</h2>
          <p className="mb-3">You agree not to use the platform:</p>
          <ul className="list-disc pl-6 mb-3">
            <li>In any way that violates applicable laws or regulations</li>
            <li>To impersonate or attempt to impersonate another person or entity</li>
            <li>To engage in any conduct that restricts or inhibits anyone's use of the platform</li>
            <li>To attempt to gain unauthorized access to protected areas of the platform</li>
            <li>To collect or harvest any information from other users without their consent</li>
            <li>To redistribute, share, or sell any downloaded materials</li>
            <li>To remove or circumvent any watermarks or copyright protection measures</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the platform will immediately cease.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Limitation of Liability</h2>
          <p>
            In no event shall GTUinsta, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the platform.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our platform after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@gtuinsta.com
          </p>
        </section>
      </div>
    </PageTemplate>
  );
};

export default TermsOfService;
