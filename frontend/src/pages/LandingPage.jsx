import React, { useState } from 'react';
import { MessageSquare, Zap, Code, BarChart, CheckCircle2, ChevronRight, Menu, X } from 'lucide-react';
import { leadService } from '../services/api';
import toast from 'react-hot-toast';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    requirements: [],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRequirementChange = (req) => {
    setFormData(prev => {
      const isSelected = prev.requirements.includes(req);
      if (isSelected) {
        return { ...prev, requirements: prev.requirements.filter(r => r !== req) };
      } else {
        return { ...prev, requirements: [...prev.requirements, req] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.length < 3) {
      toast.error('Name must be at least 3 characters');
      return;
    }
    if (formData.message.length < 15) {
      toast.error('Message must be at least 15 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      await leadService.createLead(formData);
      toast.success('Consultation request sent successfully!');
      setFormData({ name: '', email: '', phone: '', budget: '', requirements: [], message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { icon: <MessageSquare size={32} className="text-primary-500" />, title: 'AI Chatbots', desc: 'Engage customers 24/7 with intelligent conversational agents.' },
    { icon: <Zap size={32} className="text-primary-500" />, title: 'Workflow Automation', desc: 'Streamline your operations and save hundreds of hours.' },
    { icon: <Code size={32} className="text-primary-500" />, title: 'Web Development', desc: 'Custom, high-performance web applications built for scale.' },
    { icon: <BarChart size={32} className="text-primary-500" />, title: 'Data Analytics', desc: 'Actionable insights to drive your business growth forward.' },
  ];

  const benefits = ['24/7 Support', 'Fast Delivery', 'Affordable Pricing', 'Experienced Team'];
  
  const testimonials = [
    { name: 'Sarah Jenkins', role: 'CEO at TechFlow', content: 'LeadDesk AI transformed our customer acquisition. We saw a 3x increase in qualified leads in just two months.' },
    { name: 'Michael Chen', role: 'Founder, DataSync', content: 'The automation workflows they built saved our team over 40 hours a week. Incredible ROI and top-tier support.' },
    { name: 'Emily Rodriguez', role: 'VP of Marketing', content: 'Professional, fast, and highly skilled. Their AI solutions gave us a competitive edge we desperately needed.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">LeadDesk AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Services</a>
              <a href="#why-us" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Why Us</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Testimonials</a>
              <ThemeToggle />
              <a href="#contact" className="btn-primary px-4 py-2">Get Started</a>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 dark:text-gray-300">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-dark-900 border-b border-gray-100 dark:border-gray-800 px-4 py-4 space-y-4">
            <a href="#services" className="block text-gray-600 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#why-us" className="block text-gray-600 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>Why Us</a>
            <a href="#testimonials" className="block text-gray-600 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
            <a href="#contact" className="block text-primary-600 font-medium" onClick={() => setIsMenuOpen(false)}>Get Started</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50/50 via-white to-white dark:from-primary-900/20 dark:via-dark-900 dark:to-dark-900 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
            Grow Your Business with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-emerald-600">
              AI Automation
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Capture high-quality leads and automate customer engagement with our state-of-the-art AI solutions tailored for modern businesses.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#contact" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              Get Free Consultation
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Comprehensive solutions to scale your business operations and revenue.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="card hover:-translate-y-1 transition-transform duration-300">
                <div className="mb-6 inline-block p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/20">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-24 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Us</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                We don't just build software; we build growth engines. Our dedicated team ensures you get the maximum return on your AI investment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle2 className="text-primary-500 w-6 h-6 flex-shrink-0" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent mix-blend-overlay"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Team working" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Don't just take our word for it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="card flex flex-col justify-between">
                <p className="text-gray-600 dark:text-gray-400 italic mb-8">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-primary-600 dark:text-primary-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-gray-50 dark:bg-dark-800 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Start Your Project</h2>
              <p className="text-gray-600 dark:text-gray-400">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required 
                    minLength={3}
                    className="input-field" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    className="input-field" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="input-field" 
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Range</label>
                  <select 
                    name="budget"
                    required
                    className="input-field"
                    value={formData.budget}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select a budget</option>
                    <option value="<$500">&lt;$500</option>
                    <option value="$500-$2,000">$500-$2,000</option>
                    <option value="$2,000-$5,000">$2,000-$5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">What are you interested in?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['AI Chatbots', 'Workflow Automation', 'Web Development', 'Data Analytics'].map((req) => (
                    <label key={req} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                      <input 
                        type="checkbox"
                        checked={formData.requirements.includes(req)}
                        onChange={() => handleRequirementChange(req)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{req}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  name="message"
                  required 
                  minLength={15}
                  rows={4} 
                  className="input-field resize-none" 
                  placeholder="Tell us about your project requirements..."
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="text-primary-500 w-6 h-6" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">LeadDesk AI</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm md:text-base">
            Built for <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">Digital Heroes</a> Training Task
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-4">
            &copy; {new Date().getFullYear()} LeadDesk AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
