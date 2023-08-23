// import React from "react";
import React, { useEffect, useState } from "react";
import UserNav from "../navbar/userNav";
import io from "socket.io-client";
import { AiOutlineSend } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import api, { apiAuth } from "../../servises/api/axios interceptor ";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Chats, message } from "../../domain/modals/chat";

interface role {
  role: string;
}
const Chat = (props: role) => {
  const EndPoint = "http://localhost:3000";

  let socket: any = io(EndPoint);

  const selectChat = (user: Chats) => {
    setSelcetUser(user);
  };
  const navigate = useNavigate();
  // const [chat, setChat] = useState("");
  const [message, setMessage] = useState<message[]>([]);
  const [chats, setChats] = useState<Chats[]>([]);
  const { userId }: any = useSelector((state: any) => state.user);
  const { ownerId }: any = useSelector((state: any) => state.owner);
  const [username, setUsername] = useState("");
  const [ownername, setOwnername] = useState("");
  const [chatId, setChatId] = useState("");
  const [newMessage, setNewMessages] = useState("");
  const [selectUser, setSelcetUser] = useState<Chats>();
  const currentId = props.role === "user" ? userId : ownerId;
  const currentRole = props.role;
  console.log(chatId, "chatId");

  useEffect(() => {
    socket.emit("setup", currentId);
  }, [currentId, socket]);

  const setMessageFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessages(e.target.value);
    console.log("kkk", newMessage);
  };

  useEffect(() => {
    const fetch = async () => {
      if (props.role === "user") {
        const data = await apiAuth.get(`/chat/userChat/${userId}`);

        setChats(data.data.allChats);
        console.log(data.data.allChats, "userchat");
      } else {
        const data = await apiAuth.get(`/chat/ownerChat/${ownerId}`);
        setChats(data.data.allChats);
        console.log(data.data);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessage: message) => {
      console.log("got a new message");

      if (chatId !== newMessage.chats._id) {
        console.log(`message from ${newMessage.user}${newMessage.owner}`);
      } else {
        setMessage((prevMessage) => [...prevMessage, newMessage]);
      }
    });
  }, [socket]);

  const handleMessageFetch = async (chatId: string) => {
    const { data } = await apiAuth.get(`/message/${chatId}`);
    console.log(data, "vvvvv");

    setMessage(data.messages);
    console.log(data.messages, "mess");

    socket.emit("joinChat", chatId);
  };
  const sendMessgae = (content: string, chatId: string, currentId: string) => {
    // const content = chat;
    apiAuth
      .post("/message/send", { content, currentId, currentRole, chatId })
      .then((result) => {});
  };
  const handleMessageSend = async () => {
    if (newMessage.trim().length > 0) {
      const result = await sendMessgae(newMessage, chatId, currentId);
      console.log(result, "response meassage");
      setNewMessages("");
      socket.emit("newMessage ", result);
      setMessage([...message]);

      console.log(result);
    }
  };

  console.log(message, "sdfsdfsdf");

  useEffect(() => {});

  console.log(chats);

  return (
    <div className="">
      <UserNav />

      <div className="flex ">
        <div className="grid  gap-3 w-[14rem] ml-3 rounded-lg border border-black h-[36rem]">
          <div className="grid   w-full h-10 rounded-lg border border-black"></div>

          <div className=" h-[32.7rem] rounded-lg w-full border border-black">
            {props.role === "user"
              ? chats?.map((item) => (
                  <div>
                    <div className=" flex w-full h-10 rounded-lg border border-black">
                      <div className="flex w-8 h-8 mt-1 ml-1 border  border-black rounded-full  "></div>
                      <li
                        className=" w-36  h-10"
                        key={item._id}
                        onClick={() => {
                          selectChat(item);
                          setChatId(item._id);
                          handleMessageFetch(item._id);
                        }}
                      ></li>
                      <div className="flex  ml-6">{item.owner}</div>

                      <div className="felx mt-4   ">
                        {item.latestMessage?.content}
                      </div>
                    </div>
                  </div>
                ))
              : chats?.map((item) => (
                  <div>
                    <div className="flex  w-full h-10 rounded-lg border border-black">
                      <div className="flex w-8 h-8 mt-1 ml-1 border  border-black rounded-full  "></div>
                      <li
                        className=" w-36  h-10"
                        key={item._id}
                        onClick={() => {
                          selectChat(item);
                          setChatId(item._id);
                          handleMessageFetch(item._id);
                        }}
                      ></li>
                      <div className="flex  ml-6">{item.user}</div>

                      <div className="felx mt-4   ">
                        {item.latestMessage?.content}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className=" grid ml-7 rounded-lg w-[68rem] border border-black">
          <div className="w-full h-[32rem] text-center content-center relative">
            {props.role === "user" ? (
              <div className="w-full h-[32rem] text-center content-center relative">
                {message
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        item.user ? "justify-end" : "justify-start"
                      } fixed bottom-0 right-0 mb-[4rem] mr-7 bg-slate-400 w-[25rem] text-center rounded-lg h-10`}
                      style={{ bottom: index * 50 }} // Adjust this value to control spacing
                    >
                      {item?.content}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="w-full h-[32rem] text-center content-center relative">
                {message
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        item.owner ? "justify-end" : "justify-start"
                      } fixed bottom-0 right-0 mb-[4rem] mr-7 bg-slate-400 w-[25rem] text-center rounded-lg h-10`}
                      style={{ bottom: index * 50 }} // Adjust this value to control spacing
                    >
                      {item?.content}
                    </div>
                  ))}
              </div>

              // <ul className="list-none">
              //   {message.map((item, index) => (
              //     <li
              //       key={index}
              //       className={`${item.owner ? "justify-end" : "justify-start"} flex`}
              //     >
              //       <div className="w-full h-[32rem] text-center content-center relative">
              //         <div className="flex fixed justify-end bottom-0 mb-[4rem] bg-slate-400 w-[25rem] text-center rounded-lg h-10">
              //           {item?.content}
              //         </div>
              //       </div>
              //     </li>
              //   ))}
              // </ul>
            )}
          </div>

          <div className=" grid w-full h-10 ">
            <input
              className="absolute w-[64rem] ml-2 rounded-xl  border-gray-300 border p-2 pr-12"
              type="text"
              name="message"
              placeholder="Enter your message"
              onChange={(e) => setMessageFn(e)}
            />
            <div
              className="absolute right-5   top- bg-blue-500 text-white px-3 py-3 rounded-full"
              onClick={handleMessageSend}
            >
              <AiOutlineSend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
