import { AiOutlineClose } from "react-icons/ai";

import "./ChatSideBar.css";

const ChatSideBar = ({ show, setShow, chats, loading, getMessages }) => {
  let drawerClasses = "side-drawer";
  if (show) {
    drawerClasses = "side-drawer open";
  }

  const handleClick = () => {
    return setShow(false);
  };

  return (
    <nav className={drawerClasses}>
      <button className="side-drawer-close">
        <AiOutlineClose fontSize="2em" onClick={handleClick} />
      </button>
      <ul className="conversations-list">
        {chats &&
          chats.map((chat) => {
            return (
              <button
                onClick={() =>
                  getMessages({ variables: { conversationId: chat.id } })
                }
                id={chat.id}
                className="conversations-list-item"
                key={chat.id}
              >
                <li>
                  <div className="profile-inbox-image">
                    <img src={chat.user.imageUrl} alt={chat.user.firstName} />
                  </div>
                  <div className="ms-5 mt-4 chat-user-name">
                    {chat.user.firstName.charAt(0).toUpperCase() +
                      chat.user.firstName.slice(1)}{" "}
                    {chat.user.lastName.charAt(0).toUpperCase() +
                      chat.user.lastName.slice(1)}
                  </div>
                </li>
              </button>
            );
          })}

        {loading && <div>Loading...</div>}
      </ul>
    </nav>
  );
};
export default ChatSideBar;
