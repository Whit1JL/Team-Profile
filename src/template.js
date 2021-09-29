const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  html.push(...employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replaceDefault(template, "name", manager.getName());
  template = replaceDefault(template, "role", manager.getRole());
  template = replaceDefault(template, "email", manager.getEmail());
  template = replaceDefault(template, "id", manager.getId());
  template = replaceDefault(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replaceDefault(template, "name", engineer.getName());
  template = replaceDefault(template, "role", engineer.getRole());
  template = replaceDefault(template, "email", engineer.getEmail());
  template = replaceDefault(template, "id", engineer.getId());
  template = replaceDefault(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replaceDefault(template, "name", intern.getName());
  template = replaceDefault(template, "role", intern.getRole());
  template = replaceDefault(template, "email", intern.getEmail());
  template = replaceDefault(template, "id", intern.getId());
  template = replaceDefault(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replaceDefault(template, "team", html);
};

const replaceDefault = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;