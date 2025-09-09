import { InquiryForm } from '../../components/InquiryForm';
import { Suspense } from 'react';

function ContactFormPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <InquiryForm />
    </div>
  );
}


export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactFormPage />
    </Suspense>
  );
}
