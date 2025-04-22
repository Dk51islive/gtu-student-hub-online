
import PageTemplate from "@/components/layout/PageTemplate";
import { Cookie } from "lucide-react";

const CookiePolicy = () => {
  return (
    <PageTemplate 
      title="Cookie Policy" 
      subtitle="How we use cookies and similar technologies on GTUinsta"
      icon={<Cookie />}
    >
      <div className="prose max-w-none">
        <p className="text-gtu-gray-600">Last updated: April 22, 2025</p>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site about your experience.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Cookies</h2>
          <p className="mb-3">GTUinsta uses cookies for various purposes, including:</p>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Authentication:</strong> We use cookies to identify you when you visit our platform and as you navigate through pages.</li>
            <li><strong>Status:</strong> We use cookies to determine if you are logged in to our platform.</li>
            <li><strong>Personalization:</strong> We use cookies to store information about your preferences and to personalize the platform for you.</li>
            <li><strong>Security:</strong> We use cookies as an element of the security measures used to protect user accounts and our platform in general.</li>
            <li><strong>Analysis:</strong> We use cookies to analyze the use and performance of our platform.</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">3. Types of Cookies We Use</h2>
          <h3 className="text-lg font-medium mt-4 mb-2">Essential Cookies</h3>
          <p className="mb-3">
            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Preference Cookies</h3>
          <p className="mb-3">
            These cookies enable the website to remember information that changes the way the website behaves or looks, like your preferred language or the region you are in.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Statistics Cookies</h3>
          <p className="mb-3">
            These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Marketing Cookies</h3>
          <p>
            These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the platform, deliver advertisements, and so on. These cookies may track your activities on other websites and build a profile of your interests.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Managing Cookies</h2>
          <p className="mb-3">
            Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser to browser, and from version to version. You can obtain up-to-date information about blocking and deleting cookies via these links:
          </p>
          <ul className="list-disc pl-6 mb-3">
            <li><a href="https://support.google.com/chrome/answer/95647" className="text-gtu-blue hover:underline">Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-gtu-blue hover:underline">Firefox</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-gtu-blue hover:underline">Microsoft Edge</a></li>
            <li><a href="https://support.apple.com/en-us/HT201265" className="text-gtu-blue hover:underline">Safari</a></li>
          </ul>
          <p className="mb-3">
            Please note that blocking all cookies will have a negative impact upon the usability of many websites. If you block cookies, you may not be able to use all the features on our platform.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Changes to Our Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page. You are advised to review this Cookie Policy periodically for any changes.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at privacy@gtuinsta.com
          </p>
        </section>
      </div>
    </PageTemplate>
  );
};

export default CookiePolicy;
