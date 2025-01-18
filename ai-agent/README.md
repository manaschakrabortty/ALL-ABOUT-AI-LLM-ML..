# AI Agent with Weather Tool Integration

## 🌟 **Project Overview**
This project demonstrates how to build an AI-driven interactive assistant using OpenAI's API and JavaScript. The assistant is designed to understand user prompts, plan actions, utilize external tools (like a weather function), and return meaningful responses in a structured JSON format. It was a journey of exploration, learning, and implementation of various concepts from scratch, leading to the creation of this intelligent agent.

---

## 🚀 **Features**
1. **OpenAI API Integration**: Seamless interaction with OpenAI's GPT models.
2. **Custom Tools Integration**: Added a weather function (`getWeatherDetails`) to fetch weather details for predefined cities.
3. **Structured Response Handling**: Systematic planning, action, and observation handling in JSON format.
4. **Interactive CLI**: Real-time user interaction via the command line.
5. **Error Handling**: Managed API key issues and invalid inputs effectively.

---

## 🛠️ **How I Built This Project**

### 1. **Setting Up the Environment**
- Installed Node.js and npm for the project environment.
- Created a `package.json` file to manage dependencies.
- Installed the required libraries:
  ```bash
  npm install openai readline-sync dotenv
  ```
- Configured `.env` for securely storing the OpenAI API key.

### 2. **Understanding and Using OpenAI API**
- Explored OpenAI's API documentation to understand models, endpoints, and API key usage.
- Implemented the API client using the `openai` library:
  ```javascript
  import OpenAI from 'openai';
  const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
  });
  ```

### 3. **Designing the Weather Tool**
- Created a custom function to simulate weather responses for predefined cities:
  ```javascript
  function getWeatherDetails(city) {
      const weatherData = {
          kolkata: '10°C',
          mumbai: '20°C',
          delhi: '30°C',
          chennai: '40°C',
          bangalore: '50°C',
      };
      return weatherData[city.toLowerCase()] || 'City not found';
  }
  ```
- Added this function to a `tools` object for dynamic usage.

### 4. **Developing the AI Workflow**
- Designed a workflow that includes:
  1. **Plan**: Determine the next action based on user input.
  2. **Action**: Use the tools (like `getWeatherDetails`) to gather required data.
  3. **Observation**: Collect results from tools and pass them back.
  4. **Output**: Generate the final response using AI.

### 5. **Creating the System Prompt**
- Wrote a detailed system prompt to guide the AI's behavior:
  ```text
  You are an AI Assistant with START, PLAN, ACTION, Observation, and Output states...
  ```

### 6. **Implementing the CLI Interaction**
- Used `readline-sync` to create a real-time interactive experience:
  ```javascript
  import readlineSync from 'readline-sync';
  const query = readlineSync.question('>>');
  ```
- Managed user inputs and AI responses dynamically.

### 7. **Error Handling and Debugging**
- Encountered and resolved issues like:
  - **Incorrect API key**: Implemented `.env` for secure storage.
  - **Model access errors**: Switched to supported models like `gpt-4` or `gpt-3.5-turbo`.
  - **Response parsing issues**: Handled structured JSON responses efficiently.

---

## 🧠 **Lessons Learned**
1. **API Integration**: Mastered OpenAI API workflows and model usage.
2. **Custom Tool Integration**: Learned how to incorporate external tools into an AI system.
3. **Error Debugging**: Gained hands-on experience with debugging and resolving API-related errors.
4. **Structured Planning**: Understood the importance of designing structured workflows for complex systems.
5. **Interactive Applications**: Learned how to build user-friendly command-line interfaces.

---

## 🎨 **Design Principles**
1. **Modularity**: Each function and tool is independent and reusable.
2. **Readability**: Clean and well-documented code for easy understanding.
3. **Scalability**: The project can be extended with additional tools and models.
4. **User Experience**: Focused on real-time interaction and meaningful responses.

---

## 💻 **Running the Project**

### Prerequisites:
- Node.js installed on your system.
- OpenAI API key.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/manaschakrabortty/ALL-ABOUT-AI-LLM-ML../tree/main/ai-agent
   cd ai-agent
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your API key:
   ```
   OPENAI_API_KEY=your-api-key
   ```
4. Run the project:
   ```bash
   node index.js
   //new one 
   node add_update_index.js
   ```
5. Interact with the assistant through the command line!

---

## 🌐 **Future Enhancements**
1. **Real-Time Weather Data**: Integrate APIs like OpenWeather for live weather updates.
2. **Enhanced Tools**: Add more tools for diverse functionalities.
3. **GUI Integration**: Develop a graphical user interface for better user experience.
4. **Expanded Model Support**: Experiment with other AI models for improved performance.

---

## 🤝 **Contributing**
Contributions are welcome! Feel free to fork the project and submit pull requests. For major changes, please open an issue first to discuss your ideas.

---

## 📄 **License**
This project is licensed under the MIT License.

---

## 📧 **Contact**
For queries, reach out at(mailto:manaschakrabortty34@gmail.com).

---

Thank you for exploring this project! 🚀


