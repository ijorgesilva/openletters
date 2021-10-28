const config = {
  // siteTitle: "Victory Church", // Site title.
  // separator: "|",
  // NOT USED AT ALL: siteTitleShort: "Victory", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  // NOT USED AT ALL:siteTitleAlt: "", // Alternative site title for SEO.
  // siteLogo: "", // Logo used for SEO and manifest.
  // pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  // siteDescription: "", // Website description used for RSS feeds/meta description tag.
  // siteFBAppID: "", // FB Application ID for using app insights
  // googleAnalyticsID: "", // GA tracking ID.
  // facebookPixel: "",
  // dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  // siteRss: "/rss.xml", // Path to the RSS file.
  // siteRssTitle: "Victory RSS feed", // Title of the RSS feed
  // userName: "Victory Church", // Username to display in the author segment.
  // userEmail: "hello@victoryatl.com", 
  // userLocation: "", // User location to display in the author segment.
  // twitterUsername: "@victorychurch", // Optionally renders "Follow Me" in the UserInfo segment.
  // themeColor: "#0F0A1B", // Used for setting manifest and progress theme colors.
  // backgroundColor: "#f8f8f8", // Used for setting manifest background color.
  
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