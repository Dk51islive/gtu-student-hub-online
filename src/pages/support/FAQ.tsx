
import PageTemplate from "@/components/layout/PageTemplate";
import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I create an account on GTUinsta?",
      answer: "To create an account, click on the 'Sign Up' button in the top-right corner of the homepage. Fill in your details including name, email, enrollment number, and create a password. Verify your email to activate your account."
    },
    {
      question: "How can I download study materials?",
      answer: "To download study materials, browse the Resources section, select the material you want, and click the download button. You need to be logged in to download resources. All downloads will have a watermark with your enrollment number for copyright protection."
    },
    {
      question: "Are the study materials free to access?",
      answer: "Yes, most study materials on GTUinsta are free to access for registered users. Some premium content may require a subscription or one-time payment."
    },
    {
      question: "How can I contribute my own study materials?",
      answer: "You can upload your own study materials by going to the Resources section and clicking on 'Upload Resource'. Complete the required details and upload your file. All uploads are reviewed before they are published."
    },
    {
      question: "Can I create and join study groups?",
      answer: "Yes, you can create or join study groups in the Community section. Groups allow you to collaborate with peers, share resources, and discuss course-related topics."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "If you come across any inappropriate content, please use the 'Report' button available on all posts and resources, or contact us directly via the Help Center."
    },
    {
      question: "Can I access GTUinsta on mobile devices?",
      answer: "Yes, GTUinsta is fully responsive and can be accessed on mobile phones, tablets, and desktop computers."
    }
  ];
  
  return (
    <PageTemplate 
      title="Frequently Asked Questions" 
      subtitle="Find answers to the most common questions about GTUinsta"
      icon={<HelpCircle />}
    >
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-gtu-gray-600">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </PageTemplate>
  );
};

export default FAQ;
