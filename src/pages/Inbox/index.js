import { useQuery } from "@apollo/client";
import Title from "../../components/Title";
import { useUserContext } from "../../contexts/UserProvider";
import { CONVERSATIONS } from "../../graphql/queries";
import "./inbox.css";

const Inbox = (props) => {
  const { state } = useUserContext();

  const { data, loading, error } = useQuery(CONVERSATIONS, {
    variables: {
      conversationsId: state.user.id,
    },
    onError: (error) => {
      console.log(error);
    },
  });

  let chats;

  if (data) {
    const conversations = data.conversations;
    const renderChats = () => {
      return conversations.map((conversation) => {
        const otherUser = conversation.participants.find((participant) => {
          return participant.id !== state.user.id;
        });

        const filteredConversation = { ...conversation, user: otherUser };
        return filteredConversation;
      });
    };
    chats = renderChats();
  }

  const getMessages = (event) => {
    const chatId = event.currentTarget.id;
    const selectedChat = chats.find((chat) => chat.id === chatId);
    return selectedChat.messages.map((message) => {
      console.log(message);
      if (message.senderId === state.user.id) {
        return <div className="current-user-message">{message.text}</div>;
      } else {
        return <div className="other-user-message">{message.text}</div>;
      }
    });
  };

  return (
    <div className="inbox-background-container">
      <div className="inbox-flex-container">
        <div className="inbox-side-panel">
          <Title text="CHATS" type="profile" />
          <ul className="conversations-list">
            {data &&
              chats.map((chat) => {
                return (
                  <button
                    onClick={getMessages}
                    id={chat.id}
                    className="conversations-list-item"
                  >
                    <li>
                      <div className="profile-inbox-image">
                        <img
                          src={chat.user.imageUrl}
                          alt={chat.user.firstName}
                        />
                      </div>
                      <div className="ms-5 mt-4 chat-user-name">
                        {chat.user.firstName} {chat.user.lastName}
                      </div>
                    </li>
                  </button>
                );
              })}

            {loading && <div>Loading...</div>}
          </ul>
        </div>
        <div className="inbox-main-panel"></div>
      </div>
    </div>
  );
};

export default Inbox;
