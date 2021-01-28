import { useStaticQuery, graphql } from "gatsby"
export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            siteUrl
            email
            instagram
            mixcloud
            applyText
            offlineText
            livestreamUrl
            livestreamMetadata
            mixcloudApi
          }
        }
      }
    `
  )
  return site.siteMetadata
}
