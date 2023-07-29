
export const loginTemplate = () => {
    return `
          <div class="card">
                <div class="u-center-text u-margin-bottom u-margin-top">
                    <h2 class="card__header">{{title}}</h2>
                </div>
                <form>
                     <div class="u-center-text ">
                        <div class="card__field">
                            {{{loginInput}}}
                        </div>
                        <div class="card__field">         
                            {{{passwordInput}}}
                        </div>
                         
                        <div class="u-center-text u-margin-top-big u-margin-bottom">
                            {{{firstButton}}}
                            <div class="u-center-text">
                            {{{secondButton}}}
                        </div>  
                    </div>
                </form>
          </div>
    `
};
