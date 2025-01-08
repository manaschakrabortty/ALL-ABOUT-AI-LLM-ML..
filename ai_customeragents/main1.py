
import os
import streamlit as st
from dotenv import load_dotenv
import requests

load_dotenv()

BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = "7bfbcfbb-2d6c-4511-8cc6-87ab26db9798"
FLOW_ID = "ada1aefe-d566-4073-adc6-d5e95232042c"
APPLICATION_TOKEN = os.environ.get("APP_TOKEN")
ENDPOINT = "customer" # The endpoint name of the flow


def run_flow(message: str) -> dict:
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{ENDPOINT}"

    payload = {
        "input_value": message,
        "output_type": "chat",
        "input_type": "chat"
    }

    headers = {"Authorization": "Bearer " + APPLICATION_TOKEN, "Content-Type": "application/json"}
    response = requests.post(api_url, json=payload, headers=headers)
    return response.json()


def main():
    st.title("chat interface")


    message = st.text_area("Message",placeholder="ask me something...")

    if st.button("Run Flow"):
        if not message.strip():
            st.error("Please enter a message")
            return
        
        try:
            with st.spinner("Running Flow..."):
                response = run_flow(message)

            response = response["outputs"] [0]["outpts"][0]["results"]["message"]["text"]
            st.markdown(response)
        except Exception as e:
            st.error(str(e))

if __name__ == "__main__":
    main()



# streamlit run main1.py