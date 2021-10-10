const sendComment = async (title: string, comment: string, email: string) => {
  const trimedTitle = title.replace(/\s+/g, '').trim().toLowerCase()
  const date = new Date();


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