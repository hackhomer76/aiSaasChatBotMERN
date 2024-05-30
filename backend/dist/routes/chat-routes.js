import { Router } from 'express';
import { verifyToken } from "../utils/token-manager.js";
import { validate, chatCompletionValidator } from "../utils/validators.js";
import { generateChatCompletion, sendChatsToUser, deleteChats, } from "../controllers/chat-controllers.js";
//protected api
const chatRoutes = Router();
//get all chat records 
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
//send question to chatgpt
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
//delete user chats.data
chatRoutes.delete("/delete", verifyToken, deleteChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map