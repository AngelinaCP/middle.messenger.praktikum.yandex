import Avatar from '../../../public/avatar.png';

export const profileTemplate = () => {
  return `
              <div class="profile__settings">
                  <div class="profile__info">
                      <img class="profile__info-photo" src="${Avatar}" alt="avatar"/>
                      <p class="u-center-text u-margin-bottom">{{name}}</p>
                  </div>
                  <form>
                      <div class="info-block__item u-margin-bottom">
                        <div class="card__field">
                            {{{emailInput}}}
                        </div>
                        <div class="card__field">
                            {{{loginInput}}}
                        </div>
                        <div class="card__field">         
                            {{{nameInput}}}
                        </div>
                         <div class="card__field">         
                            {{{secondNameInput}}}
                        </div>
                         <div class="card__field">         
                            {{{passwordInput}}}
                        </div>
                      </div>
                      <div class="profile__actions">
                          <div class="u-center-text">
                         {{{firstButton}}}
                      </div>
                      <div class="u-center-text">
                          {{{secondButton}}}
                      </div>
                  </form>
              </div>
          
  `;
};
