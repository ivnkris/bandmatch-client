import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Title from "../../components/Title";
import { useUserContext } from "../../contexts/UserProvider";
import { CREATE_MESSAGE } from "../../graphql/mutations";
import { CONVERSATION, CONVERSATIONS } from "../../graphql/queries";
import "./Inbox.css";

const Inbox = (props) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const { register, handleSubmit } = useForm();

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

  const [
    getMessages,
    {
      data: conversationData,
      loading: conversationLoading,
      error: conversationError,
    },
  ] = useLazyQuery(CONVERSATION, {
    onCompleted: (data) => {
      setSelectedConversation(conversationData);
    },
    pollInterval: 500,
    onError: (error) => {
      console.log(error);
    },
  });

  const [sendMessageData] = useMutation(CREATE_MESSAGE);

  const sendMessage = async (formData) => {
    const text = formData.text;
    const senderId = state.user.id;
    const conversation = selectedConversation.conversation;

    const recipientId = conversation.participants.find(
      (participant) => participant.id !== state.user.id
    );

    await sendMessageData({
      variables: {
        createMessageInput: { text, senderId, recipientId: recipientId.id },
      },
    });
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  let messages;
  if (conversationData) {
    messages = conversationData.conversation.messages;
  }

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
                    onClick={() =>
                      getMessages({ variables: { conversationId: chat.id } })
                    }
                    id={chat.id}
                    className="conversations-list-item"
                    key={chat.id}
                  >
                    <li>
                      <div className="profile-inbox-image">
                        <img
                          src={chat.user.imageUrl}
                          alt={chat.user.firstName}
                        />
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
        </div>
        <div className="inbox-main-panel">
          <div className="current-message-list pt-3">
            {conversationData &&
              messages.map((message) => {
                if (message.senderId === state.user.id) {
                  return (
                    <div
                      key={message.id}
                      className="current-user-message text-center"
                    >
                      {message.text}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={message.id}
                      className="other-user-message text-center"
                    >
                      {message.text}
                    </div>
                  );
                }
              })}
            <AlwaysScrollToBottom />
          </div>
          {selectedConversation && (
            <div className="message-input-area">
              <form
                className="px-5 pt-4 inbox-input-form"
                onSubmit={handleSubmit(sendMessage)}
              >
                <textarea
                  className="inbox-text-area"
                  name="text"
                  {...register("text", {
                    required: true,
                    shouldUnregister: true,
                  })}
                  placeholder="Write your message here..."
                ></textarea>
                <div className="text-center">
                  <Button
                    type="submit"
                    label="SEND"
                    size="medium"
                    mode="primary"
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
