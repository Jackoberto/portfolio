module.exports = function(eleventyConfig) {
  // Pass through copy for static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js/theme.js");

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
