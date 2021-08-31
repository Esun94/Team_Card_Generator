const Manager = require("./Lib/Manager");
const Engineer = require("./Lib/Engineer");
const Intern = require("./Lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Rendering function
// const render = require("./Lib/htmlRenderer");
// Alternative rendering function
const render = require("./lib/page-template.js");


const teamMembers = [];
// Create an id array to store the ids.
// This array will be used to check the potential duplicate id newly entered by user
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
        type: "input",
        name: "manName",
        message: "Please enter managers name"
      },
      {
        type: "input",
        name: "manId",
        message: "Please enter managers ID"
      },
      {
        type: "input",
        name: "manEmail",
        message: "Please enter managers email"
      },
      {
        type: "input",
        name: "manOffice",
        message: "Please enter managers office number"
      }

    ]).then(answers => {
      const manager = new Manager(answers.manName, answers.manId, answers.manEmail, answers.manOffice);
      teamMembers.push(manager);
      idArray.push(answers.manId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engName",
        message: "Please enter engineer's name"
      },
      {
        type: "input",
        name: "engId",
        message: "Please enter engineer's ID"
      },
      {
        type: "input",
        name: "engEmail",
        message: "Please enter engineer's email"
      },
      {
        type: "input",
        name: "engGithub",
        message: "Please enter engineer's office number"
      }

    ]).then(answers => {
      const engineer = new Engineer(answers.engName, answers.engId, answers.engEmail, answers.engGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engId);
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "Please enter intern's name"
      },
      {
        type: "input",
        name: "internId",
        message: "Please enter intern's ID"
      },
      {
        type: "input",
        name: "internEmail",
        message: "Please enter intern's email"
      },
      {
        type: "input",
        name: "internSchool",
        message: "Please enter intern's school"
      }

    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();
