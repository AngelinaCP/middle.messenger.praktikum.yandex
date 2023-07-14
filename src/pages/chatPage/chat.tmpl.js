import Handlebars from "handlebars";
import More_Vertical from '/More_Vertical.png'
import Add_Plus from '/Add_Plus.png'
import Arrow_Right from '/Arrow_Right_SM.png'
import Avatar from '/avatar.png'

const chatTmpl = (props) => {
    const chatTmpl = `
        <div class="content-page">
            <div class="sidebar">
                <div class="sidebar__header">
                    <h2 class="profile-link">Профиль</h2>
                    <div class="sidebar__search-field">
                        <input class="search-field" type="search" placeholder="Поиск"/>
                    </div>
                </div>
                <div class="sidebar__body">
                    <div class="chat-block">
                        {{#each messages}}
                        <div class="chat-block__item">
                         <div class="chat-block__item-avatar">
                            <img class="avatar" src="${Avatar}" alt="avatar"/>
                         </div>
                           <div class="chat-block__item-message">
                                <div class="profile-name">
                                    {{name}}
                                </div>
                                <div class="chat-block__item-message-text">
                                    {{message}}
                                </div>
                           </div>
                           <div class="chat-block__item-info">
                                <div class="chat-block__item-info-time">
                                    {{time}}
                                </div>
                                {{#if count}}
                                    <div class="chat-block__item-info-count">
                                        {{count}}
                                    </div>
                                {{/if}}
                            </div>
                        </div>
                        {{/each}}
                    </div>
                </div>
            </div>
            <div class="chat-dialog">
                <div class="chat-dialog__header">
                    <div class="chat-dialog__header-info">
                        <img class="avatar" src="${Avatar}" alt="avatar"/>
                         <div class="profile-name">
                            {{dialog.name}}
                         </div>
                    </div>
                   <div class="chat-dialog__header-menu">
                        <img class="menu" src="${More_Vertical}" alt="menu"/>
                   </div>
                </div>
                <div class="chat-dialog__body">
              
                    {{#each dialog.messages}}
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
                
                <div class="chat-dialog__footer">
                    <div class="attach">
                       <a class="round-btn">
                            <img src="${Add_Plus}" alt="add"/>
                        </a>
                    </div>
                    <div class="chat-dialog__footer-input">
                      <input name="message" class="message-input" type="text" placeholder="Сообщение"/>
                    </div>
                    <div class="chat-dialog__footer-send-button"></div>
                       <a class="round-btn round-btn__blue">
                            <img src="${Arrow_Right}" alt="send"/>
                        </a>
                    </div>
            </div>
        </div>
    `
    const template = Handlebars.compile(chatTmpl);
    return template(props);
};

export default chatTmpl
