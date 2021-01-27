module.exports = {
  siteMetadata: {
    title: `EntropyFM`,
    description: `EntropyFM`,
    siteUrl: `https://entropyfm.com`,
    email: `entropyfmradio@gmail.com`,
    mixcloud: `https://www.mixcloud.com/entropyfm/`,
    instagram: `https://www.instagram.com/entropyfm/`,
    applyText: `Want to be on air?`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            stage: 0,
          }),
        ],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#121212`,
        theme_color: `#121212`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
  ],
  pathPrefix: `/public`,
}
