const config = {
  
  /* Misc */
  hitsPerPage: 8, // How many items show per page on page search.

  /* Layout Configuration */
  watchDetailsViewSidebarBackground: false,
  watchDetailsViewHeroBackground: true,
    
  /* Locales */
  dateLocale: 'us',
  dateFormat: 'LLLL d, yyyy',

  /* Gatsby Permalinks */
  
    /* Watch */
      watchSlug: 'watch', // Watch Main Page per Campus: Builds a page at /campus/watch
      watchSlugLatest: 'latest', // Watch Latest archive: Builds a page at /campus/watch/latest
      watchMessageDetailsSlug: 'm', // Message slug: Builds a page at /campus/watch/m/message-slug
      watchSeriesDetailsSlug: 's', // Series slug: Builds a page at /campus/watch/s/series-slug

    /* News */
    newsPostDetailsSlug: 'n',

    /* Events */
    eventPostDetailsSlug: 'e',

    /* Pages */
    pagesSlug: 'p',

    /* post */
    blogPostDetailsSlug: 'b',

    /* Attachments */
    attachmentSlug: 'a',

    /* Group Types */
    groupTypesSlug: 'gt',

    /* Group */
    groupsSlug: 'g',

    /* Ministry */
    ministrySlug: 'd',

    /* Class */
    coursesSlug: 'c',

    /* Lesson */
    lessonSlug: 'cl',

    /* People */
    peopleSlug: 'i',

    /* Volunteering */
    volunteeringSlug: 'v',

    /* Landing Page */
    landingPageSlug: 'l',

    /* Post Configuration */
    blogShowDates: true,
  
    /* 
     * campusPage view list type:
     * 'algolia': Use algolia archiving list
     *  'internal': Use react libraries functions
     */
    archiveMode: 'internal', 

    /* 
     * Activate/Deactivate Features
     * When false the CPT pages will not be created or visible anywhere.
     */
    cpt: {
      createBlogNews: true,
      createWatch: true,
      createEvents: true,
      createMinistries: true,
      createCourses: true,
      createVolunteering: true,
      createGroups: true,
      createAttachments: true,
      createLandingPages: true,
    }

};

module.exports = config;