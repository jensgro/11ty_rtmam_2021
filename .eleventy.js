module.exports = function (eleventyConfig) {
  // collections
  eleventyConfig.addCollection("team", function (collection) {
    return collection.getFilteredByGlob("./src/content/team/**/*.md");
  });

  // override default config
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
