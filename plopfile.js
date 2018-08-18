module.exports = plop => {
  // Add new plugin
  plop.setGenerator("plugin", {
    description: "This is sets up the basic files for a new plugin.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "name of new plugin (include the `gatsby-plugin-` prefix)",
        default: "testing"
      },
      {
        type: "input",
        name: "author",
        message:
          "Your name/email for putting in the package.json of the new package",
        default: "Rob Mcfadzean <rob@northxsouth.co>"
      }
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{kebabCase name}}/package.json",
        templateFile: "plop-templates/plugin/package.json.hbs"
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/index.js",
        templateFile: "plop-templates/plugin/index.js.hbs"
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/README.md",
        templateFile: "plop-templates/plugin/README.md.hbs"
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/.babelrc",
        templateFile: "plop-templates/plugin/.babelrc.hbs"
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/.gitignore",
        templateFile: "plop-templates/plugin/.gitignore.hbs"
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/LICENSE",
        templateFile: "plop-templates/plugin/LICENSE.hbs"
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/src/.gitkeep",
        templateFile: "plop-templates/plugin/src/.gitkeep"
      }
    ].filter(Boolean)
  });
};
