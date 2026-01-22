
import { Product, Review } from '../types';

const AUTHOR_PROFILE = {
  name: 'Prompt Foundry',
  avatar: 'https://ui-avatars.com/api/?name=Prompt+Foundry&background=38bdf8&color=0f172a&bold=true',
  verified: true
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Business Growth Toolkit',
    description: 'Scale your business with AI. The AI Business Growth Toolkit provides 20+ expert engines to turn ChatGPT, Claude, or Gemini into your personal strategist.',
    fullDescription: `🚀 Scale Your Business with AI Stop the guesswork. The AI Business Growth Toolkit provides 20+ expert engines to turn ChatGPT, Claude, or Gemini into your personal strategist.

Deep Insights: Analyze pipelines and forecast revenue instantly.

Effortless Automation: Streamline CRM tasks and reporting.

Data-Driven Growth: Get actionable steps to outpace the competition.`,
    category: 'Business',
    price: 199,
    rating: 0,
    reviewCount: 0,
    image: 'https://pitchdeckstorage1234.blob.core.windows.net/thumbnails/Gemini_Generated_Image_n04ehmn04ehmn04e.png',
    tags: ['Business', 'Strategy', 'Growth', 'Automation'],
    expertLevel: 'Pro',
    compatibleModels: ['GPT-4', 'Claude 3.5 Sonnet'],
    productType: 'Prompt Package',
    tokenCount: 4500,
    promptCount: '20+',
    format: 'PDF',
    version: '2.1.0',
    author: AUTHOR_PROFILE,
    features: [
        { title: 'Instant Deployment, Zero Learning Curve', description: 'Simply copy and paste to activate your AI analyst. No technical skills or complex software needed.' },
        { title: 'World-Class Strategic Insights', description: 'Each prompt is crafted to turn your AI into a seasoned expert in marketing, sales, and data analysis.' },
        { title: 'Effortless Workflow Automation', description: 'Save countless hours by automating CRM logging, sales reporting, and strategic analysis. Focus on growth.' },
        { title: 'Actionable Growth Roadmaps', description: 'Get clear, data-driven recommendations and strategic plans to confidently drive sales and marketing success.' }
    ],
    exampleOutputs: [
        {
            title: 'Growth Strategy',
            content: `**Q3 Growth Roadmap**

**Objective:** Increase ARR by 15% through channel diversification.

**Strategic Levers:**
1. **Automated Outreach:** Deploy sequence #4 for mid-market tier.
2. **Content Repurposing:** Utilize engine #7 to transform blog posts into LinkedIn carousels.

**KPIs to Track:**
- MQL to SQL conversion rate
- CAC payback period`
        }
    ],
    downloadResources: [
        { name: 'Master Prompt Package', url: 'https://pitchdeckstorage1234.blob.core.windows.net/strategy/MASTER_PROMPT_PACKAGE.pdf' },
        { name: 'User Manual', url: 'https://pitchdeckstorage1234.blob.core.windows.net/strategy/User_Manual.pdf' },
        { name: 'Templates & Examples', url: 'https://pitchdeckstorage1234.blob.core.windows.net/strategy/Prompt_Package_Examples.pdf' }
    ]
  },
  {
    id: 'p2',
    name: 'AI Marketing Prompts',
    description: 'Deploy Fortune 100 marketing strategies and ex-Meta algorithms to increase ROI by 45-65% and cut development time by half.',
    fullDescription: 'Install the minds of elite Fortune 100 strategists and ex-Meta algorithm engineers directly into your AI. Deploy world-class campaigns engineered to increase marketing ROI by 45-65% and cut development time by over 50%.',
    category: 'Marketing',
    price: 179,
    rating: 0,
    reviewCount: 0,
    image: 'https://pitchdeckstorage1234.blob.core.windows.net/thumbnails/Gemini_Generated_Image_m59lwom59lwom59l.png',
    tags: ['Art', 'Photography', 'Midjourney'],
    expertLevel: 'Master',
    compatibleModels: ['Midjourney V6'],
    productType: 'Prompt Package',
    tokenCount: 1200,
    promptCount: 12,
    version: '1.0.0',
    author: AUTHOR_PROFILE,
    features: [
        { title: 'Real-Time Optimization', description: 'Each 10/10 prompt includes protocols for live performance tracking, A/B testing, and continuous optimization' },
        { title: 'A-Team of AI Experts', description: 'Command AI personas modeled on elite experts: a neuroscientist, an ex-Meta engineer, and a Fortune 100 strategist' },
        { title: 'Built-In Risk Mitigation', description: 'Launch with confidence. Identify & neutralize threats with an integrated Failure Mode & Effects Analysis protocol' },
        { title: 'Enterprise-Ready System', description: 'Built for business with API hooks, GDPR & CCPA compliance frameworks, and a fully scalable architecture' }
    ],
    downloadResources: [
        { name: 'Master Prompts', url: 'https://pitchdeckstorage1234.blob.core.windows.net/marketing/Master_Prompts.pdf' },
        { name: 'User Manual', url: 'https://pitchdeckstorage1234.blob.core.windows.net/marketing/User_Manual.pdf' },
        { name: 'Templates & Examples', url: 'https://pitchdeckstorage1234.blob.core.windows.net/marketing/Sample Templates_and_Examples.pdf' }
    ]
  },
  {
    id: 'p3',
    name: 'Marketing Images & Posts Generator',
    description: 'Create high-converting visuals and social posts. Includes 30+ expert prompts for Midjourney, DALL-E 3, and Nano Banana.',
    fullDescription: `Unleash our Commercial Excellence Bundle to dominate your market with flawless, research-backed visual precision. Stop settling for amateur imagery and start elevating your brand by focusing on what truly matters—conversion and growth!

Instantly upgrade your arsenal with a sophisticated collection of 30+ prompts across five commercial categories engineered for Midjourney v6 and Nano Banana.`,
    category: 'Marketing',
    price: 189,
    rating: 0,
    reviewCount: 0,
    image: 'https://pitchdeckstorage1234.blob.core.windows.net/thumbnails/Gemini_Generated_Image_5dg0wz5dg0wz5dg0.png',
    tags: ['Marketing', 'Images', 'Social Media', 'Midjourney'],
    expertLevel: 'Master',
    compatibleModels: ['Midjourney v6', 'Nano Banana', 'DALL-E 3'],
    productType: 'Prompt Package',
    tokenCount: 8000,
    promptCount: 30,
    version: '4.0',
    author: AUTHOR_PROFILE,
    features: [
        { title: 'Research-Backed Psychology', description: 'Every prompt integrates scientific composition and conversion psychology to drive measurable ROI.' },
        { title: 'Precision Platform Tuning', description: 'Parameters are meticulously optimized for Midjourney v6 and DALL-E 3 across Instagram, TikTok, and e-commerce.' },
        { title: 'Strategic Aesthetic Variety', description: 'Access 7 distinct commercial styles—from Luxury Minimalist to Cyberpunk—to capture any audience.' },
        { title: 'Market-Ready Quality', description: 'Engineered for "10/10" professional execution requiring zero revisions for immediate deployment.' }
    ],
    exampleOutputs: [
        {
            title: 'Viral Instagram Product Shot',
            content: `/imagine prompt: overhead shot of organic skincare bottle on raw silk fabric, soft morning sunlight casting dappled shadows, beige and sage green color palette, minimal aesthetic, 8k resolution, photorealistic --ar 4:5 --v 6.0`
        }
    ],
    downloadResources: [
        { name: 'Master Prompts', url: 'https://pitchdeckstorage1234.blob.core.windows.net/visual-marketing/Master_Prompts' },
        { name: 'User Manual & Templates', url: 'https://pitchdeckstorage1234.blob.core.windows.net/visual-marketing/User_Manual_and_Sample Templates' }
    ]
  },
  {
    id: 'p4',
    name: 'Automated Invoice Generator',
    description: 'Automate billing with hallucination-proof precision. Stop chasing payments and focus on what matters—growth.',
    fullDescription: 'Unleash our AI Invoice Suite to automate your billing with flawless, hallucination-proof precision. Stop chasing payments and start elevating your business by focusing on what truly matters—growth!',
    category: 'Business',
    price: 99,
    rating: 0,
    reviewCount: 0,
    image: 'https://pitchdeckstorage1234.blob.core.windows.net/thumbnails/Gemini_Generated_Image_z8q25tz8q25tz8q2.png',
    tags: ['Business', 'Finance', 'Invoicing'],
    expertLevel: 'Pro',
    compatibleModels: ['GPT-4', 'Gemini Pro'],
    productType: 'Prompt',
    tokenCount: 1400,
    format: 'PDF',
    version: '1.5',
    author: AUTHOR_PROFILE,
    features: [
        { title: 'Hallucination-Proof Engine', description: 'Generates 100% accurate, triple-verified invoices. Eliminates math errors & fabricated data for total precision' },
        { title: 'Global Tax & Legal Compliance', description: 'Auto-handles tax rules for US, EU, UK & IN. Creates compliant invoices with built-in legal disclaimers' },
        { title: 'Instant Pro Outputs', description: 'Generates a visual HTML invoice and a perfectly toned, client-ready email automatically with every request' },
        { title: 'Hands-Free Recurring Billing', description: 'Set up and automate recurring invoices. It manages frequency, dates, and client comms for you' }
    ],
    exampleOutputs: [
        {
            title: 'Generated Invoice',
            content: `INVOICE #INV-2024-001
Date: October 24, 2024

BILL TO:
Acme Corp
123 Business Rd, Tech City

ITEMS:
1. Strategic Consulting (10 Hours) - $1,500.00
2. Asset Licensing - $400.00

SUBTOTAL: $1,900.00
TAX (18%): $342.00
TOTAL: $2,242.00`
        }
    ],
    downloadResources: [
        { name: 'Master Prompts', url: 'https://pitchdeckstorage1234.blob.core.windows.net/automated-invoice-gen/INVOICE_AUTOMATION_ENGINE.pdf' },
        { name: 'User Manual', url: 'https://pitchdeckstorage1234.blob.core.windows.net/automated-invoice-gen/User-Manual.pdf' },
        { name: 'Templates & Examples', url: 'https://pitchdeckstorage1234.blob.core.windows.net/automated-invoice-gen/Sample_Templates_and_Examples.pdf' }
    ]
  },
  {
    id: 'p5',
    name: 'Viral Youtube Thumbnail Generator',
    description: 'Generate MrBeast-quality YouTube thumbnails with ultra-high CTR. Photorealistic, cinematic lighting, viral psychological hooks.',
    fullDescription: 'Generate MrBeast-quality YouTube thumbnails with ultra-high CTR. Photorealistic, cinematic studio lighting, viral psychological hooks built-in. Perfect for creators, marketers & agencies. Features exaggerated expressions, 120% color boost, dramatic text overlays. Works for gaming, finance, tech, vlogs & challenges. 5 customizable variables = unlimited thumbnails. Professional $50K production quality instantly. Boost views & subscribers!',
    category: 'Creative',
    price: 89,
    rating: 0,
    reviewCount: 0,
    image: 'https://pitchdeckstorage1234.blob.core.windows.net/thumbnails/Gemini_Generated_Image_qvqursqvqursqvqu.png',
    tags: ['YouTube', 'Thumbnail', 'Creative', 'Viral', 'Midjourney'],
    expertLevel: 'Master',
    compatibleModels: ['Midjourney V6', 'DALL-E 3'],
    productType: 'Prompt',
    tokenCount: 280,
    version: '1.0',
    author: AUTHOR_PROFILE,
    features: [
        { title: 'Technical Precision', description: 'Uses "Locked Specifications" (120% saturation, f/1.8 bokeh) to force a high-end, cinematic look over generic AI styles.' },
        { title: 'Compositional Focus', description: 'Mandates the subject occupy 50%+ of the frame with exaggerated expressions to ensure immediate visual impact on small screens.' },
        { title: 'Psychological Engineering', description: 'Integrates "Curiosity Gaps" and "Visual Tension" to prioritize click-through rate (CTR) over simple aesthetics.' },
        { title: 'Strict Quality Control', description: 'Employs explicit exclusions (no stock photo vibes, no clutter) to maintain a premium, $50,000-budget appearance.' }
    ],
    exampleOutputs: [
        {
            title: 'Viral Gaming Thumbnail',
            content: `/imagine prompt: extreme close-up of shocked man holding a glowing mystery box, lightning background, high contrast, saturated colors --ar 16:9 --v 6.0`
        }
    ],
    downloadResources: [
        { name: 'Master Prompt', url: 'https://pitchdeckstorage1234.blob.core.windows.net/ytprompt/Master_Prompt.pdf' },
        { name: 'User Guide', url: 'https://pitchdeckstorage1234.blob.core.windows.net/ytprompt/User_Guide.pdf' },
        { name: 'Sample Templates', url: 'https://pitchdeckstorage1234.blob.core.windows.net/ytprompt/SAMPLE_TEMPLATES.pdf' },
        { name: 'Outputs Generated', url: 'https://pitchdeckstorage1234.blob.core.windows.net/ytprompt/OUTPUTS_Generated.pdf' }
    ]
  },
  {
    id: 'p6',
    name: 'Expert AI Sales Prompts',
    description: 'Transform your AI into a neuropsychology sales expert. Ethically close high-ticket deals with research-backed strategies.',
    fullDescription: 'Unleash your AI\'s inner sales genius with MindHack AI Sales Prompts! Transform it into a neuropsychology expert that ethically closes high-ticket deals on command.',
    category: 'Business',
    price: 159,
    rating: 0,
    reviewCount: 0,
    image: 'https://pitchdeckstorage1234.blob.core.windows.net/thumbnails/Gemini_Generated_Image_cwzgbmcwzgbmcwzg.png',
    tags: ['Sales', 'Business', 'Psychology', 'Negotiation'],
    expertLevel: 'Master',
    compatibleModels: ['GPT-4', 'Claude 3.5 Sonnet'],
    productType: 'Prompt Package',
    tokenCount: 6000,
    promptCount: 30,
    version: '1.0',
    author: AUTHOR_PROFILE,
    features: [
        { title: 'Neuro-Persona Synthesis', description: 'Instantly build a deep psychological profile of your ideal customer to find their exact buying triggers.' },
        { title: 'AI Strategy Architect', description: 'Your AI forges a full sales funnel using cognitive biases to ethically guide customers from "hello" to "yes".' },
        { title: 'Instant Sales Arsenal', description: 'Generate psychologically-tuned emails, call scripts, and social messages that handle objections and close deals.' },
        { title: 'Dynamic Feedback Loop', description: 'A built-in system for A/B testing & refining your strategy with real data, ensuring your sales engine always improves' }
    ],
    exampleOutputs: [
        {
            title: 'Cold Call Script',
            content: `**Phase 1: Pattern Interrupt**
"Hi [Name], I'm not going to ask you 'how you are' because I know you're busy. I'm calling because..."

**Phase 2: The Gap**
"We've noticed most [Industry] COOs are struggling with [Pain Point]. Is that on your radar?"`
        }
    ],
    downloadResources: [
        { name: 'Master Prompts (CSV)', url: 'https://pitchdeckstorage1234.blob.core.windows.net/sales/Master_Prompts.csv' },
        { name: 'User Manual', url: 'https://pitchdeckstorage1234.blob.core.windows.net/sales/User_Manual.md' },
        { name: 'Templates & Examples', url: 'https://pitchdeckstorage1234.blob.core.windows.net/sales/Sample templates_and_Examples.md' },
        { name: 'Implementation Guide', url: 'https://pitchdeckstorage1234.blob.core.windows.net/sales/implementation-checklist.md' }
    ]
  },
];

export const REVIEWS: Review[] = [];
