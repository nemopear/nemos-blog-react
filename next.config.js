const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
   images: {
    domains: ["media.graphcms.com"]
  },
});
