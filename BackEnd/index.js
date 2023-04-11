const app = require("./Server");
const connection = require("./Config/Database");

const port = process.env.SERVER_PORT;
connection.once("open", () =>
{
    app.listen(port, () =>
    {
        const UserControoler = require("./Controllers/User");
        UserControoler.createAdmin();
        console.log(`server up on http://localhost:${port}`);
    });
});
