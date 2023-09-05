import { auth } from "@/lib/firebase-admin";

export default function (req, res) {
  let newEmail = req.body.newUserEmail;
  let newPassword = req.body.newUserPassword;
  let newName = req.body.userName;
  auth.createUser({
    email: newEmail,
    password: newPassword,
    emailVerified: false,
    displayName: newName,
  })
    .then((userRecord) => {
      res.status(200);
      res.send(userRecord);
    })
    .catch(() => {
      res.status(400);
      res.send("Fallo");
      return;
    });
}
