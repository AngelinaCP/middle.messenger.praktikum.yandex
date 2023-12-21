import Avatar from '../../../public/avatar.png';

export const ChatTemplate = () => {
    return `
            <div class="chat-block__item-avatar">
                <img class="avatar" src="${Avatar}" alt="avatar"/>
            </div>
            <div class="chat-block__item-message">
                <div class="profile-name">
                    {{title}}
                </div>
                <div class="chat-block__item-message-text">
                    {{content}}
                </div>
            </div>
            <div class="chat-block__item-message--time">
                {{time}}
            </div>
            <div class="chat-block__item-info">
              
                {{#if unread_count}}
                    <div class="chat-block__item-info-count">
                        {{unread_count}}
                    </div>
                {{/if}}
            </div> 
    `;
};
