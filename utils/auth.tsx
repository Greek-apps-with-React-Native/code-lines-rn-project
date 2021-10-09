import { Alert, AsyncStorage } from "react-native";
import { API_KEY } from "../API_KEY";

export const signup = async (email: string, password: string) => {

  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
    API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    }
  );

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = "Σφάλμα κατά την διαδικασία εγγραφής!";
    if (errorId === "EMAIL_EXISTS") {
      message = "Αυτή η ηλεκτρονική διεύθυνση ήδη υπάρχει!";
    } else if (errorId === "OPERATION_NOT_ALLOWED") {
      message =
        "Η δυνατότητα σύνδεσης με ηλεκτρονική διεύθυνση έχει απενεργοποιηθεί!";
    } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
      message =
        "Έχουν μπλοκαριστεί όλες οι προσπάθειες από αυτή την συσκευή, λόγω ασυνήθιστων ενεργειών!";
    }
    Alert.alert('Κάτι δεν πήγε καλά!', message)
    throw new Error(message);
  }

  const resData = await response.json();
  console.log(resData);

  const expirationDate = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000
  );

  saveDataToStorage(
    resData.idToken,
    resData.localId,
    expirationDate,
    email,
    resData.refreshToken
  )
}

export const login = async (email: string, password: string) => {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
    API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    }
  );

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = "Σφάλμα κατά την διαδικασία σύνδεσης!";
    if (errorId === "EMAIL_NOT_FOUND") {
      message = "Η ηλεκτρονική διεύθυνση δεν βρέθηκε!";
    } else if (errorId === "INVALID_PASSWORD") {
      message = "Αυτός ο κωδικός είναι άκυρος!";
    } else if (errorId === "USER_DISABLED") {
      message = "Ο λογαριασμός σας έχει απενεργοποιηθεί!";
    }
    Alert.alert('Κάτι δεν πήγε καλά!', message)

    throw new Error(message);
  }
  const resData = await response.json(); // transforms the data from json to javascript object

  const expirationDate = new Date(
    new Date().getTime() + parseInt(resData.expires_in) * 1000
  );

  console.log(!!resData);

  saveDataToStorage(
    resData.idToken,
    resData.localId,
    expirationDate,
    email,
    resData.refreshToken
  )
}


export const logout = async () => {
  await localStorage.removeItem('userData');
  await localStorage.removeItem('refreshToken');
  await localStorage.removeItem('authenticate');
};


export const saveDataToStorage = async (
  token: string,
  userId: string,
  expirationDate: Date,
  email: string,
  refreshToken: string
) => {
  await AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
      email,
      refreshToken
    })
  );
}

