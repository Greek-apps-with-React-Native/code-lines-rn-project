import moment from "moment";

const sendComment = async (title: string, comment: string, email: string) => {
  const trimedTitle = title.replace(/\s+/g, '').trim().toLowerCase()
  const newDate = new Date();
  const elLocale = require("moment/locale/el");
  moment.updateLocale("el", elLocale);
  const date = moment(newDate).format("LLL");


  const response = await fetch(
    `https://code-lines-rn-project-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${trimedTitle}.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
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

export default sendComment;