export const loginTemplate = () => {
  return `
          <div class="card">
                <div class="u-center-text u-margin-bottom u-margin-top">
                    <h2 class="card__header">{{title}}</h2>
                </div>
                <form>
                     <div class="u-center-text">
                        <div class="card__field">
                            {{{loginInput}}}
                        </div>
                        <div class="card__field">         
                            {{{passwordInput}}}
                        </div>
                        
                        <div class="u-center-text">         
                             {{error}}
                        </div>
                         
                        <div class="u-center-text u-margin-top u-margin-bottom">
                            {{{signIn}}}
                            <div class="u-center-text">
                            {{{signUp}}}
                        </div>  
                    </div>
                </form>
          </div>
    `;
};
