import base from "./base"

// GET chat history
export const getChats = () => {
  return base.get("/predict-disease/")
}

// POST send message
export const sendMessage = (message) => {
  return base.post("/predict-disease/", {
    message: message,
  })
}
