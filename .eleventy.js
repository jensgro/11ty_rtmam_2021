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

  // filter dateFull
  eleventyConfig.addFilter("dateFull", function (jsDate, locale = "en") {
    let dt = DateTime.fromJSDate(jsDate);
    return dt.setLocale(locale).toLocaleString(DateTime.DATE_FULL);
  });

  // filter dateISO
  eleventyConfig.addFilter("dateISO", function (jsDate) {
    let dt = DateTime.fromJSDate(jsDate);
    return dt.toISODate();
  });

  // copy files
  eleventyConfig.addPassthroughCopy("./src/assets/img");

  // override default config
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
