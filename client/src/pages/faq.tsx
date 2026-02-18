import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, ChevronDown, ChevronUp, Package, Beaker, Shield, Truck, CreditCard, FlaskConical } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  icon: typeof HelpCircle;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: "General Peptide Questions",
    icon: FlaskConical,
    items: [
      {
        question: "What are peptides?",
        answer: "Peptides are short chains of amino acids, typically between 2 and 100 amino acids in length, linked by peptide bonds. They serve as building blocks of proteins and play crucial roles in cell signaling, hormone regulation, and tissue repair. Research peptides are synthetic versions created in laboratories for scientific study and in-vitro experimentation."
      },
      {
        question: "What are research-grade peptides?",
        answer: "Research-grade peptides are synthesized to high purity standards (typically 98%+ HPLC verified) and are intended strictly for laboratory research and in-vitro studies. They differ from pharmaceutical-grade (GMP) peptides, which undergo additional manufacturing controls for clinical applications. All peptides sold by Peptide Europe are for research use only."
      },
      {
        question: "What purity level do your peptides have?",
        answer: "All our peptides are manufactured to a minimum of 98% purity, verified through High-Performance Liquid Chromatography (HPLC) analysis. Many of our products achieve 99%+ purity. Each product comes with a Certificate of Analysis (COA) confirming purity, molecular weight verification via mass spectrometry, and amino acid sequence confirmation."
      },
      {
        question: "What is net peptide content?",
        answer: "Net peptide content refers to the actual amount of active peptide in the lyophilized (freeze-dried) powder. The total weight of the powder includes not just the peptide but also water, counter ions (such as acetate or TFA salts), and residual solvents. Typical net peptide content ranges from 60-90% of the total weight. When preparing solutions for research, it is important to account for this to ensure accurate dosing."
      },
      {
        question: "What is the difference between lyophilized and reconstituted peptides?",
        answer: "Lyophilized peptides are in a freeze-dried powder form, which is the most stable state for long-term storage. Reconstituted peptides have been dissolved in a solvent (such as bacteriostatic water) and are ready for use in research. Lyophilized peptides have a much longer shelf life compared to reconstituted solutions."
      },
      {
        question: "Do I need a license to purchase research peptides?",
        answer: "No special license is required to purchase research peptides in most European countries. However, all buyers must confirm that peptides are intended for legitimate research purposes only and comply with local regulations. Peptide Europe reserves the right to verify the intended use of purchased products."
      },
    ],
  },
  {
    title: "Storage & Handling",
    icon: Beaker,
    items: [
      {
        question: "How should I store lyophilized (powder) peptides?",
        answer: "For long-term storage, keep lyophilized peptides at -20 degrees Celsius or colder in a deep freezer. At these temperatures, most peptides remain stable for 12 months or longer. For short-term storage (up to a few weeks), refrigeration at 2-8 degrees Celsius is acceptable. Always keep peptides away from light and moisture."
      },
      {
        question: "How should I store reconstituted peptides?",
        answer: "Once reconstituted (dissolved in solvent), peptides should be stored at 2-8 degrees Celsius (standard refrigerator) and used within 3-4 weeks for optimal stability. For longer storage, aliquot the solution into single-use portions and freeze at -20 degrees Celsius. Avoid repeated freeze-thaw cycles, as these degrade the peptide."
      },
      {
        question: "Can peptides degrade? What causes degradation?",
        answer: "Yes, peptides can degrade over time. Common causes include exposure to heat, moisture, light, repeated freeze-thaw cycles, and oxidation. Peptides containing methionine, cysteine, tryptophan, or tyrosine residues are particularly susceptible to oxidation. Proper storage conditions and handling techniques significantly extend the usable life of your peptides."
      },
      {
        question: "How do I reconstitute peptides?",
        answer: "To reconstitute a peptide: 1) Clean the vial top with an alcohol swab. 2) Draw the desired amount of bacteriostatic water into a sterile syringe. 3) Inject the water slowly along the inside wall of the vial, not directly onto the powder. 4) Gently swirl or roll the vial at a 45-degree angle until the powder is fully dissolved. Never shake vigorously, as this can damage the peptide structure. Use our Peptide Calculator tool to determine the correct water volume for your desired concentration."
      },
      {
        question: "What solvents can I use to dissolve peptides?",
        answer: "The most common solvent is bacteriostatic water (sterile water with 0.9% benzyl alcohol as preservative), which allows for multi-use storage. Sterile water is suitable for single-use applications. For hydrophobic peptides, you may need to first dissolve in a small amount of DMSO or acetic acid before diluting with water. The choice depends on the specific peptide's solubility properties."
      },
    ],
  },
  {
    title: "Ordering & Payment",
    icon: CreditCard,
    items: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept multiple payment methods to accommodate researchers across Europe: Cryptocurrency (Bitcoin, USDT, Ethereum) with a 10% discount on your order, bank transfer (SEPA) for EU-based transactions, and credit/debit card payments. All transactions are processed securely."
      },
      {
        question: "Why do you offer a discount for cryptocurrency payments?",
        answer: "Cryptocurrency payments have significantly lower processing fees compared to traditional payment methods and settle faster without intermediaries. We pass these savings directly to our customers in the form of a 10% discount on all crypto orders. This also allows us to serve researchers in regions where traditional payment processing may be restricted."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes. We use industry-standard encryption and secure payment processing for all transactions. We never store credit card details on our servers. Cryptocurrency payments are inherently secure through blockchain technology. Bank transfers are processed through the regulated SEPA network."
      },
      {
        question: "Can I get a discount on my first order?",
        answer: "Yes! Subscribe to our newsletter on the Insights page and receive a unique 10% discount code for your first order. This discount can be combined with other promotions, including the cryptocurrency payment discount for maximum savings."
      },
      {
        question: "Do you offer bulk or wholesale pricing?",
        answer: "Yes, we offer competitive pricing for bulk research orders. Please contact our team directly for volume discounts on orders exceeding 10 units of any single product. We work with universities, research institutions, and laboratories across Europe."
      },
      {
        question: "Can I cancel or modify my order?",
        answer: "Orders can be modified or cancelled within 2 hours of placement, provided they have not yet been dispatched. Once an order has been shipped, it cannot be cancelled. Please contact our support team as soon as possible if you need to make changes."
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    icon: Truck,
    items: [
      {
        question: "Where do you ship to?",
        answer: "We ship to all European Union member states and most European countries including the UK, Switzerland, and Norway. Shipping times and costs may vary by destination. All shipments comply with applicable import regulations for research materials."
      },
      {
        question: "How long does shipping take?",
        answer: "Standard shipping within the EU typically takes 3-7 business days. Express shipping options are available at checkout for faster delivery (1-3 business days to most EU destinations). Shipping times may vary depending on customs processing in your country."
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free standard shipping on all orders over 120 euros. Orders under 120 euros are subject to a flat shipping fee of 9.99 euros. This applies to all EU destinations."
      },
      {
        question: "How are peptides shipped to maintain quality?",
        answer: "All peptides are shipped in insulated packaging with cold packs to maintain appropriate temperatures during transit. Lyophilized peptides are inherently stable at room temperature for short periods, so standard shipping is generally sufficient. For hot summer months or extended transit times, we recommend express shipping to minimize temperature exposure."
      },
      {
        question: "Will I receive tracking information?",
        answer: "Yes, a tracking number is provided via email once your order has been dispatched. You can use this to monitor your shipment's progress. If you haven't received tracking information within 48 hours of ordering, please contact our support team."
      },
      {
        question: "What if my package arrives damaged?",
        answer: "If your order arrives damaged or if any vials are broken, please contact us within 48 hours of delivery with photos of the damage. We will arrange a replacement shipment at no additional cost. We take product integrity very seriously and all shipments are insured."
      },
    ],
  },
  {
    title: "Product Quality & Testing",
    icon: Shield,
    items: [
      {
        question: "How do you ensure product quality?",
        answer: "Every batch of peptides undergoes rigorous quality control testing including HPLC (High-Performance Liquid Chromatography) for purity verification, mass spectrometry for molecular weight and sequence confirmation, endotoxin testing, and sterility verification. We work with ISO-certified manufacturing facilities and maintain strict quality control protocols throughout the supply chain."
      },
      {
        question: "Do you provide Certificates of Analysis (COA)?",
        answer: "Yes, a Certificate of Analysis is available for every product and every batch. The COA includes HPLC purity data, mass spectrometry results, appearance, solubility data, and batch number for traceability. COAs can be requested at the time of order or downloaded from your order confirmation."
      },
      {
        question: "Where are your peptides manufactured?",
        answer: "Our peptides are manufactured in state-of-the-art synthesis facilities that follow Good Laboratory Practice (GLP) standards. We work with established European and international manufacturers who specialize in custom peptide synthesis and maintain ISO certification for quality management."
      },
      {
        question: "What quality control methods do you use?",
        answer: "We employ multiple analytical methods: HPLC (High-Performance Liquid Chromatography) determines purity percentage. Mass Spectrometry (MS) confirms molecular identity and sequence accuracy. Amino Acid Analysis (AAA) verifies composition. Endotoxin testing (LAL) ensures safety for cell-based research. Each batch must pass all tests before release."
      },
      {
        question: "What if I receive a product that doesn't meet specifications?",
        answer: "If any product does not meet the specifications listed on its Certificate of Analysis, we will replace it at no charge or provide a full refund. Please contact us with the batch number and your testing results within 30 days of receipt. We stand behind the quality of every product we sell."
      },
    ],
  },
  {
    title: "Returns & Refunds",
    icon: Package,
    items: [
      {
        question: "What is your return policy?",
        answer: "Due to the nature of research peptides and strict quality control requirements, we generally cannot accept returns of opened or reconstituted products. Unopened, sealed products may be returned within 14 days of delivery for a full refund, provided they have been stored according to our specifications. Please see our Refund Policy page for complete details."
      },
      {
        question: "How do I request a refund?",
        answer: "To request a refund, contact our support team with your order number, the reason for the return, and any relevant documentation (such as photos of damaged products or your test results showing quality issues). We aim to process all refund requests within 5 business days."
      },
      {
        question: "What if my order was lost in transit?",
        answer: "If your order has not arrived within the expected delivery window and tracking shows no recent updates, please contact us. We will investigate with the carrier and either reship your order or provide a full refund. All shipments are insured, so you are fully protected against loss during transit."
      },
    ],
  },
];

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-left hover-elevate rounded-md px-3 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        data-testid={`button-faq-${item.question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="font-medium text-sm">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="px-3 pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const filteredSections = activeSection
    ? faqSections.filter((s) => s.title === activeSection)
    : faqSections;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border/40">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-faq-title">Frequently Asked Questions</h1>
              <p className="text-muted-foreground">Find answers to common questions about our research peptides</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">For Research Use Only</Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeSection === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection(null)}
            data-testid="button-faq-all"
          >
            All Topics
          </Button>
          {faqSections.map((section) => (
            <Button
              key={section.title}
              variant={activeSection === section.title ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
              data-testid={`button-faq-category-${section.title.slice(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
            >
              <section.icon className="h-4 w-4 mr-1" />
              {section.title}
            </Button>
          ))}
        </div>

        <div className="space-y-8 max-w-4xl">
          {filteredSections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-4">
                <section.icon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <Badge variant="secondary" className="text-xs">{section.items.length}</Badge>
              </div>
              <Card>
                <CardContent className="p-2">
                  {section.items.map((item, index) => (
                    <FAQAccordionItem key={index} item={item} />
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our team is here to help with any questions about our research peptides, ordering process, or technical specifications.
              </p>
              <p className="text-sm text-muted-foreground">
                Contact us at <span className="font-medium text-foreground">support@peptide-europe.com</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
