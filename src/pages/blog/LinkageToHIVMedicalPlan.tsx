import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useEffect } from "react";

export default function LinkageToHIVMedicalPlan() {
  const { observerRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="w-full h-[400px] relative">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src="/images/ribbon.jpeg"
            alt="HIV Awareness Ribbon"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="max-w-4xl text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Linkage to HIV Medical Plan
              </h1>
              <p className="text-white text-xl">
                Ensuring timely access to care for HIV diagnosis
              </p>
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link to="/blog" className="flex items-center text-red-600 hover:text-red-700 mb-8">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Back to Blog</span>
          </Link>

          {/* Article Metadata */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-8">
            <span className="mr-4">By Dr. Maya Johnson</span>
            <span className="mr-4">April 20, 2025</span>
            <span>7 min read</span>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none"
            ref={observerRef}
          >
            <h2>Understanding Linkage to HIV Care</h2>
            
            <p>
              Linkage to care is the first step in engaging in HIV care and is typically defined as the completion of a first medical clinic visit within 30 days after an HIV diagnosis.
            </p>
            
            <p>
              For persons newly diagnosed with HIV, ensuring rapid linkage to care and starting antiretroviral therapy, ideally within 7 days, is a key pillar of the national initiative, Ending the HIV Epidemic: A Plan for America.
            </p>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-4 my-6">
              <p className="font-medium text-red-800">
                The United States national goal for linkage to care is 85% within 1 month.
              </p>
            </div>
            
            <h2>Recommended Strategies for Successful Linkage</h2>
            
            <ul>
              <li>Use of case managers and patient navigators to increase linkage to care is recommended.</li>
              <li>Proactive engagement and reengagement of patients who miss clinic appointments and/or are lost to follow-up, including intensive outreach for those not engaged in care within 1 month of a new HIV diagnosis, is recommended.</li>
              <li>Case management to retain persons with HIV in care and to locate and reengage patients lost to follow-up is recommended.</li>
              <li>Transportation support for persons with HIV to attend their clinic visits is recommended.</li>
            </ul>
            
            <h2>Benchmarks and Key Statistics</h2>
            
            <p>
              The benchmark for successful linkage to HIV care is completion of a visit with an HIV medical provider within 1 month after HIV diagnosis, though reporting still occurs for linkage within 3 months.
            </p>
            
            <h3>Key Risk Factors for Delayed Linkage</h3>
            
            <ul>
              <li>Substance use</li>
              <li>Lack of medical insurance and access to primary care prior to HIV diagnosis</li>
              <li>Residence in a high poverty area</li>
            </ul>
            
            <p>
              Linkage to care rates are lower among blacks/African Americans and Hispanics compared to whites.
            </p>
            
            <h2>Ensuring Effective Linkage Programs</h2>
            
            <p>
              Ensuring linkage to care is a crucial part of any HIV testing program. Active assistance with arranging care linkage is more effective than passive referral to care.
            </p>
            
            <p>
              The Antiretroviral Treatment Access Study (ARTAS) intervention, which includes multiple sessions of strengths-based counseling, is an evidence-based linkage to care model.
            </p>
            
            <p>
              Assisting persons with linkage to HIV care is a primary goal of public health HIV partner services.
            </p>
            
            <h3>How HIV Programs Can Improve Linkage Rates</h3>
            
            <p>
              HIV programs can increase rates of linkage to care by:
            </p>
            
            <ol>
              <li>Shortening their wait times for new clinic visits</li>
              <li>Conducting outreach to persons who no-show to their first scheduled visit</li>
              <li>Conducting case management intake for new clients prior to the HIV medical provider visit</li>
            </ol>
            
            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 my-6">
              <h4 className="text-cyan-800 font-medium mb-2">Get Connected to Care</h4>
              <p className="text-cyan-700">
                If you or someone you know has been recently diagnosed with HIV, don't delay seeking medical care. Early treatment leads to better health outcomes and can prevent transmission to others.
              </p>
              <div className="mt-3">
                <Button className="bg-red-600 hover:bg-red-700 mt-2">
                  Find HIV Care Services
                </Button>
              </div>
            </div>
          </div>
          
          {/* Share Article */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <h3 className="text-xl font-bold mb-4">Share This Article</h3>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                Twitter
              </Button>
              <Button variant="outline" className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                Facebook
              </Button>
              <Button variant="outline" className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                Email
              </Button>
            </div>
          </div>
          
          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <img 
                  src="/images/BlackWomenandHivArticle.jpg" 
                  alt="Black Women and HIV" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold mb-2">Black Women and HIV</h4>
                  <p className="text-gray-600 mb-3 line-clamp-2">Understanding the specific challenges and disparities facing Black women in HIV prevention, treatment, and care.</p>
                  <Link to="/blog" className="text-red-600 hover:text-red-700 font-medium">Read More</Link>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <img 
                  src="/images/PrEP4Women.jpeg" 
                  alt="PrEP 4 Women" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold mb-2">PrEP In Black America</h4>
                  <p className="text-gray-600 mb-3 line-clamp-2">The PrEP In Black America Coalition addresses systemic barriers preventing Black communities from accessing HIV prevention tools.</p>
                  <Link to="/blog" className="text-red-600 hover:text-red-700 font-medium">Read More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
