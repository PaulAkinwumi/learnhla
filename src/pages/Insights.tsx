import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const categories = ['All Insights', 'Leadership', 'Policy', 'Clinical Excellence', 'Innovation', 'News'] as const;

const featuredArticle = {
  tag: '#DigitalHealth',
  title: 'The Future of Digital Health in Sub-Saharan Africa',
  description:
    'Exploring the rapid acceleration of digital health technologies and their profound impact on healthcare delivery, policy formulation, and clinical leadership across the continent.',
  author: 'Dr. Amina Diallo',
  initials: 'AD',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDRTz4PW8nD8Jn39kbYZMs0Wl0H94X5zteYS25TuUh41Eg2gyX6Q45-bAsgS2q25cGIADovFw_J8y45tLqUy6ZHZ3dKZw_JAVJBcvDqTa9_L7L9FBkE1qqrcUr5-n71UZQEJ6WqI4hj_SC-cddF8vI3T--c28HNqcuiLqcCD6fY5jT894KD3VIybR4XbvjqgJpCEUCeDkdG7Tv9YSl_rss77Tt8JL_TY99-oA6Ca0rRmq0U7bBVpZ8jCw',
  alt: 'Healthcare professionals looking at digital health data on a tablet in a modern clinical setting.',
};

type Article = {
  id: number;
  tag: string;
  readTime: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const articles: Article[] = [
  {
    id: 1,
    tag: 'Leadership',
    readTime: '5 min read',
    title: 'Scaling Health Interventions: Lessons from the Field',
    description:
      'A deep dive into the operational challenges and executive strategies required to successfully expand clinical interventions across diverse regional healthcare systems.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCaPJzW_0slx1SMvq56wVDksM94duCOKSO_cMdHSfBIrMLuNTxmfMgM9QEgc2SZOx2O17ztddcs8tnxa6cLVkNdhlHaSkOQ1BIFuPsBQVANFeJMAHVrAoi879g2EvTOdVaOJzRKFJWpQ17ZcPM0twst8uQC6TGabZDeYerVLFoRTr6FNW3Ty_zq50q8nAPTg-gu4a2t8F1mSIJltU560CwQzilCkHUZmCZn-IBsIxfmrJO3GmnKkGDl6w',
    alt: 'Healthcare leaders discussing strategies in a modern conference room.',
  },
  {
    id: 2,
    tag: 'Policy',
    readTime: '8 min read',
    title: 'Policy Frameworks for Universal Health Coverage',
    description:
      'Analyzing structural policy shifts and the governance models necessary to accelerate progress towards equitable and sustainable universal health coverage.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC5P1YwlPGlhs5uSuEpwuoFfRjcwM_xVXT7IitZ83zicFsoSqxdW-7CZqm90UFUEkYgYSHGPHQ3kkuMKCIcZrxKryhwq3yiVNt4LNo6WQsx3AOyUnCLrF-qkI9MakkLNcHinlKl3yIs_8crMu5ApXIfUlAnXYFLgPKvvFDRG_7OqkRR0TchrnsFl_9ozwgh07epkQUrjI3UPJ5ZfJHdzu9fGA4XLkXaaulLLvONZ2xFncyY8Tno52QRzQ',
    alt: 'Healthcare policy documents and a fountain pen on a polished desk.',
  },
  {
    id: 3,
    tag: 'Innovation',
    readTime: '6 min read',
    title: 'Innovations in Maternal Health Monitoring',
    description:
      'Reviewing breakthrough technologies and data-driven monitoring tools that are transforming maternal care outcomes in low-resource settings.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUa9T7q2p9gJ8X231u2WWl1hVZjCcA3vcQ-uWqp9NjO3O5b7FKumiWlGCYpI1vqwwrUvg0_b0syvw3GZwkRX3tC5xiDoqsGgWBoGRe7k8AwWG5Y4E_OmgDloqh76Dxn7c9kFQMp6OI73DyUzzLQ_bd8GGQXm8s9Pn4zxCVHp5rWYJrEVGQGGgsSWvXsSrKXF2tdqM7PtNqLjvZp9v7ZUW2KakLiJ4mvH3DJRbPPPm2nrr01tUTV9nVvw',
    alt: 'A state-of-the-art maternal health monitoring device in a clinical setting.',
  },
  {
    id: 4,
    tag: 'News',
    readTime: '3 min read',
    title: 'HLA Africa Welcomes New Cohort of Executive Fellows',
    description:
      "Introducing the exceptional group of healthcare leaders selected for this year's prestigious fellowship program, aimed at transforming regional systems.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8Dfds6xJRJpc9aHeG1O1yF2RQn95UdRPWO1jgTNYQulB3f6rPntTRKVxxY7a1iMbSxhFGtHc8MsLJtkhz66PrzyZTKHIuaaF35fXuqPAWdlECeo62Hee8aWwUVngw75KaEWMeUZxASzGnad_IumgpeM98moN6Qx0w_FaF9exs_x6FRd5dKgMJHLPyVT_VZAcoVxd_UX2e3wCwDi79QI6a9GfAJTul8rqQvy96Wl3JrwbsrGXFouB3Jg',
    alt: 'Group portrait of healthcare executives in front of a modern academic building.',
  },
  {
    id: 5,
    tag: 'Clinical Excellence',
    readTime: '7 min read',
    title: 'Data-Driven Decision Making in Rural Clinics',
    description:
      'How the implementation of rigorous data analytics frameworks is elevating clinical standards and resource allocation in remote healthcare facilities.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARxPiKnzVbR-dwmhnXtt0zqLrmP_wZnzo0WJccYFJmcmU_-b7dt-wJ0cWqmDpZW7rGlHKXLJT2Axv3pGP6HX_oO-DxVe2RJjlfNjzcR5-FNyMk9KMj22isL4IG3z2hVfrQevi30Vn_7JF9XtK319GBvJ0Siq35TUS87FIUM3Rwq7orSq5VYuZCWJS_6l1FSiKjinMAgjRUSLp2FTTZnYQUU9D_oPVFKViWCxVX8hAeX6sL4BXrAlezdg',
    alt: 'Abstract data visualization showing upward trending graphs in executive blue and teal.',
  },
  {
    id: 6,
    tag: 'Policy',
    readTime: '5 min read',
    title: 'The Impact of Private-Public Partnerships',
    description:
      'Evaluating successful case studies where collaborative funding and governance models have significantly improved healthcare infrastructure and delivery.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDB-2gcRwROcl8yhFAb3x1QNZptb1jpMWcBZ4cxDNBfYi5pqVdohVPau_ifglYv330cBCWuNCQcKNKfJR6lQGuC66huNdiS70e-l6i_qi1xWvAikeTDsfDJSGi_XFgNBfpS4Vh5ujVtFLv2LuXNG5rcINIfEhnokWijLsXTSIPRNCykvSrS9aQW-TRgUEA7kWjeYlRCcI-35umBYt53xPtnilftBRJ_U6DD4EYvqLQNQVB0wbNJILO9aw',
    alt: 'Two executives shaking hands across a boardroom table.',
  },
];

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All Insights');

  return (
    <div className="flex-grow flex flex-col w-full">
      {/* Featured Article */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter bg-surface-container-lowest border border-surface-variant rounded-lg overflow-hidden shadow-sm hover:shadow-[0px_4px_20px_rgba(11,37,69,0.05)] transition-shadow duration-300">
          <div className="lg:col-span-7 h-64 md:h-96 lg:h-auto">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
            <span className="font-label-bold text-label-bold text-secondary uppercase tracking-wider mb-4 block">
              {featuredArticle.tag}
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-6">
              {featuredArticle.title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              {featuredArticle.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold">
                  {featuredArticle.initials}
                </div>
                <span className="font-label-bold text-label-bold text-on-surface">{featuredArticle.author}</span>
              </div>
              <a
                href="#"
                className="inline-flex items-center font-label-bold text-label-bold text-secondary uppercase tracking-wider"
              >
                Read Article
<ArrowRight size={16} className="ml-1" />
</a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-8 border-b border-surface-variant">
        <div className="flex overflow-x-auto pb-4 gap-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-label-bold text-label-bold uppercase tracking-wider whitespace-nowrap pb-1 ${
                activeCategory === cat
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-on-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {articles.map((article) => (
            <div
              key={article.id}
              className="group bg-surface-container-lowest border border-surface-variant rounded flex flex-col overflow-hidden transition-all duration-300 shadow-sm hover:shadow-[0px_4px_20px_rgba(11,37,69,0.05)]"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={article.image}
                  alt={article.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-label-bold text-label-bold text-secondary uppercase tracking-wider">
                    #{article.tag.replace(/\s+/g, '')}
                  </span>
                  <span className="font-label-bold text-label-bold text-outline uppercase">{article.readTime}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-background mb-3">{article.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 flex-grow">{article.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center font-label-bold text-label-bold text-primary uppercase tracking-wider mt-auto"
                >
                  Read More
                  <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-16 bg-surface-container-low border-t border-surface-variant">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-headline-md text-headline-md text-on-background mb-4">Stay Informed</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Subscribe to receive the latest insights on clinical excellence, policy frameworks, and executive leadership
            in healthcare directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-grow bg-surface-container-lowest border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary px-4 py-3 font-body-md text-on-surface outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary font-label-bold text-label-bold uppercase tracking-wider px-8 py-3 hover:bg-on-primary-fixed transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
