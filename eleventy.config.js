/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("javascripts");

  // Officers sorted by order for use in templates.
  eleventyConfig.addGlobalData("officersSorted", function () {
    const officers = require("./_data/officers.json");
    return [...officers].sort((a, b) => (a.order || 99) - (b.order || 99));
  });

  // Do not process existing raw HTML as templates; we use .njk to generate output.
  eleventyConfig.ignores.add("officers/index.html");
  eleventyConfig.ignores.add("officers/*/index.html");
  eleventyConfig.ignores.add("projects/index.html");
  eleventyConfig.ignores.add("shack/equipment/index.html");
  eleventyConfig.ignores.add("index.html");

  // Inject "last updated" at build time (replaces processDates.sh for built output).
  eleventyConfig.addShortcode("gitLastCommitDate", function () {
    const { execSync } = require("child_process");
    try {
      return execSync('git log -1 --format=%cd --date=format:"%B %-d, %Y."', { encoding: "utf-8" }).trim();
    } catch {
      return "";
    }
  });

  return {
    dir: { input: ".", output: "_site", data: "_data", includes: "_includes" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
