import { useStaticQuery, graphql } from "gatsby"
export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            siteUrl
            instagram
            mixcloud
            applyText
          }
        }
      }
    `
  )
  return site.siteMetadata
}
