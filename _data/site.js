// Single source for "site" so GitHub Pages env (PATH_PREFIX, SITE_URL) wins when set.
const base = require("./site.base.json");

function getSite() {
  const pathPrefix = process.env.PATH_PREFIX || "";
  const siteUrl =
    process.env.SITE_URL ||
    (process.env.GITHUB_REPOSITORY
      ? (() => {
          const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
          return owner && repo ? `https://${owner}.github.io/${repo}` : base.url;
        })()
      : base.url);
  return {
    ...base,
    baseUrl: pathPrefix || base.baseUrl || "",
    url: siteUrl,
  };
}

module.exports = getSite;
