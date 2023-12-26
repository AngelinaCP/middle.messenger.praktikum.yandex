export const profileTemplate = () => {
  return `
                  <div class="profile__back">
                       {{{backLink}}}
                  </div>
                  <div class="profile__settings profile__info">   
                  <form>
                      <div class="u-center-text">             
                        {{{avatar}}}
                      </div>
                      <div class="u-center-text u-margin-top-small">
                        {{{changeAvatar}}}
                      </div>
                      <div class="u-center-text u-margin-top-small">
                        {{{changeAvatarInput}}}   
                      </div>
                  </form>
                  <form class="fields-form">
                      <div class="info-block__item" >
                      {{#each profileFields}}
                         <div class="card__field">
                            {{{this}}}
                         </div>
                      {{/each}}
                        <div class="card__field">
                            {{{oldPassword}}}
                        </div>
                        <div class="card__field">
                            {{{newPassword}}}
                        </div>
                      </div>
                      <div class="u-center-text u-margin-bottom" >
                        {{{dataChangedMessage}}}
                      </div>
                      <div class="profile__actions">
                          <div class="u-center-text">
                         {{{changeUserInfo}}}
                      </div>
                      <div class="profile__actions">
                          <div class="u-center-text">
                         {{{changeUserPassword}}}
                      </div>
                      <div class="u-center-text">
                          {{{logout}}}
                      </div>
                  </form>
              </div>   
  `;
};
