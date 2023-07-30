import Avatar from '../../../public/avatar.png';

export const ChatListTemplate = () => {
  return `
        <div class="sidebar__header">
                    <h2 class="profile-link">Профиль</h2>
                    <div class="sidebar__search-field">
                        {{{searchInput}}}           
                    </div>
                </div>
                <div class="sidebar__body">
                    <div class="chat-block">
                        {{#each chatMessages}}
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
    `;
};
