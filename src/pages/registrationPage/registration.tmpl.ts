export const registrationTemplate = () => {
  return `
         <div class="card">
                <div class="u-center-text u-margin-bottom u-margin-top">
                    <h2 class="card__header">{{title}}</h2>
                </div>
                <form>
                     <div class="u-center-text ">
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
                            {{{surnameInput}}}
                        </div>
                         <div class="card__field">         
                            {{{phoneInput}}}
                        </div>
                         <div class="card__field">         
                            {{{passwordInput}}}
                        </div>
                                       
                        <div class="u-center-text u-margin-top">
                            {{{firstButton}}}
                            <div class="u-center-text">
                            {{{secondButton}}}
                        </div>  
                    </div>
                </form>
          </div>
    `;
};
