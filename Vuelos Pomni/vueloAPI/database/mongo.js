const { connect, set } = require('mongoose');

const DB_URI = `mongodb+srv://josejunca1202:PvW1PBz7dtCHyi6h@cluster0.3vvkt1e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const dbInit = async () => {
    set("strictQuery", false);
    await connect(`${DB_URI}`);
    console.log("Init DB");
};

module.exports = {
    dbInit
}