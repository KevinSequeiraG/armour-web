import { auth } from "@/lib/firebase-admin";


export default function (req, res) {
    let email = req.body;
    auth.getUserByEmail(email).then((userRecord) => {
        res.status(200);
        res.send(userRecord);
    }).catch(() => {
        res.status(400);
        res.send("Fallo");
        return;
    });
}