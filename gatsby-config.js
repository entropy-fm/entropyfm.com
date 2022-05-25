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
    // URL below is extracted from: http://myradiostream.com/embed/json.php?s=leavemiksalone&nocache=1631632923
    livestreamMetadata: `https://myradiostream.com/embed/statistics.php?s=28&p=26952&name=Entropy+FM&type=scv1`,
    mixcloudApi: `https://api.mixcloud.com/entropyfm/cloudcasts/`,
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
}
