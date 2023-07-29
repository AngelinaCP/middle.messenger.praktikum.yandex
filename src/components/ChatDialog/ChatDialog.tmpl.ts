import Add_Plus from '../../../public/Add_Plus.png';
import Arrow_Right from '../../../public/Arrow_Right_SM.png';
import Avatar from '../../../public/avatar.png';
import More_Vertical from '../../../public/More_Vertical.png';

export const ChatDialogTemplate = () => {
  return `
                <div class="chat-dialog__header">
                    <div class="chat-dialog__header-info">
                        <img class="avatar" src="${Avatar}" alt="avatar"/>
                         <div class="profile-name">
                            {{name}}
                         </div>
                    </div>
                   <div class="chat-dialog__header-menu">
                        <img class="menu" src="${More_Vertical}" alt="menu"/>
                   </div>
                </div>
                <div class="chat-dialog__body">
              
                    {{#each messages}}
                        <div class="chat-dialog__body-message-wrapper {{type}}-message">
                        <p class="chat-dialog__body-message">
                            {{message}} 
                            <span class="chat-dialog__body-message-time">
                                {{time}}
                            </span>
                        </p>
                    </div>
                    {{/each}}
                </div>
                
                <form class="chat-dialog__footer">
                    <div class="attach">
                       <a class="round-btn">
                            <img src="${Add_Plus}" alt="add"/>
                        </a>
                    </div>
             
                    <div class="chat-dialog__footer-input">
                        {{{messageInput}}}
                    </div>
                    <div class="chat-dialog__footer-send-button"></div>
                       <a class="round-btn round-btn__blue">
                            <img src="${Arrow_Right}" alt="send"/>
                        </a>
                </form>
    `;
};
