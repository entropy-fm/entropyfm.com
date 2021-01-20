exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /gapi-script/,
            use: loaders.null(),
          },
          {
            test: /icecast-parser/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
