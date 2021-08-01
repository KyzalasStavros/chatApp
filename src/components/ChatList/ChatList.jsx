import { React }from 'react';
import { useChat } from 'context';
import { ChatAvatar } from 'components';
import { Icon } from 'semantic-ui-react';
import { joinUsernames, notMe } from 'helpers';
import ReactDOM from 'react-dom'

export const ChatList = () => {
  const {
    myChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    deleteChatClick,
  } = useChat();
  

  function selectChatClick_v2 (c){
    selectChatClick(c);
    //hide chatlist and show chat
    let sidebar = document.getElementsByClassName('left-rail')[0]
    let toChat = document.getElementsByClassName('current-chat')[0]
    
    // = this.state.isClicked?'black' : 'white'
    if (window.innerWidth<=600){ReactDOM.findDOMNode(sidebar).style.display = 'none';ReactDOM.findDOMNode(toChat).style.display = 'block';}
    else {console.log('megalytero')}
    //console.log('dom',ReactDOM.findDOMNode(element).style)
    
    console.log('dom-side',ReactDOM.findDOMNode(sidebar),ReactDOM.findDOMNode(sidebar).style.display,)
    console.log('dom-chat',ReactDOM.findDOMNode(toChat),ReactDOM.findDOMNode(toChat).style.display,)
    console.log('ye?',c);
  }

  return (
    <div className="chat-list">
      {myChats.map((c, index) => (
        <div
          className={`chat-list-item ${
            selectedChat?.id === c.id ? 'selected-chat-item' : ''
          }`}
          key={index}
        >
          <div
            onClick={() => selectChatClick_v2(c)}
            className="chat-list-item-content"
          >
            {c.people.length === 1 ? (
              <>
                <Icon circular inverted color="violet" name="user cancel" />
                <div className="chat-list-preview">
                  <div className="preview-username">No One Added Yet</div>
                </div>
              </>
            ) : c.people.length === 2 ? (
              <>
                <ChatAvatar username={notMe(chatConfig, c)} chat={c} />

                <div className="chat-list-preview">
                  <div className="preview-username">{notMe(chatConfig, c)}</div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : c.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Icon circular inverted color="brown" name="users" />
                <div className="chat-list-preview">
                  <div className="preview-username">
                    {joinUsernames(c.people, chatConfig.userName).slice(0, 50)}
                    ...
                  </div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : c.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            )}
          </div>

          <div onClick={() => deleteChatClick(c)} className="chat-item-delete">
            <Icon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
};