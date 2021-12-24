const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // collection team
  eleventyConfig.addCollection("team", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/content/team/**/*.md")
      .sort((a, b) => a.data.surname.localeCompare(b.data.surname));
  });

  // collection blogposts
  eleventyConfig.addCollection("blogposts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/content/blogposts/**/*.md")
      .reverse();
  });

  // filter dateFull (Luxon)
  eleventyConfig.addFilter("dateFull", function (jsDate, locale = "en") {
    let dt = DateTime.fromJSDate(jsDate);
    return dt.setLocale(locale).toLocaleString(DateTime.DATE_FULL);
  });

  // filter dateISO (Luxon)
  eleventyConfig.addFilter("dateISO", function (jsDate) {
    let dt = DateTime.fromJSDate(jsDate);
    return dt.toISODate();
  });

  // shortcode video
  eleventyConfig.addShortcode("video", function (videoId) {
    return `<iframe src="https://www.youtube.com/embed/${videoId}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });

  // copy files
  eleventyConfig.addPassthroughCopy("./src/assets/img");

  // override default config
  return {
    dir: {
      input: "src",
      output: "dist",
      // processer d'abord les fichiers markdown avec nunjucks avant de les transformer en HTML
      markdownTemplateEngine: "njk",
    },
  };
};
