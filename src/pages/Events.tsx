import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsList from '@/components/EventsList';
import { Calendar } from 'lucide-react';

const Events = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-primary/5 overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                Community Events
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Events & Programs</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join us for empowering community events and programs designed to support, educate, and connect.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
              <div className="glass p-8 rounded-2xl shadow-lg mb-16">
                <EventsList />
              </div>

              {/* Consumer Advisory Board - Weekly Support Group */}
              <h2 className="text-3xl font-bold mb-8">Regular Programs</h2>
              <div className="glass p-8 rounded-2xl shadow-lg mb-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">Consumer Advisory Board - Weekly Support Group</h3>
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 mt-1">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">Every Friday, 10:00 AM – 2:00 PM</h4>
                        <p className="text-gray-700 mb-4">
                          Groups are held every Friday from 10:00am– 2:00pm. Lunch is provided. Topics are determined by participants and from issues common to HIV positive clients such as depression, disclosure, and stigma. Guest speakers are invited to discuss current issues impacting HIV persons such as Health Care Reform. Our support group allows participants to speak and learn with others who are HIV positive.
                        </p>
                        <div className="mt-4 text-sm text-gray-500">
                          <p><strong>Location:</strong> Community Center, Room 105</p>
                          <p><strong>Contact:</strong> For more information, call (773) 881-1711</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
