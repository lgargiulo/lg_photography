'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
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
            <h1 className="mb-6">Privacy Policy</h1>
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
                Luca Gargiulo Photography ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our photography services, in accordance with the General Data Protection Regulation (GDPR) and Irish data protection law.
              </p>
              <p className="text-text-light leading-relaxed mt-4">
                We are based in Cork, Ireland. If you have any questions about this Privacy Policy, please contact us at info@lucaphotoart.com.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Information We Collect</h2>
              <p className="text-text-light leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4">
                <li><strong className="text-white">Contact Information:</strong> Name, email address, phone number, and postal address when you contact us or book our services</li>
                <li><strong className="text-white">Event Details:</strong> Date, location, type of event, and specific requirements for photography services</li>
                <li><strong className="text-white">Payment Information:</strong> Processed securely through third-party payment processors (we do not store credit card details)</li>
                <li><strong className="text-white">Photographs:</strong> Images captured during photography sessions or events</li>
                <li><strong className="text-white">Communication Records:</strong> Emails, messages, and other correspondence with us</li>
                <li><strong className="text-white">Website Usage Data:</strong> IP address, browser type, pages visited, and time spent on our website (collected automatically through cookies and analytics)</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">How We Use Your Information</h2>
              <p className="text-text-light leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4">
                <li><strong className="text-white">Service Delivery:</strong> To provide photography services, schedule sessions, and deliver final images</li>
                <li><strong className="text-white">Communication:</strong> To respond to inquiries, send booking confirmations, updates, and delivery notifications</li>
                <li><strong className="text-white">Payment Processing:</strong> To process payments and manage billing</li>
                <li><strong className="text-white">Portfolio & Marketing:</strong> To showcase our work on our website, social media, and marketing materials (only with your consent or as permitted by contract)</li>
                <li><strong className="text-white">Website Improvement:</strong> To analyze website usage and improve our online presence</li>
                <li><strong className="text-white">Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
              </ul>
            </div>

            {/* Legal Basis for Processing */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Legal Basis for Processing (GDPR)</h2>
              <p className="text-text-light leading-relaxed mb-4">
                Under GDPR, we process your personal data on the following legal bases:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4">
                <li><strong className="text-white">Contractual Necessity:</strong> Processing necessary to fulfill our photography service contract with you</li>
                <li><strong className="text-white">Consent:</strong> You have given clear consent for us to process your personal data for specific purposes (e.g., using images in our portfolio)</li>
                <li><strong className="text-white">Legitimate Interests:</strong> Processing necessary for our legitimate business interests (e.g., improving our services, preventing fraud)</li>
                <li><strong className="text-white">Legal Obligation:</strong> Processing necessary to comply with Irish and EU law</li>
              </ul>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Data Retention</h2>
              <p className="text-text-light leading-relaxed">
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4 mt-4">
                <li><strong className="text-white">Inquiry Emails (No Booking):</strong> Deleted after 6-12 months if no service contract is established</li>
                <li><strong className="text-white">Paid Client Contact Information:</strong> Retained for 6 years after the service date (required by Irish Revenue for tax compliance and financial record keeping)</li>
                <li><strong className="text-white">Photographs:</strong> Retained indefinitely as part of our professional archive and portfolio (with your consent as outlined in our service agreement, or unless you request deletion)</li>
                <li><strong className="text-white">Website Analytics:</strong> Aggregated and anonymized data retained for up to 26 months</li>
              </ul>
              <p className="text-text-light leading-relaxed mt-4">
                <em className="text-text-muted">Note: The 6-year retention for paid client data is a legal requirement under Irish tax law. Revenue (Ireland's tax authority) can audit financial records up to 6 years back, so we must retain invoices and related contact information for this period.</em>
              </p>
            </div>

            {/* Your GDPR Rights */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Your Rights Under GDPR</h2>
              <p className="text-text-light leading-relaxed mb-4">
                As a data subject in the EU/EEA, you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4">
                <li><strong className="text-white">Right of Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong className="text-white">Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong className="text-white">Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your personal data (subject to legal and contractual obligations)</li>
                <li><strong className="text-white">Right to Restrict Processing:</strong> Request that we limit how we use your data</li>
                <li><strong className="text-white">Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong className="text-white">Right to Object:</strong> Object to processing based on legitimate interests or for marketing purposes</li>
                <li><strong className="text-white">Right to Withdraw Consent:</strong> Withdraw consent at any time (where processing is based on consent)</li>
              </ul>
              <p className="text-text-light leading-relaxed mt-4">
                To exercise any of these rights, please contact us at info@lucaphotoart.com. We will respond within one month.
              </p>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Data Sharing and Third Parties</h2>
              <p className="text-text-light leading-relaxed mb-4">
                We may share your information with the following third parties:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-light ml-4">
                <li><strong className="text-white">Cloud Storage Providers:</strong> For secure storage of photographs and data</li>
                <li><strong className="text-white">Content Management System:</strong> Sanity CMS for website content management</li>
                <li><strong className="text-white">Payment Processors:</strong> For secure payment processing (e.g., Stripe, PayPal)</li>
                <li><strong className="text-white">Email Service Providers:</strong> For sending communications</li>
                <li><strong className="text-white">Analytics Providers:</strong> For website analytics (data is anonymized where possible)</li>
              </ul>
              <p className="text-text-light leading-relaxed mt-4">
                We ensure all third-party providers comply with GDPR and have appropriate data protection measures in place. We do not sell your personal data to third parties.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Cookies</h2>
              <p className="text-text-light leading-relaxed">
                Our website uses cookies to enhance your browsing experience and analyze website traffic. Cookies are small text files stored on your device. You can control cookies through your browser settings. For more information about the cookies we use, please see our Cookie Policy or contact us.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Data Security</h2>
              <p className="text-text-light leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or destruction. This includes encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* International Transfers */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">International Data Transfers</h2>
              <p className="text-text-light leading-relaxed">
                Some of our third-party service providers may be located outside the European Economic Area (EEA). In such cases, we ensure that appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission, to protect your data.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Children's Privacy</h2>
              <p className="text-text-light leading-relaxed">
                Our services are not directed to children under 16. We do not knowingly collect personal data from children. If we become aware that we have collected data from a child without parental consent, we will take steps to delete it. If photographs of minors are taken during events, we rely on parental/guardian consent.
              </p>
            </div>

            {/* Changes to This Policy */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-text-light leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically. Continued use of our services after changes indicates acceptance of the updated policy.
              </p>
            </div>

            {/* Complaints */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Right to Lodge a Complaint</h2>
              <p className="text-text-light leading-relaxed">
                If you believe we have not handled your personal data in accordance with GDPR, you have the right to lodge a complaint with the Irish Data Protection Commission (DPC):
              </p>
              <p className="text-text-light leading-relaxed mt-4 ml-4">
                <strong className="text-white">Data Protection Commission</strong><br />
                21 Fitzwilliam Square South<br />
                Dublin 2, D02 RD28<br />
                Ireland<br />
                Phone: +353 (0)761 104 800<br />
                Email: info@dataprotection.ie<br />
                Website: www.dataprotection.ie
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">Contact Us</h2>
              <p className="text-text-light leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="text-text-light leading-relaxed mt-4 ml-4">
                <strong className="text-white">Luca Gargiulo Photography</strong><br />
                Cork, Ireland<br />
                Email: info@lucaphotoart.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
