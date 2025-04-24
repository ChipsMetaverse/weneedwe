import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '@/utils/animations';
import { ArrowRight, CheckCircle, Users, Heart, Award, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { mainPrograms, webinarSeries } from '@/data/siteData';

const BWSELFProgram = () => {
  const { ref, isVisible: inView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  // Get BW-SELF program data from extracted content
  const bwSelfProgram = mainPrograms.find(program => program.id === "bw-self");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-24 bg-red-50 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100/50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                Featured Program
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-red-800">BW-SELF Advocacy Program</h1>
              <p className="text-2xl font-semibold text-red-700 mb-8">
                OUR POWER, OUR VOICE, OUR CONTROL!
              </p>
              <p className="text-xl text-red-700/80 max-w-2xl mx-auto">
                Building Women's Self-Empowerment, Leadership, and Freedom - a program empowering Black Women to navigate healthcare, pursue education, and access community resources.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section 
          ref={ref}
          className={`relative py-16 md:py-24 overflow-hidden transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto">
              {/* Intervention Programs */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-red-800">Intervention Programs</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    The HIV department provides outreach, schools, and clinical organizations with HIV prevention education and science-based intervention programs such as SISTA (Sisters Informing Sisters about Topics on AIDS) and WILLOW (Women Involved in Life Learning from Other Women).
                  </p>
                  <p>
                    These interventions target Black women (25-44 years of age), young adult women who are at high risk for HIV, and the MSM gender loving men. Prevention for positives, and Sister The Harm The Circle, HIV Counseling & Testing, Hepatitis Counseling & Testing and Research Program Recruitment (See website for further details).
                  </p>
                  <p>
                    Access remains a so individual level intervention designed to encourage and link a newly-diagnosed HIV-positive person to medical care.
                  </p>
                </div>
              </div>

              {/* Our Black HERSTORY */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 text-red-800">Our Black HERSTORY</h3>
                <h4 className="text-xl font-medium mb-4 text-red-700">Cisgender Black Heterosexual Women</h4>
                <div className="prose prose-lg max-w-none">
                  <p>
                    In 2010, Women's Family Planning, Inc. and NIDAAC (Black Women's Advocacy Initiative/Lifestyle Activists)—a working group of Black and African cisgender women collaborated to develop the "Our Power, Our Voice, Our Control" educational intervention designed as this Toolkit. This Toolkit is sponsored and supported by the Chicago Department of Public Health.
                  </p>
                  <p>
                    The Toolkit set out to ensure healthcare professionals who treat, care for, and/or support Black women with HIV/AIDS are aware of barriers that Black women face when seeking HIV prevention and accessing medical treatments and their negative experience of HIV stigma.
                  </p>
                </div>
              </div>
              
              {/* Healthcare Professional Toolkit */}
              <div className="mb-16 p-8 border border-gray-200 rounded-xl bg-white shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">This Toolkit set out to ensure healthcare professionals who treat, care for, and/or support Black women...</h3>
                <div className="prose prose-lg max-w-none">
                  <p>
                    Women encounter social inequity throughout the United States. The rate of new HIV infections among Black women is 20 times higher than that of white women and 5 times as high as Hispanic women. The proportion of Black women with new HIV infections reveals a severe health disparity. These inequities highlight the importance of HIV prevention strategies for Black women.
                  </p>
                  <p>
                    This Toolkit contains a series of health & wellness webinars presented by Black women experts and physicians skilled to encourage trust between patients and providers and what can lead to health inequities. The Toolkit provided a forum for BW-SELF health ambassadors to be an agency of change for their peers' voice, and as a tool used to fix the wrongs in the healthcare industry. UFC hosted 5 focus groups where Black and African women voiced their concerns/barriers they faced when going to their doctor. Focus groups were held in person pre-COVID-19 and on the internet. YouTube Socials and our Showcase of Change was the survey included on this site.
                  </p>
                </div>
              </div>

              {/* What We Do */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 text-red-800">What We Do</h3>
                <div className="prose prose-lg max-w-none">
                  <p>
                    UFC has collaborated with the Chicago Department of Public Health to provide free HIV rapid testing and support for Black cisgender heterosexual women seeking services, peer-to-peer relationships or just looking for literature for navigating HIV care. Our approach is tailored to help Black men for prevention messages.
                  </p>
                  <p>
                    Our goal is to showcase for the BW-SELF the barriers to how access to and retention in care is made.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h4 className="text-lg font-bold mb-4 text-red-800">Health Disparities and Health Inequities Challenges Black Women Experience</h4>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Increasing Vaccination Coverage for Racial and Ethnic Populations</li>
                      <li>Promoting Health Equity for Women with Disabilities</li>
                      <li>Addressing COVID-19 Vaccine Hesitancy</li>
                      <li>Addressing HIV among Black Women and Girls at Risk for HIV</li>
                      <li>Increase Awareness of PrEP for Black Women and Girls at Risk for HIV</li>
                      <li>Increase Funding Minority Research Grant Program</li>
                    </ul>
                  </div>
                </div>
              </div>
            
              {/* Get Involved */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-xl border border-red-100">
                <h2 className="text-2xl font-bold mb-6 text-red-800 text-center">Get Involved</h2>
                <div className="prose prose-lg max-w-none text-center mb-8">
                  <p>
                    Join us in our mission to empower Black women through the BW-SELF advocacy program and help address the health disparities that Black women face.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/donate">
                    <Button size="lg" className="bg-red-600 hover:bg-red-700">
                      Support Our Work
                    </Button>
                  </Link>
                  <Link to="/volunteer">
                    <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                      Volunteer With Us
                    </Button>
                  </Link>
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

export default BWSELFProgram;