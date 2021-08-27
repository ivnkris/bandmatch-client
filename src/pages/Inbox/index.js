import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import ChatSideBar from "../../components/ChatSideBar";
import Title from "../../components/Title";
import { useUserContext } from "../../contexts/UserProvider";
import { CREATE_MESSAGE } from "../../graphql/mutations";
import { CONVERSATION, CONVERSATIONS } from "../../graphql/queries";
import "./inbox.css";

const Inbox = (props) => {
  const [isSideDrawer, setIsSideDrawer] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const drawerToggleClickHandler = () => {
    if (isSideDrawer) {
      return setIsSideDrawer(false);
    } else {
      return setIsSideDrawer(true);
    }
  };

  const { register, handleSubmit } = useForm();

  const { state } = useUserContext();

  const { data, loading, error } = useQuery(CONVERSATIONS, {
    variables: {
      conversationsId: state.user.id,
      bandConversationsBandIds: state.user.bands || [],
    },
    onError: (error) => {
      console.log(error);
    },
    pollInterval: 500,
  });

  let chats;
  let bandChats;

  if (data) {
    const conversations = data.conversations;

    const bandsConversations = data.bandConversations;

    console.log("band convos", bandsConversations);

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

    if (bandsConversations) {
      const isParticipantLoggedInUser = (participant) => {
        const bandIds = state.user.bands;
        const result = bandIds.includes(participant.id);
        // const result = bandIds.filter((bandId) => bandId !== participant.id);
        // console.log("result", result, "for", participant.id);
        return result;
      };

      const renderBandChats = () => {
        const bandsWithChats = bandsConversations.filter(
          (bandConversations) => bandConversations.conversations !== null
        );

        console.log("bands with chats", bandsWithChats);

        const filteredStuff = bandsWithChats.forEach((bandConversations) => {
          if (bandConversations.conversations.length === 0) {
            return;
          }
          // console.log("band conversation", bandConversations);
          return bandConversations.conversations.map((conversation) => {
            let otherUser;
            conversation.participants.forEach((participant) => {
              console.log("participant", participant);
              const result = isParticipantLoggedInUser(participant);

              console.log("result", result, "for", participant.id);
              if (result !== true) {
                otherUser = participant;
              } else {
                return;
              }
            });

            console.log("this is the other user", otherUser);

            const filteredConversation = {
              ...bandsConversations,
              user: otherUser,
            };
            return filteredConversation;
          });
        });

        return filteredStuff;
      };
      bandChats = renderBandChats();
    }
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
      setIsSideDrawer(false);
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
      {data && (
        <ChatSideBar
          chats={chats}
          bandChats={bandChats}
          loading={loading}
          show={isSideDrawer}
          setShow={setIsSideDrawer}
          getMessages={getMessages}
        />
      )}
      <div className="mobile-chat-nav">
        <button
          className="mobile-chat-toggle"
          onClick={drawerToggleClickHandler}
        >
          VIEW CHATS
        </button>
      </div>
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
                          alt={
                            (chat.user.firstName && chat.user.firstName) ||
                            (chat.user.name && chat.user.name)
                          }
                        />
                      </div>
                      <div className="ms-5 mt-4 chat-user-name">
                        {chat.user.firstName &&
                          chat.user.firstName.charAt(0).toUpperCase() +
                            chat.user.firstName.slice(1)}{" "}
                        {chat.user.lastName &&
                          chat.user.lastName.charAt(0).toUpperCase() +
                            chat.user.lastName.slice(1)}
                        {chat.user.name && chat.user.name}
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
            {conversationData && <div></div>}
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
            <div className="message-input-area pb-3">
              <form
                className="inbox-input-form"
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
