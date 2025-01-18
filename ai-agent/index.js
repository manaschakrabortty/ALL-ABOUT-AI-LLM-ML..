import OpenAI from "openai";
import readlineSync from "readline-sync";

const OPENAI_API_KEY =
'API KEY HERE ............';
const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
})


//Tools
function getWeatherDetais(city= ''){
    if (city.toLowerCase() === 'kolkata') return 'The weather  in Kolkata 10°C';
    if (city.toLowerCase() === 'mumbai') return 'The weather  in Mumbai 20°C';
    if (city.toLowerCase() === 'delhi') return 'The weather  in Delhi 30°C';
    if (city.toLowerCase() === 'chennai') return 'The weather  in Chennai 40°C';
    if (city.toLowerCase() === 'bangalore') return 'The weather  in Bangalore 50°C';
    
}


const tools = {
    "getWeatherDetails": getWeatherDetais,
};
//it  understand the promt but it didnot do the real time data it is the problem

// const user ="Hey, what is the weather in Kolkata?";
// client.chat.completions.create({
//     model: "gpt-4",
//     messages: [{role: 'user', content: user}],
// })
// .then((e) => {
//     console.log(e.choices[0].message.content);
// });

const SYSTEM_PROMPT=`
You are an AI Assintant with START,PLAIN, ACTION, Obeservation and output State.
Wait for the user prompt and first PLAN using available tools.
After Planning, Take the action with appropriate tools and wait for Observation based on Action.
Once you get the observations, Return the AI response based on START propmt and observations

Strictly follow the json format as in examples

Available Tools:
- function getWeatherDetails(city: string): string
getWeatherDetails is a function that accepts city name as string and retuns the weather details

Example:
START
{ "type": "user", "user": "What is the sum of weather of kolkata and Mumbai?" }
{ "type": "plan", "plan": "I will call the getWeatherDetails for kolkata" }
{ "type": "action", "function": "getWeatherDetails", "input": "kolkata" }
{ "type": "observation", "observation": "10℃" }
{ "type": "plan", "plan": "I will call getWeatherDetails for Mumbai" }
{ "type": "action", "function": "getWeatherDetails", "input": "mumbai" }
{ "type": "observation", "observation": "20℃" }
{ "type": "output", "output": "The sum of weather of Patiala and Mohali is 30℃" }
`;


// const user ='Hey, what is the weather in Kolkata?';
// async function chat(){
//     const response = await client.chat.completions.create({
//         model: "gpt-4",
//         messages: [
//             {"role": "system", "content": SYSTEM_PROMPT},
//             {role: 'user', content: user}],
//     });
//     console.log(result.choices[0].message.content);
// }   
// chat();

const messages = [{ role: 'system', content: SYSTEM_PROMPT }];

while (true) {
    const query = readlineSync.question('>>');
    const q = {
    type: 'user',
    user: query,
};
messages.push({ role: 'user', content: JSON.stringify(q) });

while (true) {
    const chat = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
        response_format: {type: 'json_object'},
    });

    const result =chat.choices[0].message.content;  
    messages.push({ role: 'assistant', content: result});


    const call = JSON.parse(result);

    if (call.type === 'output') {
        console.log(`🤖: ${call.outpu}`);
        break;
    }else if (call.type === 'action') {
        const fn = tools[call.function];
        const observation = fn(call.input);
        const obs ={ type: 'observation', observation: observation};
        messages.push({ role: 'developer', content: JSON.stringify(obs)});
    }
    }
}





























