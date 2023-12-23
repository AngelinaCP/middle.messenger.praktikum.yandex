
export const ChatListTemplate = () => {

  return `
        <div class="sidebar__header">
            <h2 class="profile-link">{{{profileLink}}}</h2>
            <div class="sidebar__search-field">
                {{{searchInput}}}       
            </div>
            <div class="sidebar__search-field">
               {{{createChatButton}}}    
            </div>
        </div>
        <div class="sidebar__body">
            <div class="chat-block">
                  {{#each chatList}}
                    {{{this}}}
                  {{/each}}
            </div>
        </div>
    `;
};
