const config = {
  siteTitle: "Victory Church", // Site title.
  separator: "|",
  siteTitleShort: "Victory", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Victory Church located on Atlanta Georgia", // Website description used for RSS feeds/meta description tag.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "UA-76678443-1", // GA tracking ID.
  facebookPixel: "",
  disqusShortname: "", // Disqus shortname.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  postsPerPage: 6, // Amount of posts displayed per listing page.

  siteRss: "/rss.xml", // Path to the RSS file.
  siteRssTitle: "Victory RSS feed", // Title of the RSS feed
  userName: "Victory Church", // Username to display in the author segment.
  userEmail: "hello@victoryatl.com", // Email used for RSS feed's author segment
  userLocation: "", // User location to display in the author segment.
  twitterUsername: "@victorychurch", // Optionally renders "Follow Me" in the UserInfo segment.
  
  /* Theming */
    copyright: "Copyright © Victory Church", // Copyright string for the footer of the website and RSS feed.
    themeColor: "#0F0A1B", // Used for setting manifest and progress theme colors.
    backgroundColor: "#f8f8f8", // Used for setting manifest background color.

    /* Layout Configuration */
    watchDetailsViewSidebarBackground: false,
    watchDetailsViewHeroBackground: true,
    
  /* Gatsby Permalinks */
  
    /* Watch */
    watchSlug: "watch",
    watchMessageDetailsSlug: "m",
    watchSeriesDetailsSlug: "s",

    /* News */
    newsPostDetailsSlug: "n",

    /* Events */
    eventPostDetailsSlug: "e",

    /* Pages */
    pagesSlug: 'p',

    /* post */
    blogPostDetailsSlug: "b",

    /* Attachments */
    attachmentSlug: 'd',

    /* Groups */
    groupTypeSlug: "gt",
    groupSlug: "g",

    /* Ministry */
    ministrySlugDetails: "ministry",

    /* Classes */
    classesSlug: "c",
    lessonSlug: "cl",

    /* Serve */
    serveSlug: "s",

  /* Features */
    /* Features Flags */
    menuCampusSelector: true,
    menuLanguageSelector: false,
    hasSearch: true,

    /* Post Configuration */
    blogShowDates: true,
  
};

module.exports = config;