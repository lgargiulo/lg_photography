'use client';

import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-bg">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6">Terms of Service</h1>
            <p className="text-text-light text-lg">
              Last updated: {new Date().toLocaleDateString('en-IE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-bg-elevated">
        <div className="container-narrow prose-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Introduction</h2>
              <p className="text-text-light leading-relaxed">
                These Terms of Service ("Terms") govern the provision of photography services by Luca Gargiulo Photography ("we", "us", or "our") to clients ("you" or "Client"). By booking our services, you agree to be bound by these Terms. Our services are provided from Cork, Ireland, and these Terms are governed by Irish law.
              </p>
              <p className="text-text-light leading-relaxed mt-4">
                Please read these Terms carefully before booking. If you have any questions, contact us at info@lucaphotoart.com.
              </p>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Services Offered</h2>
              <p className="text-text-light leading-relaxed mb-4">
                We provide professional photography services including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4">
                <li>Music and Live Events Photography</li>
                <li>Wedding Photography</li>
                <li>Corporate and Business Events</li>
                <li>Sports Photography</li>
                <li>Portrait and Artist Press Shots</li>
                <li>Venue Photography</li>
              </ul>
              <p className="text-text-light leading-relaxed mt-4">
                We offer three main packages: The Capture (portrait sessions), The Identity (half-day coverage), and The Full Story (full-day coverage). Specific details of services, deliverables, and pricing will be outlined in your booking agreement or quote.
              </p>
            </div>

            {/* Booking and Payment */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Booking and Payment</h2>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Booking Confirmation</h3>
              <p className="text-text-light leading-relaxed">
                Your booking is confirmed upon receipt of a signed agreement and payment of the required deposit. We reserve the right to decline any booking at our discretion.
              </p>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Deposit</h3>
              <p className="text-text-light leading-relaxed">
                A non-refundable deposit of 30% of the total fee is required to secure your booking. The deposit will be deducted from the final payment.
              </p>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Final Payment</h3>
              <p className="text-text-light leading-relaxed">
                The remaining balance is due 7 days before the scheduled event or session. Images will not be delivered until full payment is received. Payment can be made by bank transfer, card, or other agreed methods.
              </p>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Late Payment</h3>
              <p className="text-text-light leading-relaxed">
                Late payments may result in delayed delivery of images. We reserve the right to charge interest on overdue payments in accordance with Irish law.
              </p>
            </div>

            {/* Cancellation and Rescheduling */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Cancellation and Rescheduling</h2>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Cancellation by Client</h3>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4">
                <li><strong className="text-white">More than 90 days before event:</strong> Deposit is non-refundable, but may be transferred to a new booking within 12 months</li>
                <li><strong className="text-white">30-90 days before event:</strong> 50% of total fee is due</li>
                <li><strong className="text-white">Less than 30 days before event:</strong> 100% of total fee is due</li>
              </ul>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Cancellation by Photographer</h3>
              <p className="text-text-light leading-relaxed">
                In the unlikely event that we must cancel due to illness, emergency, or unforeseen circumstances, you will receive a full refund of all payments made. We will make reasonable efforts to provide a qualified substitute photographer. Our liability is limited to the refund of fees paid.
              </p>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Rescheduling</h3>
              <p className="text-text-light leading-relaxed">
                Rescheduling requests must be made in writing. If we are available on the new date, your booking can be rescheduled at no additional charge (subject to availability). If we are not available, standard cancellation terms apply.
              </p>
            </div>

            {/* Copyright and Usage Rights */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Copyright and Usage Rights</h2>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Copyright Ownership</h3>
              <p className="text-text-light leading-relaxed">
                All photographs and images created by us remain our intellectual property and are protected by Irish and international copyright law. We retain full copyright and ownership of all images.
              </p>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">License Granted to Client</h3>
              <p className="text-text-light leading-relaxed mb-4">
                Upon full payment, you are granted a non-exclusive, perpetual license to use the delivered images for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4">
                <li>Personal use (printing, sharing with family and friends)</li>
                <li>Social media posting (with credit to Luca Gargiulo Photography appreciated)</li>
                <li>Commercial use (if specified in your agreement and included in your package)</li>
              </ul>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Restrictions</h3>
              <p className="text-text-light leading-relaxed mb-4">
                You may NOT:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4">
                <li>Sell, license, or redistribute the images to third parties (unless commercial rights are included)</li>
                <li>Claim authorship or copyright of the images</li>
                <li>Alter, edit, or manipulate the images in a way that misrepresents our work (minor cropping and color adjustments for personal use are acceptable)</li>
                <li>Use images for illegal, defamatory, or inappropriate purposes</li>
              </ul>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Photographer's Usage Rights</h3>
              <p className="text-text-light leading-relaxed">
                We reserve the right to use any images from your session for our portfolio, website, social media, marketing materials, competitions, and promotional purposes. If you wish to restrict this usage, please notify us in writing before the event. Privacy restrictions may incur an additional fee.
              </p>
            </div>

            {/* Image Delivery */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Image Delivery</h2>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Delivery Timeline</h3>
              <p className="text-text-light leading-relaxed">
                Delivery times depend on your package:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4 mt-4">
                <li><strong className="text-white">The Capture (Portrait Session):</strong> 1-week delivery</li>
                <li><strong className="text-white">The Identity (Half-Day Coverage):</strong> 2-week delivery</li>
                <li><strong className="text-white">The Full Story (Full-Day Coverage):</strong> 3-week delivery</li>
              </ul>
              <p className="text-text-light leading-relaxed mt-4">
                Delivery times may vary during peak season. We will communicate expected delivery dates at the time of booking and notify you of any changes. Rush delivery may be available upon request for an additional fee, subject to availability.
              </p>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Delivery Method</h3>
              <p className="text-text-light leading-relaxed">
                Images are delivered digitally via a secure online gallery where you can download high-resolution files. Gallery access is typically available for 90 days. Physical prints or albums can be arranged for an additional fee.
              </p>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Number of Images</h3>
              <p className="text-text-light leading-relaxed">
                The number of edited images varies by package and event type and will be specified in your booking agreement. We deliver only the best, professionally edited images—not all images captured.
              </p>
            </div>

            {/* Model Release */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Model Release and Consent</h2>
              <p className="text-text-light leading-relaxed">
                By booking our services, you (and your guests, if applicable to your event) grant permission to be photographed and consent to our use of these images as outlined in the "Copyright and Usage Rights" section. For events involving minors, we rely on parental or guardian consent.
              </p>
              <p className="text-text-light leading-relaxed mt-4">
                If you or your guests do not wish to be featured in our promotional materials, please inform us in writing before the event.
              </p>
            </div>

            {/* Liability and Limitations */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Liability and Limitations</h2>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Equipment Failure</h3>
              <p className="text-text-light leading-relaxed">
                We use professional equipment and carry backup gear to all events. However, in the unlikely event of complete equipment failure or data loss, our liability is limited to a full refund of fees paid. We cannot be held liable for indirect or consequential damages.
              </p>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Force Majeure</h3>
              <p className="text-text-light leading-relaxed">
                We are not liable for failure to perform our obligations due to circumstances beyond our control, including but not limited to: illness, injury, natural disasters, pandemic restrictions, travel disruptions, or venue restrictions. In such cases, we will work with you to reschedule or provide a partial refund as appropriate.
              </p>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Venue and Location Access</h3>
              <p className="text-text-light leading-relaxed">
                You are responsible for obtaining all necessary permissions and access to venues and locations. We are not liable for any issues arising from lack of access, venue restrictions, or lighting conditions beyond our control.
              </p>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Third-Party Interference</h3>
              <p className="text-text-light leading-relaxed">
                We cannot be held responsible for interference by third parties (e.g., guests obstructing shots, venue coordinators limiting access) that impacts the quality or quantity of images captured.
              </p>

              <h3 className="text-xl font-display font-light text-white mb-3 mt-6">Limitation of Liability</h3>
              <p className="text-text-light leading-relaxed">
                Our total liability under these Terms, whether in contract, tort, or otherwise, is limited to the total amount of fees you have paid for our services. We are not liable for any indirect, incidental, special, or consequential damages.
              </p>
            </div>

            {/* Client Responsibilities */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Client Responsibilities</h2>
              <p className="text-text-light leading-relaxed mb-4">
                As the Client, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4">
                <li>Provide accurate event details (date, time, location, schedule)</li>
                <li>Notify us of any changes to event details as soon as possible</li>
                <li>Ensure we have appropriate access to all areas needed for photography</li>
                <li>Inform guests that professional photography is taking place</li>
                <li>Provide a contact person at the event for coordination (for large events)</li>
                <li>Treat our photographer(s) with respect and courtesy</li>
                <li>Ensure timely payment according to the agreed schedule</li>
              </ul>
            </div>

            {/* Editing and Retouching */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Editing and Retouching</h2>
              <p className="text-text-light leading-relaxed">
                All delivered images are professionally edited with color correction, exposure adjustments, and our signature editing style. Basic retouching (blemish removal, minor adjustments) is included. Extensive retouching (body reshaping, background changes, etc.) may be available for an additional fee upon request.
              </p>
              <p className="text-text-light leading-relaxed mt-4">
                Our editing style is part of our artistic expression. We do not provide unedited RAW files as part of standard packages.
              </p>
            </div>

            {/* Complaints and Disputes */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Complaints and Disputes</h2>
              <p className="text-text-light leading-relaxed">
                If you are dissatisfied with any aspect of our service, please contact us within 14 days of image delivery at info@lucaphotoart.com. We will work with you in good faith to resolve any issues.
              </p>
              <p className="text-text-light leading-relaxed mt-4">
                Any disputes arising from these Terms will be governed by Irish law and subject to the exclusive jurisdiction of the Irish courts.
              </p>
            </div>

            {/* Insurance */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Insurance</h2>
              <p className="text-text-light leading-relaxed">
                We carry professional indemnity and public liability insurance. Proof of insurance can be provided upon request for venue requirements.
              </p>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Changes to These Terms</h2>
              <p className="text-text-light leading-relaxed">
                We reserve the right to update these Terms at any time. The version in effect at the time of your booking will apply to your service contract. Continued use of our services after changes indicates acceptance of updated Terms.
              </p>
            </div>

            {/* Entire Agreement */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Entire Agreement</h2>
              <p className="text-text-light leading-relaxed">
                These Terms, together with your signed booking agreement and any additional written agreements, constitute the entire agreement between you and Luca Gargiulo Photography. Any verbal agreements or representations not included in writing are not binding.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Contact Information</h2>
              <p className="text-text-light leading-relaxed">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <p className="text-text-light leading-relaxed mt-4 ml-4">
                <strong className="text-white">Luca Gargiulo Photography</strong><br />
                Cork, Ireland<br />
                Email: info@lucaphotoart.com
              </p>
            </div>

            {/* Acceptance */}
            <div className="border-t border-border-light pt-8 mt-8">
              <p className="text-text-light leading-relaxed italic">
                By booking our photography services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
