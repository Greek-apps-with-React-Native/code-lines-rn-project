import { Alert, AsyncStorage } from "react-native";
import { API_KEY } from "../API_KEY";
import storageKeys from "../constants/storageKeys";

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
  console.log("sign up", !!resData);

  saveDataToStorage(
    resData.idToken,
    resData.localId,
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

  console.log("login", !!resData);

  saveDataToStorage(
    resData.idToken,
    resData.localId,
    email,
    resData.refreshToken
  )
}

export const logout = async () => {
  await AsyncStorage.removeItem(storageKeys.userData);
  console.log("logout");
};

export const saveDataToStorage = async (
  token: string,
  userId: string,
  email: string,
  refreshToken: string
) => {
  await AsyncStorage.setItem(
    storageKeys.userData,
    JSON.stringify({
      token,
      userId,
      email,
      refreshToken
    })
  );

  console.log('saveDataToStorage ', email);

}

