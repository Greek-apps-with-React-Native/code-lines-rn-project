const fetchComments = async (title: string) => {
  const trimedTitle = title.replace(/\s+/g, '').trim().toLowerCase()

  const response = await fetch(
    `https://code-lines-rn-project-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${trimedTitle}.json`)

  if (!response.ok) {
    throw new Error(
      "Unfortunately fetching comments for this movie failed. Please check your internet connection."
    );
  }

  const resData = await response.json();

  const comments = []

  for (const key in resData) {
    comments.push(resData[key])
  }
  // console.log('fetch... ', comments);
  return comments;
}

export default fetchComments;