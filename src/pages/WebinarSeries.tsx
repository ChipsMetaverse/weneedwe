import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const WEBINAR_YOUTUBE_URL = 'http://www.youtube.com/BW-SELFUFC';
const LIGHTS_CAMERA_URL = 'http://www.youtube.com/user/LightsCameraSurvive';
const QR_CODE_URL = 'https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/a8265d676b204e06b9deaefa450e8609';
const DOCTOR_PHOTO_URL = 'https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/e59392533d934e9096ccd4f1b309148f';
const WOMAN_PHOTO_URL = 'https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/add35a636f21418e970d4e251b8b92e5';

const usefulLinks = [
  { label: 'Universal Family Connection', url: 'https://ufcinc.org/' },
  { label: 'BASUAH', url: 'https://dph.illinois.gov/topics-services/diseases-and-conditions/hiv-aids/basuah.html' },
  { label: 'AIDS Foundation of Chicago', url: 'https://www.aidschicago.org/' },
  { label: 'CDPH', url: 'https://www.chicago.gov/city/en/depts/cdph.html' },
  { label: 'PrEP4Black Women', url: 'https://www.prep4blackwomen.org/' },
  { label: 'Advocates for Youths', url: 'https://www.advocatesforyouth.org/' },
];

export default function WebinarSeries() {
  return (
    <Layout>
      <section className="py-12 bg-pink-50 border-b border-pink-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
          <img src={DOCTOR_PHOTO_URL} alt="Black Woman Doctor" className="w-48 h-48 object-cover rounded-xl shadow-md mb-6 md:mb-0" />
          <div>
            <h1 className="text-4xl font-bold mb-4 text-primary">Webinars - Black Women Supporting Empowering Lifestyle Factors</h1>
            <p className="mb-2 text-lg text-gray-700">Our Risk Reduction Department and BW-SELF Health Ambassadors are reaching out to the community to reduce new infections and eradicate the HIV/AIDS epidemic through education, testing, and ongoing collaborations.</p>
            <p className="mb-2 text-gray-700">We now provide online webinars, information, and support through this website and SheStories blog builders to keep in touch with all communities. We are proud to access the community at our fingertips and create awareness through mass media systems about HIV and how we can prevent the epidemic and #Getting2Zero infections.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Webinars presented by Black Women Doctors/Providers</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Best practices for servicing Black cisgender heterosexual women patients</li>
              <li>Curriculum for cultural competency for practitioners, medical students, CDPH, IDPH clinicians, and direct service providers</li>
              <li>Training curriculum on topics of interest for Black women</li>
            </ul>
            <div className="flex flex-wrap gap-4 mb-4">
              <a href={WEBINAR_YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow hover:bg-secondary transition">Watch on YouTube</a>
              <a href={LIGHTS_CAMERA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold shadow hover:bg-pink-700 transition">2Talk Videos</a>
            </div>
            <p className="text-pink-700 font-bold mb-2">Our Power, Our Voice, Our Control!</p>
          </div>
          <img src={WOMAN_PHOTO_URL} alt="Empowered Black Woman" className="w-full h-64 object-cover rounded-xl shadow-md" />
        </div>
      </section>

      <section className="py-12 bg-pink-50 border-t border-pink-100">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-primary">Useful Links</h3>
            <ul className="list-disc ml-6 mb-4">
              {usefulLinks.map(link => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">{link.label}</a>
                </li>
              ))}
            </ul>
            <h4 className="text-lg font-semibold mb-2 text-pink-700">Contact</h4>
            <p>Email: <a href="mailto:jmjones@ufcinc.org" className="text-primary hover:underline">jmjones@ufcinc.org</a></p>
            <p>Telephone: <a href="tel:773-881-1711" className="text-primary hover:underline">(773) 881-1711</a></p>
            <p>Fax: (773) 881-3379</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img src={QR_CODE_URL} alt="BW-SELF Webinar QR Code" className="w-40 h-40 object-contain rounded-lg border border-gray-200 shadow" />
            <span className="text-xs text-gray-500">Scan to access the toolkit and webinars</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
