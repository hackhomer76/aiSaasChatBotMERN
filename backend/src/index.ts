import app from './app.js'
import { connectToDatabase } from './db/connection.js'

//連結mongo + 跑本地伺服器
const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(PORT, () => console.log("server listening on 5000 port"));
}).catch((err) => console.log(err))




