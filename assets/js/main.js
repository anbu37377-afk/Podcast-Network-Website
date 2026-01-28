const navLinks = document.querySelector(".nav-links");
const toggle = document.querySelector(".menu-toggle");
const themeToggles = document.querySelectorAll(".theme-toggle");
const root = document.documentElement;
const themeIcons = {
  light:
    '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="currentColor"></circle><path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.2 4.2L6.3 6.3M17.7 17.7L19.8 19.8M4.2 19.8L6.3 17.7M17.7 6.3L19.8 4.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
  dark:
    '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.8C19.2 15.5 17.7 15.9 16.1 15.9C11.8 15.9 8.3 12.4 8.3 8.1C8.3 6.5 8.7 5 9.4 3.7C6 4.7 3.5 7.9 3.5 11.7C3.5 16.3 7.2 20 11.8 20C15.6 20 18.8 17.5 20.5 14.8Z" fill="currentColor"></path></svg>',
};

if (themeToggles.length) {
  const syncThemeToggles = (theme) => {
    themeToggles.forEach((toggleButton) => {
      toggleButton.innerHTML = themeIcons[theme];
      toggleButton.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    });
  };

  const applyTheme = (theme) => {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
    syncThemeToggles(theme);
  };

  const storedTheme = localStorage.getItem("theme");
  const initialTheme = storedTheme === "dark" ? "dark" : "light";
  applyTheme(initialTheme);

  themeToggles.forEach((toggleButton) => {
    toggleButton.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  });
}

const viewTransitionMs = 250;

const updateUrlParam = (key, value, { replace = false } = {}) => {
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }
  const method = replace ? "replaceState" : "pushState";
  window.history[method]({}, "", url);
};

const swapViews = (listView, detailView, showDetail) => {
  if (!listView || !detailView) return;
  const showEl = showDetail ? detailView : listView;
  const hideEl = showDetail ? listView : detailView;

  if (hideEl._hideTimeout) {
    window.clearTimeout(hideEl._hideTimeout);
  }
  if (showEl._hideTimeout) {
    window.clearTimeout(showEl._hideTimeout);
  }

  hideEl.classList.add("is-hidden");
  hideEl.setAttribute("aria-hidden", "true");
  hideEl._hideTimeout = window.setTimeout(() => {
    hideEl.setAttribute("hidden", "");
  }, viewTransitionMs);

  showEl.removeAttribute("hidden");
  window.requestAnimationFrame(() => {
    showEl.classList.remove("is-hidden");
    showEl.setAttribute("aria-hidden", "false");
  });
};

const scrollToView = (viewEl) => {
  if (!viewEl) return;
  const offsetTop = viewEl.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top: Math.max(0, offsetTop), behavior: "smooth" });
};

const pricingPlans = {
  "starter-creator": {
    type: "creator",
    title: "Starter Creator Plan",
    summary: "Launch support for brand new shows and first-time hosts.",
    name: "Starter Creator",
    tagline: "Best for new shows launching their first season.",
    price: "$39",
    period: "/month",
    description:
      "Build confidence with distribution, launch prep, and a lightweight support plan that keeps your release schedule steady.",
    features: [
      "Distribution to major platforms",
      "Monthly promo placement",
      "Basic analytics",
      "Launch checklist + trailer review",
    ],
    meta: [
      { label: "Ideal for", value: "1-2 episode drops per month" },
      { label: "Support", value: "Launch checklist + email" },
      { label: "Reporting", value: "Monthly performance recap" },
      { label: "Setup time", value: "7-day onboarding" },
    ],
    highlights: [
      "Launch checklist + trailer review",
      "Monthly promo placement",
      "Basic analytics",
      "Distribution to major platforms",
    ],
  },
  "growth-creator": {
    type: "creator",
    title: "Growth Creator Plan",
    summary: "Scale distribution and engage your audience every week.",
    name: "Growth Creator",
    tagline: "Perfect for established shows ready to scale.",
    price: "$79",
    period: "/month",
    description:
      "Level up with weekly promo placements, deeper audience insights, and a quarterly sprint built to push subscriber growth.",
    features: [
      "Weekly promo placement",
      "Audience segmentation",
      "Host-read ad access",
      "Quarterly growth sprint",
    ],
    meta: [
      { label: "Ideal for", value: "Weekly releases and guest rotations" },
      { label: "Support", value: "Quarterly growth sprint" },
      { label: "Reporting", value: "Bi-weekly insights" },
      { label: "Add-ons", value: "Host-read ad access" },
    ],
    highlights: [
      "Weekly promo placement",
      "Audience segmentation",
      "Quarterly growth sprint",
      "Host-read ad access",
    ],
  },
  "pro-creator": {
    type: "creator",
    title: "Pro Creator Plan",
    summary: "Analytics-led growth with deeper audience research.",
    name: "Pro Creator",
    tagline: "Analytics-led growth with monetization coaching.",
    price: "$109",
    period: "/month",
    description:
      "Pair audience research with monetization coaching and promo swaps to build predictable, sustained growth.",
    features: [
      "Listener survey toolkit",
      "Advanced segmentation",
      "Promo swap coordination",
      "Monetization workshops",
    ],
    meta: [
      { label: "Ideal for", value: "Bi-weekly drops + collaborations" },
      { label: "Support", value: "Monthly strategy review" },
      { label: "Reporting", value: "Cohort-level insights" },
      { label: "Add-ons", value: "Monetization workshops" },
    ],
    highlights: [
      "Advanced segmentation",
      "Monetization workshops",
      "Listener survey toolkit",
      "Promo swap coordination",
    ],
  },
  "studio-creator": {
    type: "creator",
    title: "Studio Creator Plan",
    summary: "Full-service production and premium network access.",
    name: "Studio Creator",
    tagline: "Full-service support and on-site studio access.",
    price: "$149",
    period: "/month",
    description:
      "Get a dedicated producer, premium analytics, and on-site studio time to keep every episode sounding sharp.",
    features: [
      "Production team support",
      "Premium analytics",
      "Live event packages",
      "Guest booking support",
    ],
    meta: [
      { label: "Ideal for", value: "Teams recording multiple shows" },
      { label: "Support", value: "Dedicated producer access" },
      { label: "Studio access", value: "Unlimited sessions" },
      { label: "Extras", value: "Guest booking support" },
    ],
    highlights: [
      "Dedicated producer access",
      "Unlimited studio sessions",
      "Premium analytics",
      "Guest booking support",
    ],
  },
  "starter-sponsor": {
    type: "sponsor",
    title: "Starter Sponsor Plan",
    summary: "Entry-level sponsorships with trusted host placements.",
    name: "Starter Sponsor",
    tagline: "Host-read placements across two shows.",
    price: "$199",
    period: "/month",
    description:
      "Test campaigns with targeted placements, brand safety review, and a monthly performance recap.",
    features: [
      "Targeted placements",
      "Campaign planning",
      "Monthly performance recap",
      "Brand safety checklist",
    ],
    meta: [
      { label: "Ideal for", value: "Seasonal launches and pilot tests" },
      { label: "Support", value: "Campaign planning" },
      { label: "Reporting", value: "Monthly performance recap" },
      { label: "Channels", value: "Two-show placements" },
    ],
    highlights: [
      "Targeted placements",
      "Campaign planning",
      "Monthly performance recap",
      "Brand safety checklist",
    ],
  },
  "growth-sponsor": {
    type: "sponsor",
    title: "Growth Sponsor Plan",
    summary: "Multi-show placements with creative iteration support.",
    name: "Growth Sponsor",
    tagline: "Multi-show placements with creative support.",
    price: "$399",
    period: "/month",
    description:
      "Scale with custom host scripts, weekly reporting, and experimentation to sharpen campaign performance.",
    features: [
      "Audience matching",
      "Custom host scripts",
      "Weekly reporting",
      "Creative testing options",
    ],
    meta: [
      { label: "Ideal for", value: "Full-season activations" },
      { label: "Support", value: "Creative testing options" },
      { label: "Reporting", value: "Weekly reporting" },
      { label: "Reach", value: "Multi-show placements" },
    ],
    highlights: [
      "Custom host scripts",
      "Weekly reporting",
      "Creative testing options",
      "Audience matching",
    ],
  },
  "signature-sponsor": {
    type: "sponsor",
    title: "Signature Sponsor Plan",
    summary: "Premium storytelling with co-branded moments.",
    name: "Signature Sponsor",
    tagline: "Premium storytelling with co-branded moments.",
    price: "$1,199",
    period: "/month",
    description:
      "Create premium sponsor moments with co-branded minisodes, custom landing pages, and deep audience research.",
    features: [
      "Co-branded minisodes",
      "Custom landing pages",
      "Quarterly audience research",
      "Executive performance briefs",
    ],
    meta: [
      { label: "Ideal for", value: "Long-term brand partnerships" },
      { label: "Support", value: "Dedicated creative producer" },
      { label: "Reporting", value: "Executive performance briefs" },
      { label: "Reach", value: "Premium episode takeovers" },
    ],
    highlights: [
      "Co-branded minisodes",
      "Custom landing pages",
      "Quarterly audience research",
      "Executive performance briefs",
    ],
  },
  "network-sponsor": {
    type: "sponsor",
    title: "Network Sponsor Plan",
    summary: "Premium visibility across the full EchoGrid network.",
    name: "Network Sponsor",
    tagline: "Network-wide reach and premium visibility.",
    price: "$799",
    period: "/month",
    description:
      "Own the network with branded episode series, cross-platform promos, and a dedicated account manager.",
    features: [
      "Live event integrations",
      "Branded episode series",
      "Dedicated account manager",
      "Cross-platform promo slots",
    ],
    meta: [
      { label: "Ideal for", value: "Category takeovers and launches" },
      { label: "Support", value: "Dedicated account manager" },
      { label: "Reporting", value: "Weekly performance syncs" },
      { label: "Reach", value: "Network-wide visibility" },
    ],
    highlights: [
      "Branded episode series",
      "Dedicated account manager",
      "Cross-platform promo slots",
      "Live event integrations",
    ],
  },
};

const pricingCards = document.querySelectorAll(".price-card[data-plan]");
if (pricingCards.length) {
  pricingCards.forEach((card) => {
    const planId = card.dataset.plan;
    const navigateFromCard = () => {
      if (!planId) return;
      if (pricingPlans[planId]?.type === "creator") {
        window.location.href = `pricing-details.html?plan=${planId}`;
        return;
      }
      const fallbackLink = card.querySelector(".plan-cta a");
      if (fallbackLink) {
        window.location.href = fallbackLink.getAttribute("href");
      }
    };
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      navigateFromCard();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      navigateFromCard();
    });
  });
}

const pricingDetailsPage = document.querySelector("[data-pricing-details]");
if (pricingDetailsPage) {
  const detailTitle = document.getElementById("detail-title");
  const detailSummary = document.getElementById("detail-summary");
  const detailPlanName = document.getElementById("detail-plan-name");
  const detailPlanTagline = document.getElementById("detail-plan-tagline");
  const detailPlanPrice = document.getElementById("detail-plan-price");
  const planTitle = document.getElementById("plan-title");
  const planSummary = document.getElementById("plan-summary");
  const planDescription = document.getElementById("plan-description");
  const planFeatureList = document.getElementById("plan-feature-list");
  const planHighlights = document.getElementById("plan-highlights");
  const planMeta = document.getElementById("plan-meta");

  const setPrice = (el, price, period) => {
    if (!el) return;
    el.textContent = price;
    const small = document.createElement("small");
    small.textContent = period;
    el.append(" ", small);
  };

  const renderPricingDetails = (planId) => {
    const fallbackId = "starter-creator";
    const selectedId = pricingPlans[planId] ? planId : fallbackId;
    const plan = pricingPlans[selectedId];
    if (!plan) return;

    if (detailTitle) {
      detailTitle.textContent = `${plan.name} Details`;
    }
    if (detailSummary) {
      detailSummary.textContent = plan.summary;
    }
    if (detailPlanName) {
      detailPlanName.textContent = plan.name;
    }
    if (detailPlanTagline) {
      detailPlanTagline.textContent = plan.tagline;
    }
    setPrice(detailPlanPrice, plan.price, plan.period);

    if (planTitle) {
      planTitle.textContent = plan.title;
    }
    if (planSummary) {
      planSummary.textContent = plan.summary;
    }
    if (planDescription) {
      planDescription.textContent = plan.description;
    }

    if (planFeatureList) {
      planFeatureList.innerHTML = "";
      plan.features.forEach((feature) => {
        const item = document.createElement("li");
        item.textContent = feature;
        planFeatureList.appendChild(item);
      });
    }

    if (planHighlights) {
      planHighlights.innerHTML = "";
      const highlights =
        plan.highlights && plan.highlights.length ? plan.highlights : plan.features.slice(0, 3);
      highlights.forEach((highlight) => {
        const item = document.createElement("li");
        item.textContent = highlight;
        planHighlights.appendChild(item);
      });
    }

    if (planMeta) {
      planMeta.innerHTML = "";
      plan.meta.forEach((metaItem) => {
        const wrapper = document.createElement("div");
        const heading = document.createElement("h4");
        const value = document.createElement("p");
        heading.textContent = metaItem.label;
        value.textContent = metaItem.value;
        wrapper.appendChild(heading);
        wrapper.appendChild(value);
        planMeta.appendChild(wrapper);
      });
    }
  };

  const planId = new URLSearchParams(window.location.search).get("plan");
  renderPricingDetails(planId);
}

const blogPosts = {
  "community-rituals": {
    title: "How Listener Communities Grow Around Shared Rituals",
    subtitle: "Routines that keep audiences returning week after week.",
    category: "Podcast News",
    date: "Jan 14, 2024",
    author: "Jules Harper",
    authorRole: "Community Editor",
    authorImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653a5?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Podcast news article cover",
    excerpt: "From weekly drops to live sessions, routines keep audiences engaged.",
    content: [
      "Rituals turn casual listeners into regulars. The most trusted shows in our network anchor their calendars with consistent drops and recognizable segment cues.",
      "When audiences know exactly when to expect an episode, they are more likely to plan around it, share it, and participate in community touchpoints.",
      "Beyond release schedules, small rituals like pre-roll greetings and listener shout-outs make fans feel part of the show, not just an audience.",
      "Start small with a repeatable cadence, then add moments that celebrate listener wins and create a sense of belonging.",
      "Listener rituals grow faster when you reinforce them in newsletters, social channels, and live events.",
      "Track which segments spark replies or shares, then double down on those rituals across seasons.",
    ],
    related: ["live-roundtable", "listener-memberships", "sponsor-briefs"],
  },
  "live-roundtable": {
    title: "Inside the Studio: Crafting a Live Roundtable",
    subtitle: "How our producers prep, pace, and keep live conversations sharp.",
    category: "Episode Highlight",
    date: "Jan 10, 2024",
    author: "Amira Yates",
    authorRole: "Senior Producer",
    authorImage: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Episode highlight article cover",
    excerpt: "We break down the prep, pacing, and production behind our live pods.",
    content: [
      "Live roundtables feel spontaneous, but the best ones are intentionally structured. We begin with a tight run-of-show and clear segment timings.",
      "Each guest receives a briefing with the key questions, the pacing goals, and the roles they play in the conversation.",
      "During recording, we keep energy high with short resets, clear handoffs, and a producer-led signal system.",
      "Post-session, our editors polish the flow while preserving the authentic rhythm that makes live shows feel electric.",
      "We also prepare backup prompts so guests can jump in without waiting for a hard handoff.",
      "After release, we review retention graphs to spot dips and refine the pacing for the next session.",
    ],
    related: ["community-rituals", "sonic-identity", "global-distribution"],
  },
  "listener-memberships": {
    title: "Five Ways to Turn Listeners into Members",
    subtitle: "Make benefits feel personal, immediate, and aligned with your mission.",
    category: "Creator Tips",
    date: "Jan 06, 2024",
    author: "Kenji Matos",
    authorRole: "Growth Lead",
    authorImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Podcast tips article cover",
    excerpt: "Memberships work when the benefits feel personal and immediate.",
    content: [
      "Memberships succeed when fans know exactly what they are getting today, not just what might come later.",
      "Offer early access, bonus segments, or behind-the-scenes voice notes that feel tailored to your most loyal listeners.",
      "Keep onboarding simple with a short welcome message and a clear reminder of how to stay involved.",
      "The most sustainable membership programs mix exclusive content with community touchpoints that keep members connected to each other.",
      "Set clear expectations on cadence so members know when to look for exclusives.",
      "Celebrate members publicly with thank-yous that feel personal, not transactional.",
    ],
    related: ["community-rituals", "sponsor-briefs", "global-distribution"],
  },
  "sonic-identity": {
    title: "Designing a Sonic Identity for Your Show",
    subtitle: "Music beds, transitions, and pacing that listeners recognize instantly.",
    category: "Production",
    date: "Jan 02, 2024",
    author: "Rina Castillo",
    authorRole: "Audio Director",
    authorImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653a5?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Podcast production article cover",
    excerpt: "Music beds, transitions, and pacing that listeners recognize instantly.",
    content: [
      "A sonic identity is more than an intro track. It is the set of cues that help listeners recognize your show within seconds.",
      "Start with a consistent intro and outro, then build a palette of stingers and transitions that reflect your tone.",
      "Pacing is part of the sound. Leave space between thoughts, tighten edits, and keep the rhythm consistent across episodes.",
      "When your sonic palette is cohesive, listeners feel grounded and your storytelling becomes more memorable.",
      "Test your sonic palette across headphones, cars, and smart speakers to ensure clarity.",
      "Document your sonic rules so guest producers and editors keep the sound consistent.",
    ],
    related: ["live-roundtable", "community-rituals", "global-distribution"],
  },
  "global-distribution": {
    title: "Building a Global Distribution Strategy",
    subtitle: "From platforms to localization, go where your listeners are.",
    category: "Growth",
    date: "Jan 20, 2024",
    author: "Maya Chen",
    authorRole: "Distribution Strategist",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Global distribution article cover",
    excerpt: "From platform rollouts to localization, go where your listeners are.",
    content: [
      "Global growth starts with a clear platform map. Prioritize the top apps in your target regions before expanding to long-tail directories.",
      "Localized show notes and translated episode highlights help listeners discover your content even if the audio stays in your primary language.",
      "Schedule releases based on time zones so international audiences see new episodes at the start of their day, not the end.",
      "Use region-specific callouts to invite reviews, ratings, and feedback that improve local search rankings.",
      "Track listening locations and adjust promo swaps so your marketing matches the markets that are already responding.",
    ],
    related: ["community-rituals", "sonic-identity", "listener-memberships"],
  },
  "sponsor-briefs": {
    title: "Writing Sponsor Briefs Hosts Love",
    subtitle: "Clear goals and creative freedom make better ad reads.",
    category: "Sponsorship",
    date: "Jan 18, 2024",
    author: "Talia Brooks",
    authorRole: "Brand Partnerships",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sponsor brief article cover",
    excerpt: "Clear goals and creative freedom make better ad reads.",
    content: [
      "The strongest sponsor briefs start with a single objective, not a list of competing goals.",
      "Give hosts a clear product story, then let them translate it in their own voice. Authenticity drives performance.",
      "Include three to five must-say points, plus optional talking points for longer reads.",
      "Share success metrics upfront so everyone knows what a winning campaign looks like.",
      "Close with a feedback loop plan so the host can suggest improvements after the first few reads.",
    ],
    related: ["community-rituals", "listener-memberships", "live-roundtable"],
  },
};

const navigateToBlogDetails = (postId) => {
  if (!postId || !blogPosts[postId]) return;
  window.location.href = `blog-details.html?post=${postId}`;
};

const bindBlogCards = () => {
  document.querySelectorAll(".blog-card[data-post]").forEach((card) => {
    if (card.dataset.bound === "true") return;
    card.dataset.bound = "true";
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      navigateToBlogDetails(card.dataset.post);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("a")) return;
      event.preventDefault();
      navigateToBlogDetails(card.dataset.post);
    });
  });
};

bindBlogCards();

const blogDetailsPage = document.querySelector("[data-blog-details]");
if (blogDetailsPage) {
  const blogSubtitle = document.getElementById("blog-subtitle");
  const blogTitle = document.getElementById("blog-title");
  const blogMeta = document.getElementById("blog-meta");
  const blogImage = document.getElementById("blog-image");
  const blogContent = document.getElementById("blog-content");
  const blogAuthorImage = document.getElementById("blog-author-image");
  const blogAuthorName = document.getElementById("blog-author-name");
  const blogAuthorRole = document.getElementById("blog-author-role");
  const relatedList = document.getElementById("related-list");
  const relatedPosts = document.getElementById("related-posts");

  const renderRelatedPosts = (currentId) => {
    if (!relatedList || !relatedPosts) return;
    const current = blogPosts[currentId];
    const relatedIds =
      current && current.related && current.related.length
        ? current.related
        : Object.keys(blogPosts).filter((id) => id !== currentId).slice(0, 3);

    relatedList.innerHTML = "";
    relatedPosts.innerHTML = "";

    relatedIds.forEach((postId) => {
      const post = blogPosts[postId];
      if (!post) return;
      const link = document.createElement("a");
      link.textContent = post.title;
      link.setAttribute("href", `blog-details.html?post=${postId}`);
      link.dataset.post = postId;
      relatedList.appendChild(link);

      const card = document.createElement("article");
      card.className = "blog-card";
      card.dataset.post = postId;
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Read ${post.title}`);

      const image = document.createElement("img");
      image.src = post.image;
      image.alt = post.imageAlt;

      const content = document.createElement("div");
      content.className = "content";

      const meta = document.createElement("div");
      meta.className = "meta";
      [post.category, post.date, `By ${post.author}`].forEach((metaText) => {
        const span = document.createElement("span");
        span.textContent = metaText;
        meta.appendChild(span);
      });

      const heading = document.createElement("h3");
      heading.textContent = post.title;

      const excerpt = document.createElement("p");
      excerpt.textContent = post.excerpt;

      const button = document.createElement("a");
      button.className = "btn btn-outline";
      button.setAttribute("href", `blog-details.html?post=${postId}`);
      button.textContent = "Read Article";

      content.appendChild(meta);
      content.appendChild(heading);
      content.appendChild(excerpt);
      content.appendChild(button);

      card.appendChild(image);
      card.appendChild(content);
      relatedPosts.appendChild(card);
    });
  };

  const renderBlogPost = (postId) => {
    const fallbackId = Object.keys(blogPosts)[0];
    const selectedId = blogPosts[postId] ? postId : fallbackId;
    const post = blogPosts[selectedId];
    if (!post || !blogTitle || !blogMeta || !blogImage || !blogContent) return;

    if (blogSubtitle) {
      blogSubtitle.textContent = post.subtitle;
    }
    blogTitle.textContent = post.title;
    blogMeta.innerHTML = "";
    [post.category, post.date, `By ${post.author}`].forEach((metaText) => {
      const span = document.createElement("span");
      span.textContent = metaText;
      blogMeta.appendChild(span);
    });

    blogImage.src = post.image;
    blogImage.alt = post.imageAlt;
    blogContent.innerHTML = "";
    post.content.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      blogContent.appendChild(p);
    });

    if (blogAuthorImage) {
      blogAuthorImage.src = post.authorImage;
      blogAuthorImage.alt = `${post.author} portrait`;
    }
    if (blogAuthorName) {
      blogAuthorName.textContent = post.author;
    }
    if (blogAuthorRole) {
      blogAuthorRole.textContent = post.authorRole;
    }

    renderRelatedPosts(selectedId);
    bindBlogCards();
  };

  const postId = new URLSearchParams(window.location.search).get("post");
  renderBlogPost(postId);
}

// Entrance animations (fade + slide + bloom)
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const candidates = document.querySelectorAll(
    "main section, .card, .price-card, .blog-card, .hero-card, .feature, .form-card, .episode-row, .cta-banner, .story-block, .stats .stat, .blog-article, .blog-aside, .plan-detail .form-card, .plan-detail aside, .plan-detail article"
  );

  const reveal = (el) => {
    el.classList.add("reveal");
  };

  candidates.forEach(reveal);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  candidates.forEach((el) => io.observe(el));

  window.addEventListener("load", () => {
    candidates.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add("is-visible");
        io.unobserve(el);
      }
    });
  });
})();

// unified Menu functionality for premium drawer
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelector(".nav-links");
  const menuToggles = document.querySelectorAll(".menu-toggle");
  const closeNavBtn = document.querySelector(".close-nav-toggle");

  if (navLinks) {
    menuToggles.forEach(toggle => {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        navLinks.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scroll
      });
    });

    const closeMenu = () => {
      navLinks.classList.remove("active");
      document.body.style.overflow = ""; // Restore scroll
    };

    if (closeNavBtn) {
      closeNavBtn.addEventListener("click", closeMenu);
    }

    // Click outside to close menu
    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        ![...menuToggles].some(toggle => toggle.contains(e.target))
      ) {
        closeMenu();
      }
    });

    // Handle Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("active")) {
        closeMenu();
      }
    });
  }
});
