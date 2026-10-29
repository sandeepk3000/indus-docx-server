
import app from "./app";
import { connectToDB } from "./config/db";
import { MESSAGES } from "./constants/messages";
const PORT = Number(process.env.PORT) || 3000;
const connect =  connectToDB();
console.log("server")
;(async () => {
  try {
    await connect()
    app.listen(PORT, () => {
      console.log(MESSAGES.SUCCESS.SEVER_RUNED(PORT));
      
    })
  } catch (error) {
    // console.error(MESSAGES.ERROR.SEVER_FAILED);
    // console.log("messae",error)
    process.exit(1);
  }
})();

