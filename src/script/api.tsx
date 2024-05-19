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

export async function getSpecies(image:File[]) {
  const result = await fetch(`${BACKEND_URL}/plant/getSpecies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({image:image}),
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
