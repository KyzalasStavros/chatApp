import { useState } from 'react';
import { useChat } from 'context';
import { joinUsernames } from 'helpers';
import { Icon } from 'semantic-ui-react';
import { SearchUsers } from 'components';
import ReactDOM from 'react-dom'

export const ChatToolbar = () => {
  const { selectedChat, chatConfig } = useChat();
  const [searching, setSearching] = useState(false);
    
    function goBackToChatList(){
        //show chatlist and hide chat
        let sidebar = document.getElementsByClassName('left-rail')[0]
        let toChat = document.getElementsByClassName('current-chat')[0]
        
        // = this.state.isClicked?'black' : 'white'
        if (window.innerWidth<=600){ReactDOM.findDOMNode(sidebar).style.display = 'block';ReactDOM.findDOMNode(toChat).style.display = 'none';}
        else {console.log('megalytero')}
        //console.log('dom',ReactDOM.findDOMNode(element).style)
        
    }

  return (
    <>
      <div className="chat-toolbar">
        <div className="go-back-icon">
        <Icon
        color="grey"
        name="angle left"
        onClick={() => goBackToChatList()}
        />
      </div>
        
        <div className="chat-header-text">
          {joinUsernames(selectedChat.people, chatConfig.userName).slice(
            0,
            100,
          )}
        </div>


        <div className="add-user-icon">
          <Icon
            color="grey"
            name="user plus"
            onClick={() => setSearching(true)}
          />
        </div>
      </div>

      <SearchUsers closeFn={() => setSearching(false)} visible={searching} />
    </>
  );
};