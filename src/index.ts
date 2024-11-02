import { program } from 'commander'
import ora from 'ora';
import Table from "cli-table";
import inquirer from 'inquirer';

interface tableColTypes {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
const showTable = (data: []) => {
  // console.log(data);
  
  // const table = new Table({
  //   head: ["Id", "User Id", "Title", "Completed"],
  //   colWidths: [20, 10, 30, 20],
  // });

  // data.forEach((item:any) => {
  //   table.push([item.id, item.userId, item.title, item.completed]);
  // });

  // console.log(table.toString());
  const prompt = inquirer.createPromptModule();
 prompt([
   {
     type: "list",
     name: "selectedOption",
     message: "Please select an option:",
     choices: data.map((item: any) => ({
       name: item.Name, // displayed option
       value: item.id, // value returned if selected
     })),
   },
 ]).then((answers) => {
   console.log("You selected:", answers.selectedOption);
 });

}
const getData = async () => {
  const spinner = ora("Loading...").start();
  try {
    
    const response = await fetch("http://localhost:3000/employees");
    const data = await response.json();

    spinner.color = "green";
    setTimeout(() => {
      spinner.color = "blue";
    }, 2000)
    
    setTimeout(() => {
      spinner.color = "red";
    }, 4000)

    
    spinner.text = "Fetching todos...";

    setTimeout(() => {
       spinner.succeed("Task complete!");
        showTable(data)
    },6000)
    
  } catch (err) {
    console.log(err)
  }
}
program
  .command("orocli") //.command('orocli <command>')
  .description("Give the command you want to execute")
  // .alias('s')
  .action(() => {
    getData();
  });

program.parse(process.argv)





// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

  // const port = PORT as number
  // console.log(`Server is running on http://localhost:${port}`)
// serve({
//   fetch: app.fetch,
//   port
// })
