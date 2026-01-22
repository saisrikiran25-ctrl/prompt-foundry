import React, { useEffect } from 'react';
import { ScrollText, Shield, AlertCircle, Scale } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  // Ensure we start at the top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-4xl text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-6 backdrop-blur-md">
            <ScrollText size={14} className="text-accent" />
            <span className="text-xs font-medium text-textSecondary uppercase tracking-wide">Legal Documentation</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="text-textSecondary text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using the Prompt Foundry marketplace. By accessing our platform, you agree to be bound by these conditions.
        </p>
        <div className="mt-8 text-xs font-mono text-textSecondary border border-white/10 inline-block px-4 py-2 rounded bg-secondary/50">
            Last Updated: Jan 22, 2026
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-white/10 bg-secondary/30 p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Section 1 */}
            <section className="mb-12">
                <h2 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-sm border border-white/10">1</span>
                    Acceptance of Terms
                </h2>
                <p className="text-textSecondary leading-relaxed mb-4">
                    By accessing and using Prompt Foundry, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
                <h2 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-sm border border-white/10">2</span>
                    Digital Product License
                </h2>
                <p className="text-textSecondary leading-relaxed mb-4">
                    When you purchase a prompt from Prompt Foundry, you are granted a non-exclusive, perpetual, worldwide license to use the prompt for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-textSecondary mb-6 marker:text-accent">
                    <li>Personal projects and experimentation.</li>
                    <li>Commercial applications where the prompt output is the end product.</li>
                    <li>Integration into internal business workflows.</li>
                </ul>
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                    <h4 className="text-red-400 font-bold text-sm mb-2 flex items-center gap-2">
                        <AlertCircle size={16} /> Prohibited Usage
                    </h4>
                    <p className="text-xs text-textSecondary leading-relaxed">
                        You may NOT resell, redistribute, or publish the raw prompt text itself on any other marketplace, forum, or public repository. The intellectual property of the "Prompt Engineering" logic remains with the original author.
                    </p>
                </div>
            </section>

             {/* Section 3 */}
             <section className="mb-12">
                <h2 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-sm border border-white/10">3</span>
                    Refund Policy
                </h2>
                <p className="text-textSecondary leading-relaxed">
                    Due to the nature of digital goods, we generally do not offer refunds unless the prompt is fundamentally broken or misleading.
                </p>
                <p className="text-textSecondary leading-relaxed mt-4">
                    <strong>Exception:</strong> If a prompt fails to generate the described output on the specified models within 14 days of purchase, and our support team cannot provide a fix, we will issue a full refund.
                </p>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
                <h2 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-sm border border-white/10">4</span>
                    User Accounts
                </h2>
                <p className="text-textSecondary leading-relaxed">
                   You are responsible for maintaining the security of your account and password. Prompt Foundry cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
                </p>
            </section>

            {/* Section 5 */}
             <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-sm border border-white/10">5</span>
                    Limitation of Liability
                </h2>
                <p className="text-textSecondary leading-relaxed">
                    In no event shall Prompt Foundry, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
            </section>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-textSecondary">
                    Questions about the Terms of Service should be sent to us at <span className="text-white font-bold hover:text-accent transition-colors cursor-pointer">saisrikiran@yahoo.com</span>.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};