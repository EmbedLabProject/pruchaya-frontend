import { list } from "postcss";

const BACKEND_URL = "http://localhost:3222"


export async function getProblems(){
    const results = await fetch(`${BACKEND_URL}/problems`,
    {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
    }
    ).then(r => r.json());
    console.log(results);
    return results;
}

export async function setProbStatus(ticket_id: string, status: string){
  await fetch(`${BACKEND_URL}/problems/setStatus`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ticket_id: ticket_id, status: status}),
  });
}

export async function getProbStatus(ticket_id: string){
  const result = await fetch(`${BACKEND_URL}/problems/getStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ticket_id: ticket_id}),
  }).then(r => (r.json()));
  return result;
}

export async function getSpecies(imageFile:(File|null)[]) {
  // const base64Strings = [];
  let test
  const base64Strings: string[] = [];
  console.log(imageFile)
  const file = imageFile[0]
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      test = {image1: base64String}
    };
    reader.readAsDataURL(file);
  }
  // imageFile.forEach((file) => {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const base64String = reader.result as string;
  //       base64Strings.push(base64String);
  //     };
  //     reader.readAsDataURL(file);
      
  //   }
  // });
  // console.log(base64Strings)
  // const test1 = {image1: base64Strings[1]}
  // console.log(["mon","book","mark","tt"])
  console.log(JSON.stringify(test))
  console.log(test)
  console.log(JSON.stringify({imageString:base64Strings[0]}))
  const result = await fetch(`${BACKEND_URL}/plant/getSpecies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({imageString:base64Strings}),  
  }).then(r => (r.json()));
  return result;
}

export async function sendPrompt(prompt: string){
  await fetch(`${BACKEND_URL}/chatbot/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({prompt: prompt}),
  });
}

export async function getSensorData(params:number) {
  const result = await fetch(`${BACKEND_URL}/chatbot/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({prompt: prompt}),
  });
  return result
}
