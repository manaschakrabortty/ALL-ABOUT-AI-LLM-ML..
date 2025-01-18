// import OpenAI from "openai";
// import readlineSync from "readline-sync";

// const OPENAI_API_KEY = 'your-api-key-here'; // Replace with your API key
// const client = new OpenAI({ apiKey: OPENAI_API_KEY });

// // Tools
// function getWeatherDetails(city = '') {
//     const weatherData = {
//         kolkata: 'The weather in Kolkata is 10°C',
//         mumbai: 'The weather in Mumbai is 20°C',
//         delhi: 'The weather in Delhi is 30°C',
//         chennai: 'The weather in Chennai is 40°C',
//         bangalore: 'The weather in Bangalore is 50°C',
//     };
//     return weatherData[city.toLowerCase()] || 'City not found';
// }

// const tools = {
//     getWeatherDetails,
// };

// const SYSTEM_PROMPT = `
// You are an AI Assistant with START, PLAN, ACTION, Observation, and Output States.
// Wait for the user prompt and first PLAN using available tools.
// After planning, take the action with appropriate tools and wait for Observation based on Action.
// Once you get the observations, return the AI response based on the START prompt and observations.

// Strictly follow the JSON format in examples.

// Available Tools:
// - function getWeatherDetails(city: string): string
// getWeatherDetails is a function that accepts a city name as a string and returns the weather details.

// Example:
// START
// { "type": "user", "user": "What is the weather in Kolkata?" }
// { "type": "plan", "plan": "I will call the getWeatherDetails function for Kolkata." }
// { "type": "action", "function": "getWeatherDetails", "input": "kolkata" }
// { "type": "observation", "observation": "The weather in Kolkata is 10°C" }
// { "type": "output", "output": "The weather in Kolkata is 10°C." }
// `;

// const messages = [{ role: 'system', content: SYSTEM_PROMPT }];

// (async () => {
//     while (true) {
//         const query = readlineSync.question('>> ');
//         const q = { type: 'user', user: query };
//         messages.push({ role: 'user', content: JSON.stringify(q) });

//         try {
//             const chat = await client.chat.completions.create({
//                 model: 'gpt-4', // Use a valid model
//                 messages: messages,
//             });

//             const result = chat.choices[0].message.content;
//             messages.push({ role: 'assistant', content: result });

//             const call = JSON.parse(result);

//             if (call.type === 'output') {
//                 console.log(`🤖: ${call.output}`);
//                 break;
//             } else if (call.type === 'action') {
//                 const fn = tools[call.function];
//                 if (fn) {
//                     const observation = fn(call.input);
//                     const obs = { type: 'observation', observation };
//                     messages.push({ role: 'developer', content: JSON.stringify(obs) });
//                 } else {
//                     console.error('Tool not found:', call.function);
//                 }
//             }
//         } catch (error) {
//             console.error('Error:', error.message);
//         }
//     }
// })();





///new add 
// Removed the invalid response_format.
// Corrected the typo in call.output.
// Added error handling.
// Simplified the loop structure.
// Ensured tools execute without errors.


import OpenAI from "openai";
import readlineSync from "readline-sync";

const OPENAI_API_KEY = 'your-api-key-here'; // Replace with your API key
const client = new OpenAI({ apiKey: OPENAI_API_KEY });

// Tools
function getWeatherDetails(city = '') {
    const weatherData = {
        kolkata: 'The weather in Kolkata is 10°C',
        mumbai: 'The weather in Mumbai is 20°C',
        delhi: 'The weather in Delhi is 30°C',
        chennai: 'The weather in Chennai is 40°C',
        bangalore: 'The weather in Bangalore is 50°C',
    };
    return weatherData[city.toLowerCase()] || 'City not found';
}

const tools = {
    getWeatherDetails,
};

const SYSTEM_PROMPT = `
You are an AI Assistant with START, PLAN, ACTION, Observation, and Output States.
Wait for the user prompt and first PLAN using available tools.
After planning, take the action with appropriate tools and wait for Observation based on Action.
Once you get the observations, return the AI response based on the START prompt and observations.

Strictly follow the JSON format in examples.

Available Tools:
- function getWeatherDetails(city: string): string
getWeatherDetails is a function that accepts a city name as a string and returns the weather details.

Example:
START
{ "type": "user", "user": "What is the weather in Kolkata?" }
{ "type": "plan", "plan": "I will call the getWeatherDetails function for Kolkata." }
{ "type": "action", "function": "getWeatherDetails", "input": "kolkata" }
{ "type": "observation", "observation": "The weather in Kolkata is 10°C" }
{ "type": "output", "output": "The weather in Kolkata is 10°C." }
`;

const messages = [{ role: 'system', content: SYSTEM_PROMPT }];

(async () => {
    while (true) {
        const query = readlineSync.question('>> ');
        const q = { type: 'user', user: query };
        messages.push({ role: 'user', content: JSON.stringify(q) });

        try {
            const chat = await client.chat.completions.create({
                model: 'gpt-4', // Use a valid model
                messages: messages,
            });

            const result = chat.choices[0].message.content;
            messages.push({ role: 'assistant', content: result });

            const call = JSON.parse(result);

            if (call.type === 'output') {
                console.log(`🤖: ${call.output}`);
                break;
            } else if (call.type === 'action') {
                const fn = tools[call.function];
                if (fn) {
                    const observation = fn(call.input);
                    const obs = { type: 'observation', observation };
                    messages.push({ role: 'developer', content: JSON.stringify(obs) });
                } else {
                    console.error('Tool not found:', call.function);
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
})();
