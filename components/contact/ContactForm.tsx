import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/.netlify/functions/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(result.message || 'Thank you! We will be in touch soon.');
        setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Unable to submit form. Please contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-tn-black">
          First name *
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          value={formData.firstName}
          onChange={handleChange}
          className="py-3 px-4 block w-full border border-tn-gray shadow-sm rounded-md focus:ring-tn-teal focus:border-tn-teal"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-tn-black">
          Last name *
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          required
          value={formData.lastName}
          onChange={handleChange}
          className="py-3 px-4 block w-full border border-tn-gray shadow-sm rounded-md focus:ring-tn-teal focus:border-tn-teal"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="email" className="block text-sm font-medium text-tn-black">
          Email *
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="py-3 px-4 block w-full border border-tn-gray shadow-sm rounded-md focus:ring-tn-teal focus:border-tn-teal"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-tn-black">
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="py-3 px-4 block w-full border border-tn-gray shadow-sm rounded-md focus:ring-tn-teal focus:border-tn-teal"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="block text-sm font-medium text-tn-black">
          Message *
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          className="py-3 px-4 block w-full border border-tn-gray shadow-sm rounded-md focus:ring-tn-teal focus:border-tn-teal"
        />
      </div>

      {submitStatus !== 'idle' && (
        <div className={`sm:col-span-2 px-4 py-3 rounded ${
          submitStatus === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {statusMessage}
        </div>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-tn-teal hover:bg-tn-teal-dark'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tn-teal`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
