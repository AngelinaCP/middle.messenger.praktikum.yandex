
export const ChatDialogTemplate = () => {
  return `
                <div class="chat-dialog__header">
                    <div class="chat-dialog__header-info">
                    {{#if selectedChat}} 
                      {{#if user}}
                        {{{avatar}}}
                         <div class="profile-name">
                            {{user.first_name}} {{user.second_name}}
                         </div>
                      </div>
                          <div class="chat-dialog__header-menu">
                              {{{deleteUserButton}}}
                          </div> 
                          {{else}}
                              {{{addUserButton}}}
                      {{/if}}
                    {{/if}}
                    </div>
                </div>
                <div class="chat-dialog__body">
                    {{#if selectedChat}}                  
                      {{#each messages}}
                          <div class="chat-dialog__body-message-wrapper {{messageType}}-message">
                          <p class="chat-dialog__body-message">
                              {{content}} 
                              <span class="chat-dialog__body-message-time">
                                  {{time}}
                              </span>
                          </p>
                      </div>
                      {{/each}}
                      {{else}}
                        <div class="main-message">Выберите чат или создайте новый</div>
                      {{/if}}
                </div>
                {{#if selectedChat}}  
                <form class="chat-dialog__footer">            
                    <div class="chat-dialog__footer-input">
                        {{{messageInput}}}
                    </div>
                    <div class="chat-dialog__footer-send-button">
                       {{{sendButton}}}
                    </div>
                </form>
                {{/if}}
    `;
};
