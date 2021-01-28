module.exports = {
  siteMetadata: {
    title: `EntropyFM`,
    description: `EntropyFM`,
    siteUrl: `https://entropyfm.com`,
    email: `entropyfmradio@gmail.com`,
    mixcloud: `https://www.mixcloud.com/entropyfm/`,
    instagram: `https://www.instagram.com/entropyfm/`,
    applyText: `Want to be on air?`,
    offlineText: `We're currently offline, check out a previous show below!`,
    livestreamUrl: `https://s28.myradiostream.com/26952/listen.mp3`,
    livestreamMetadata: `https://s28.myradiostream.com/26952/statistics?sid=1&json=1`,
    mixcloudApi: `https://api.mixcloud.com/entropyfm/feed/`,
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
  pathPrefix: `/entropy-fm-redesign`,
}
