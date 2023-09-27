import { auth } from "../../../lib/firebase-admin";


// eslint-disable-next-line import/no-anonymous-default-export
export default function (req, res) {
    let uid = req.body.userUid;
    auth.updateUser(uid, { emailVerified: false }).then((userRecord) => {
        res.status(200);
        res.send(userRecord);
    }).catch((error) => {
        res.status(400);
        res.send("Fallo");
        console.log(error)
        return;
    });
}

