//Libraries
const inquirer = require('inquirer');
const fs = require('fs');
const art = require('ascii-art');

//Classes
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

let employees = [];

const opening = [
  {
    type: 'input',
    message: art.font('Team Profile Generator', doom, true) + '\nWelcome to the Team Profile Generator. Please enter the name of the team manager:',
    name: 'name'
  },
  {
    type: 'input',
    message: 'Manager ID number:',
    name: 'id'
  },
  {
    type: 'input',
    message: 'Manager email address:',
    name: 'email'
  },
  {
    type: 'input',
    message: 'Manager office number:',
    name: 'office'
  }
];

const options = [
  {
    type: 'list',
    message: 'Please select an employee type to add member to team. If finished adding team members, select Done.',
    choices: ['Engineer', 'Intern', 'Done'],
    name: 'option'
  }
];

const basics = [
  {
    type: 'input',
    message: 'Please enter name of team member:',
    name: 'name'
  },
  {
    type: 'input',
    message: 'Member ID number:',
    name: 'id'
  },
  {
    type: 'input',
    message: 'Member email address:',
    name: 'email'
  }
];

const engineerQ = [
  ...basics,
  {
    type: 'input',
    message: 'Github username:',
    name: 'github'
  }
];

const internQ = [
  ...basics,
  {
    type: 'input',
    message: 'Name of attended institution:',
    name: 'school'
  }
];

function generateHTML() {
  let html = `<!DOCTYPE html>\n
  <html lang="en">\n
  <head>\n
    <meta charset="UTF-8">\n
    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n
    <title>Development Team Page</title>\n
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">\n
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css">\n
  </head>\n
  <body>\n
    <div>\n
      <header class='bg-danger d-flex justify-content-center'>\n
        <h1 class='text-white'>Development Team</h1>\n
      </header>\n
    </div>\n
    <div class='justify-content-center row'>\n`;
    let card = '';
    let cards = '';
  employees.forEach((employee) => {
    let icon;
    let extra;
    if (employee.getRole() === 'Engineer') {
      icon = '<i class="d-inline fas fa-wrench"></i>'
      extra = `<li class="list-group-item">Github: ${employee.github}</li>\n`
    } else if (employee.getRole() === 'Intern') {
      icon = '<i class="fas fa-graduation-cap"></i>'
      extra = `<li class="list-group-item">School: ${employee.school}</li>\n`
    } else if (employee.getRole() === 'Manager') {
      icon = '<i class="fas fa-mug-hot"></i>'
      extra = `<li class="list-group-item">Office Number: ${employee.office}</li>\n`
    } else {
      icon = '';
      extra = '/n';
    };
    card = `<div class="card m-3" style="width: 18rem;">\n
    <div class="bg-primary card-body">\n
      <h5 class="card-title">${employee.name}</h5>\n
      <div>\n
        ${icon}\n
        <h6 class="card-subtitle d-inline mb-2">${employee.getRole()}</h6>\n
      </div>\n
    </div>\n
    <ul class="list-group list-group-flush">\n
      <li class="list-group-item">ID: ${employee.id}</li>\n
      <li class="list-group-item">Email: ${employee.email}</li>\n
      ${extra}
    </ul>\n`;
    cards.concat(card);
  })
  let end = `</div>\n
  </body>\n
  </html>`
  fs.writeFileSync('./dist/index.html', html + cards + end);
}

function newEmployee() {
  inquirer.prompt(options)
  .then((answer) => {
    if(answer.option === 'Engineer') {
      inquirer.prompt(engineerQ)
      .then((answer) => {
        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
        employees.push(engineer);
      })
    } else if (answer.option === 'Intern') {
      inquirer.prompt(internQ)
      .then((answer) => {
        let intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        employees.push(intern);
      })
    } else {
      return
    }
  })
}

function start() {
  inquirer.prompt(opening)
  .then((answers) => {
    let manager = new Manager(answers.name, answers.id, answers.email, answers.office);
    employees.push(manager);
  })
}

start();
newEmployee();
generateHTML();
