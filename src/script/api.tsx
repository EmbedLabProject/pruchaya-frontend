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
