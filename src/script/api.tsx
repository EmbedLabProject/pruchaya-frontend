export async function getProblems(){
    const results = await fetch(`http://localhost:3222/problems`).then(r => (r.json()));
    return results;
}
