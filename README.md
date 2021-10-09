### React Native Project for CODELINES Ltd

The exercise is about creating a React Native app (with or without the use of
Expo) that will perform the 2 main following functionalities:

- Login user with the help of Firebase authentication (email, password)
- Chat functionality that allows users to perform comments over a list of
  movies

#### Part 1: User authentication

1. Create a view where the new users can register by providing their email /
   password the first time they open the app.
2. On app reopen user should be considered logged in and the app should
   not show this view again.
3. Create a firebase app and use authentication APIs through there.
4. It’s not important how the UI will look like exactly but make it presentable

#### Part 2: Movies list

5. Create a list that will retrieve movies from the sample provided json file
   and for each movie will show only its title and some click indication, like an
   arrow button at the end of the line.
6. On click open of each list line, a new chat screen will appear where 2 or
   more users will be able to type their comments. Comments should be
   displayed and also persisted.
7. Data persistence should take place in Real Time Database of the Firebase
   app you created already.
8. UI again is not important. Just make it presentable.
   Notes:
   Make sure to create a README.md file in the project where you will list:
9. File structure that you worked with
10. Project implementation details and some decisions you took
11. If you had more time what would you improve

Notes:

#### 1. File Structure:

The app consists of the following folders:

- components
- constants
- screens
- utils

#### 2. Project implementation details - decisions:

- For a reall app I would have used, `React Navigation`, but here I just render screens according to state variables.
- In order to hide/show the `AuthScreen` and the `Logout` button, I pass a function from the child `AuthScreen` to the parent `App`, which checks if `userData` is stored in device, and acts accordingly. Normally I would have used `redux`.

#### 3. Things that could be improved:

- The token from firebase expires after 1 hour, I could use the `refreshToken` to ask for a new one and keep the user logged in.
- I could have saved the movies list in firebase and fetch it.

Extra notes:

- I could have used some boilerplate that I have, but I made almost everything from scratch.

TODO:
