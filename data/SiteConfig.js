const config = {
  wordpressUri: 'https://cms.victorychur.ch/graphql',
  siteTitle: "Victory Church", // Site title.
  separator: "|",
  siteTitleShort: "Victory", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://new.victoryatl.com", // Domain of your website without pathPrefix.
  canonicalUrl: "https://victoryatl.com",
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
    /* List view */
    watchMessageListSlug: "/watch/messages/list",
    watchSerieListSlug: "/watch/series/list",
    blogPostListSlug: "/blog",
    newsPostListSlug: "/news",
    eventsPostListSlug: "/events",

    /* Details view */
    watchSlug: "watch",
    watchMessageDetailsSlug: "message",
    watchSeriesDetailsSlug: "series",
    blogPostDetailsSlug: "blog",
    newsPostDetailsSlug: "news",
    eventPostDetailsSlug: "events",

    /* Pages */
    pagesSlug: 'page',

  /* Social */
    /* Menu subscribe */
    mailChimpUrl: "https://victoryatl.us6.list-manage.com/subscribe/post?u=3b7891d118a85a8202d7cead5&id=8a2be25566",


  /* Features */
    /* Features Flags */
    menuCampusSelector: true,
    menuLanguageSelector: false,
    hasSearch: true,

    /* Post Configuration */
    blogShowDates: true,
  
};

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;