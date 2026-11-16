export interface AuthorProfile {
  id: number;
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  articleCount?: number;
}

export const KNOWN_AUTHORS: Record<string, AuthorProfile> = {
  'ashish-chauhan': {
    id: 1,
    slug: 'ashish-chauhan',
    name: 'Ashish Chauhan',
    role: 'Co-Founder & COO at Vegnar Greens | Eco Entrepreneur',
    bio: "As Co-Founder & COO of Vegnar, I lead operations and global strategy for our biodegradable product exports, driving B2B growth and contributing to India's international trade ecosystem.",
    avatar: '/assets/1720693421250.jfif',
    linkedin: 'https://www.linkedin.com/in/ashiishchauhan/',
  },
  'vegnar-greens': {
    id: 3,
    slug: 'vegnar-greens',
    name: 'Vegnar Greens',
    role: 'Editorial Team & Eco-Packaging Specialists',
    bio: 'Insights, guides, and industry analysis on sustainable sugarcane bagasse tableware, eco-friendly food packaging, and green living from the Vegnar Green team.',
    avatar: '/assets/img/vegnar-green.png',
    linkedin: 'https://www.linkedin.com/company/vegnar-green',
  },
  'tushar-hirani': {
    id: 2,
    slug: 'tushar-hirani',
    name: 'Tushar Hirani',
    role: 'Co-Founder & Sales Director at Vegnar Greens | Eco Entrepreneur',
    bio: 'As Sales Director at Vegnar Greens, I lead our global sales and export strategies connecting Indian eco-friendly innovations with international buyers.',
    avatar: '/assets/1745051915695.jfif',
    linkedin: 'https://www.linkedin.com/in/hiranitushar/',
  },
};

export const AUTHOR_ALIASES: Record<string, string> = {
  '1': 'ashish-chauhan',
  'chauhanashish360gmail-com': 'ashish-chauhan',
  'chauhanashish360@gmail.com': 'ashish-chauhan',
  'ashish-chauhan': 'ashish-chauhan',
  'ashish': 'ashish-chauhan',

  '3': 'vegnar-greens',
  'meet': 'vegnar-greens',
  'vegnar-greens': 'vegnar-greens',
  'vegnar-green': 'vegnar-greens',
  'vegnar': 'vegnar-greens',

  '2': 'tushar-hirani',
  'tushar-hirani': 'tushar-hirani',
  'tushar': 'tushar-hirani',
};

export function getAuthorProfile(identifier: string | number): AuthorProfile {
  const key = String(identifier).toLowerCase().trim();
  const canonicalSlug = AUTHOR_ALIASES[key] || key;

  if (KNOWN_AUTHORS[canonicalSlug]) {
    return KNOWN_AUTHORS[canonicalSlug];
  }

  // Fallback for unknown author ID or slug
  return {
    id: typeof identifier === 'number' ? identifier : 0,
    slug: canonicalSlug,
    name: key.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    role: 'Contributor at Vegnar Green',
    bio: 'Author and contributor at Vegnar Green sharing insights on sustainable living and biodegradable products.',
    avatar: '/assets/img/vegnar-green.png',
  };
}

export function getAuthorFromPost(post: any): AuthorProfile {
  if (post?.author) {
    const profile = getAuthorProfile(post.author);
    if (profile && profile.id === post.author) {
      return profile;
    }
  }

  const embedded = post?._embedded?.author?.[0];
  if (embedded) {
    if (embedded.id) return getAuthorProfile(embedded.id);
    if (embedded.slug) return getAuthorProfile(embedded.slug);
    if (embedded.name) return getAuthorProfile(embedded.name);
  }

  return KNOWN_AUTHORS['vegnar-greens'];
}
