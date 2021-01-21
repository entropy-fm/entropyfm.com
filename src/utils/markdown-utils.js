import unified from "unified"
import markdown from "remark-parse"
import breaks from "remark-breaks"
import rehype from "remark-rehype"
import sanitize from "rehype-sanitize"
import html from "rehype-stringify"

/**
 * Helper functions used throughout the site.
 */
export class MarkdownUtils {
  /**
   * Renders markdown to HTML using remark-html.
   * @param {string} value a markdown string to render to HTML.
   * @return {string} an HTML string
   */
  static markdownToHTML(value) {
    return unified()
      .use(markdown)
      .use(breaks)
      .use(rehype)
      .use(sanitize)
      .use(html)
      .processSync(value)
      .toString()
  }
}
