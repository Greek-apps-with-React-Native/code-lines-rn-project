import { AsyncStorage } from "react-native";
import storageKeys from "../constants/storageKeys";

const sendMessage = async (title: string, message: string) => {
  const trimedTitle = title.replace(/\s+/g, '').trim().toLowerCase()
  console.log(trimedTitle);

  let email = 'email'
  let date = 'today'

  const response = await fetch(
    `https://code-lines-rn-project-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${trimedTitle}.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        user: email,
        date,
      }),
    }
  )

  if (!response.ok) {
    throw new Error(
      "Unfortunately your comment was not send. Please check your internet connection."
    );
  }
}

export default sendMessage;