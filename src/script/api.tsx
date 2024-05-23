const BACKEND_URL = "https://pruchaya-api.ttontoey.com"


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



export async function sendPrompt(prompt: string){
  const result =  await fetch(`${BACKEND_URL}/chatbot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({prompt: prompt}),
  }).then(r => r.json());
  console.log(result);
  return result;
}


export async function getSensorData(device_id: string){
  const result = await fetch(`${BACKEND_URL}/sensors/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({device_id: device_id}),
  }).then(r => (r.json()));
  return result;
}

