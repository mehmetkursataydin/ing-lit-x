import { LitElement, html, css } from 'lit';

class NavTop extends LitElement {
  static get styles() {
    return css`
        :host {
            --primary-color: #ff6200;
            font-family: "ING Me Regular", serif;
        }

        .ing-svg {
            width: 20px;
        }

        .nav-logo {
            display: flex;
            flex-direction: row;
            gap: 10px;
            font-weight: bold;
            align-items: center;
            color: black;
            text-decoration: none;
        }

        nav {
            background: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;

     
            button {
                margin: 0;
                padding-inline: 0;
                padding-block: 0;
                line-height: 0;
                border: 0;
                cursor: pointer;
            }

            button svg {
                width: 27px;
                height: 18px;
            }
        }

        a {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--primary-color);
        }
        
        .nav-buttons {
            display: flex;
            gap: 15px;
            align-items: center;
        }
    `;
  }

  render() {
    return html`
      <nav>
        <a href="/" class="nav-logo">
          <div class="ing-svg">${this.renderIngSvg()}</div>
          <div>ING</div>
        </a>
        <div class="nav-buttons">
          <a href="/list">${this.renderUserSvg()}Employee List</a>
          <a href="/add">${this.renderPlusSvg()}Add Employee</a>
          <button>${this.renderTRFlagSvg()}</button>
        </div>
      </nav>
    `;
  }

  renderTRFlagSvg(){
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 -30000 90000 60000">
        <title>Flag of Turkey</title>
        <path fill="#e30a17" d="m0-30000h90000v60000H0z" />
        <path fill="#fff"
              d="m41750 0 13568-4408-8386 11541V-7133l8386 11541zm925 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z" />
      </svg>
    `
  }

  renderUserSvg(){
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  }

  renderPlusSvg(){
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`
  }

  renderIngSvg() {
    return html`
      <svg version="1.1" id="Layer_1" xmlns:x="ns_extend;" xmlns:i="ns_ai;" xmlns:graph="ns_graphs;"
           xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 77.7 77.7" style="enable-background:new 0 0 77.7 77.7;" xml:space="preserve">
 <style type="text/css">
  .st0 {
    fill: #FF6200;
  }

  .st1 {
    fill: #FFFFFF;
  }
 </style>
        <metadata>
  <sfw xmlns="ns_sfw;">
   <slices>
   </slices>
    <sliceSourceBounds bottomLeftOrigin="true" height="77.7" width="77.7" x="172.5" y="-230.3">
   </sliceSourceBounds>
  </sfw>
 </metadata>
        <g>
  <path class="st0" d="M62.1,77.7H15.5C7,77.7,0,70.8,0,62.2V15.5C0,7,7,0,15.5,0h46.6c8.6,0,15.5,7,15.5,15.5v46.6
\t\tC77.7,70.8,70.7,77.7,62.1,77.7L62.1,77.7z">
  </path>
          <path class="st1" d="M75.6,67.5c-0.6-0.3-0.6-0.3-1.6-0.3c-0.3-0.3-1-0.3-1.3-0.3c0.2,1.1,0.6,2.1,1,3.2c0.2,0.5,0.6,0.9,1.1,1.2
\t\tc0.5-0.7,1-1.5,1.4-2.3C75.8,68.3,75.6,67.8,75.6,67.5 M65.3,77.4c-0.2-0.8-0.4-1.7-0.5-2.3v-5.1c-1.3,0.3-1.6,0.6-1.9,0.6
\t\tc-1,0.6-1.6,0.9-1.6,1.6c0,1.3,0.3,2.5,0.3,3.2c0,1,0,1.6,0.3,1.9c0.5,0.2,0.8,0.2,1.1,0.3C63.8,77.6,64.6,77.5,65.3,77.4
\t\t M45.2,70.7c0,0-0.3-1.6-0.6-2.2c-0.3-0.8-0.9-1.4-1.6-1.9c-0.3,0-0.9-0.6-1.3-0.3c0,0-0.3,2.5-0.6,2.8c0.6,1,1.3,1.6,1.6,2.5
\t\tc0.3,0.9,0.6,2.2,1.3,3.2C44.2,73.5,45.2,72.9,45.2,70.7 M71.1,72.6c-0.6-0.6,0.6-2.9-1-2.9c-0.6-0.3-2.5-1-2.5-1
\t\tc-0.3,1-0.3,2.8,0,3.8c0,0.7,0.9,2.4,1.6,3.4c0.8-0.4,1.6-0.9,2.4-1.5C71.4,73.9,71.2,73.3,71.1,72.6L71.1,72.6z M68.9,45
\t\tc1.3,0-1.6-1.3-2.8-2.2c-0.2,0-0.5-0.1-0.6-0.3c-0.6-0.6-1-1.9-2.2-2.2c-0.2,0-0.3-0.1-0.3-0.3c0,0,0,0,0,0c0-0.9-0.3-4.7-0.3-4.7
\t\tc0.6,1.3,1.9,1.3,2.5,1.3c1.3,0,2.2-0.3,2.8-1.3c0-0.3,0.3-0.9,0.6-0.9c0.6-0.3,1.3-0.6,1.6-1.3c0.3,0,0.6-0.6,0.6-0.6
\t\tC68,32,62,32,62,32c-1,0.3-1.9,1.3-1.9,1.6c0,0,0.6,3.5,0.6,3.8c0,2.2,0.3,2.2,0.3,4.4c1,0.6,1.3,0.6,1.9,1.3
\t\tc0.3,0.6,0.6,1.3,1,1.9c1.3,0.6,2.8,1.3,3.8,2.2C68,47.3,68.9,45.7,68.9,45L68.9,45z M67,50.7c-0.9-0.3-1.9-1-3.8-0.6
\t\tc-0.3,0.3-0.3,0.3-0.3,1.3c1.6,0,2.5,1,3.8,1.3C66.7,52.6,67,51.1,67,50.7L67,50.7z M60.4,27.3c0.6,0,0.6,1.3,0.6,1.9
\t\tc1.6,0,3.2,0.3,3.8-0.3c3.5-1.6-1.9-2.9-2.5-2.9c-1.6-0.3-4.7-1.3-3.5,0C58.8,26.7,59.7,26.7,60.4,27.3L60.4,27.3z M67,23.2
\t\tc2.2,0.6,3.8,1.9,5.4,3.8c1,0,1.9-0.6,2.2-1.6c0.3-1.6,0.6-4.1-0.3-5.4c-0.6-0.6-0.9-1-2.5-1.3c-1.2-0.3-2.6,0-3.5,1
\t\tC67.7,20.6,66.7,21.9,67,23.2L67,23.2z M53.7,26c0-0.6-1.3-0.3-1.9,0c-0.6,0-1.6,0.6-2.5,1.3c-0.9,1-1.6,1.3-1.6,2.2h1.6
\t\tc1.6,0,1.9,0.6,2.5-0.3C52.8,27.9,53.7,27.3,53.7,26L53.7,26z M51.8,33.6c0-0.6-0.6-1.3-1.6-1.6h-4.1c-1.6,0-2.9,0-4.4,0.3
\t\tc0.6,1.3,2.2,2.5,2.8,3.2c0.6,0.6,1.3,1.3,2.5,1.3c1.3-0.3,1.3,0,1.9-0.3c0,0.6,0.3,1.6,0,2.2c0,0.3,0.3,2.9-0.9,3.2
\t\tc-0.9,0.3-2.2,1-2.8,1.9c-0.6,0.9-1,2.5,0,3.2c0.6,0.3,1.3-0.6,2.2-1c1-0.3,0.9-1,1.3-1.9c0.6-0.6,1.9-1,2.2-1.6v-1
\t\tc0.3-2.9,0.3-3.5,0.6-5.4C51.5,35.8,51.8,34,51.8,33.6L51.8,33.6z M49.3,50.7c-0.6-0.3-1.3-0.3-1.9-0.3c-0.7,0-1.5,0.1-2.2,0.3
\t\tc0.2,0.6,0.4,1.3,0.6,1.9c0.9-0.3,1.3-0.6,1.9-0.9C47.7,51.7,49,51.1,49.3,50.7L49.3,50.7z M42.7,25.1c0.6-0.6,2.5-1.9,2.5-1.9
\t\tc0.3,0,0.3-0.3,0.3-0.6c-0.6-2.2-1.3-2.2-2.5-2.9c-0.6-0.5-1.4-0.7-2.2-0.6c-1.3,0.3-3.5,1-4.1,2.9c0,0.3-0.3,1.6,0.6,2.8
\t\tc0.6,1.3,1.9,2.2,2.5,2.9C40.7,27.6,41.1,26,42.7,25.1L42.7,25.1z M68.9,49.2c2.4,0,5.3,0.6,8.8,2v2.1c-3.5-1.4-6.7-1.7-8.4-2.2
\t\tv2.5c1.3,0.3,1.9,1,3.2,1.3c0.5,0.2,3.2,1.7,5.3,2.8v2.2c-3.8-2.4-6.5-3.3-9.7-4.7c-0.6,0.6-0.9,1.6-1.9,2.2
\t\tc-0.3,0.3-2.5-1.6-3.8-2.2c-0.9-0.6-2.8-0.9-4.1-1.3c-0.3,0-0.3-0.6-0.3-0.9c-0.3-1-0.6-1.9-0.3-2.2c1.6-0.6,2.2-1.9,2.2-2.8
\t\ts0.9,0.3,1.9,0c0.6-0.6,0.9-1.3,0.6-1.9c0-0.6-0.3-1.3-0.9-1.3c-3.1-1.3-6.7-1.3-9.8,0c-1,0.3-1,1.6-0.6,2.5c0.3,1.3,1.6,0.6,2.5,0
\t\tc0.3,0-0.3,1,0.3,1.9c0.6,1.3,1.9,1.6,1.9,1.9c0,1,0,1-0.3,1.6c0,0.6,0,1.3-0.6,1.6c-1.9,0.3-3.5,0.9-5.4,1.6
\t\tc-0.9,0.3-1.9,1.3-2.8,1.3c-0.6,0-1.3-1.3-1.6-1.6c-0.6,0-0.6-0.3-1.9,0c-3.7,1.5-7.3,3.3-10.8,5.4c-0.6-0.6-0.3-1.6-0.6-2.2
\t\tc3.5-2.2,7.2-4.1,11.1-5.7c0.3-0.3,0-1.3-0.3-1.9c0,0-2.2-0.3-6.3,1c-2.5,0.6-5.4,2.2-5.7,2.2C30.1,53.5,30,52.8,30,52
\t\tc1.9-1,4-1.8,6-2.5c2.2-0.6,4.4-0.6,6.7-1c-0.3,0-0.3-0.6-0.3-1c-0.9-1.9-2.5-3.5-4.1-5.1c-0.6-1.3-1.3-2.8-1.3-3.5
\t\tc0.6-0.6,1.3,0.3,2.2,0.3c-0.4-1.1-0.6-2.3-0.6-3.5c-0.3-1.3-0.3-1.3-0.3-2.8c0-1.9,0.6-2.8,0.3-3.2c-0.3-0.3-1.6-0.9-1.9-0.9
\t\tc-0.6-0.3-0.9-0.3-1.3-1c-1-1.6-1.9-2.8-1.9-4.4c0-1.6,0.6-2.9,1.3-4.4c0.3-1.3,1.9-1.9,2.9-2.5c1-0.6,1.9-0.3,2.8-0.3
\t\tc2.2,0,4.1,1.3,5.7,2.2c1.1,0.9,1.9,2.1,2.2,3.5h2.8c1.6,0.3,3.2,0.6,5.1,1.6c2.2-1.9,6-2.2,7.9-2.2c0-3.5,2.5-5.4,4.4-5.4
\t\tc1.6-0.3,2.5-0.6,4.8,0.3c1.6,0.9,3.8,4.1,3.8,4.4c0.6,1.3,0.3,2.9,0.3,4.8c-0.2,0.8-0.3,1.7-0.3,2.5c-0.3,1.3-1.9,2.2-2.8,2.5
\t\tc0,2.2-0.6,3.5-0.9,5.4c0,1-0.3,1.9-0.6,2.8c0.9-0.3,1.3-0.9,2.2-0.9c-0.6,4.1-1.6,3.5-2.5,5.4c-0.4,1.4-1,2.7-1.9,3.8
\t\tc-0.5,0.5-1,0.9-1.6,1.3C68.3,48.5,68.9,48.8,68.9,49.2 M52.1,73.5c-0.3-0.6-0.9-1-1.6-0.9c-0.6,0-2.2-1-2.2-0.3
\t\tc-1.6,0-0.3,1.6-0.3,2.5c0,0.7,0.9,1.9,1.8,2.9h2.9c-0.1-0.4-0.2-0.9-0.3-1.3C52.1,75.4,52.5,74.5,52.1,73.5L52.1,73.5z M46.8,59.3
\t\tc0.3,1.2,0.7,2.4,1.3,3.5c0.3,0,0.6,0.6,0.9,0.6c0.6-0.6,1.3-1.6,2.2-1.9v1.3c0,1,0,1.6,0.3,2.5c0,1,1,1,2.2,1
\t\tc1.3,0,1.6-2.2,1.6-2.5c0,0,0.3,1.3,2.2,2.2c0,0,2.2,0,2.2-0.3c0.3-1.6,0.6-1.9,0.3-3.2c0,0,1.9,1.3,2.9,2.5
\t\tc0.6-0.6,1.3-1.9,1.3-2.2c0.6-1.3,0.6-2.8,0.6-4.1c-2.5-1.6-5.7-1.9-8.9-1.9C53.1,56.8,49.9,57.1,46.8,59.3L46.8,59.3z M58.8,71.3
\t\tC57.5,71.6,55,72,55,72.9c-0.3,0.9,0,1.9,0,2.5c0.3,0.6,0.3,1.3,0.3,2.2v0.1h2.4c0.6-0.8,1.1-1.4,1.4-2.3
\t\tC59.4,74.5,59.1,72.9,58.8,71.3L58.8,71.3z M26.8,20c-0.6,0.9-0.6,1.9-0.6,2.8c0,1.6,0.3,2.8,0.6,4.8c-1.3,0.9-1.9,1.6-3.2,2.2
\t\tc0.3,1.9,0.6,5.4,0.6,5.4c0.6-0.9,0.6-0.9,1.3-1.6c1.3-0.9,1.9-1.6,3.5-2.8c0.3-0.6,0.6-0.3,1.6-1c0.3-0.3,0.6-0.6,0.6-0.9
\t\tc0-0.6-0.3-1.3-0.6-1.9c-0.3-0.6-0.9-2.2-0.9-2.5c0-2.5,0.3-3.2,0.6-5.4C29,18.7,27.4,18.7,26.8,20 M31.2,41.6
\t\tc-3.2,1-5.4,1.6-6,2.2c-1.6,1-2.2,1.6-3.8,2.5c0,1.9,0,1.9,0.3,2.9l0.3,3.8c0.6-1,2.5-2.9,3.5-4.1c1.4-1.6,3.1-2.9,5.1-3.8
\t\tC30.9,43.8,31.2,42.8,31.2,41.6 M25.2,71.6c0,0,1-0.6,1-1.3c1.6-1.9,3.5-3.5,3.8-3.8c-0.6-1.6-0.9-1.9-1.9-2.8
\t\tc-0.3,0.3-1.9,1.3-2.2,1.9c-0.6,0.3-1.3,0.6-1.6,0.9c0,0.6,0.3,1,0.6,1.6C24.9,68.8,25.2,70.4,25.2,71.6 M37.3,65
\t\tc-0.3-0.6-1.3-1-1.9-1.3c-0.6,0-1.3,1.3-1.3,2.5c0.1,1.3,0.3,2.6,0.6,3.8c0,0.3,0.6,0.6,1.3,0.9c1,0.6,1.9,1,2.8,1.6
\t\tc0,0-0.9-2.9-1.3-4.4C37.3,67.2,37.9,65.9,37.3,65 M40.4,10.2c0.3,0.6,4.1,2.9,5.7,3.8c1.3,1,2.5,1.3,3.8,1.9
\t\tc0.9-1.2,1.5-2.6,1.9-4.1c1,0.6,2.2,0.6,3.2,1c0,1.3,0,2.5,0.3,3.8c0,0.6,0.6,0.3,1.9-0.3c1.9-0.6,3.8-1,4.7-1.3
\t\tc2.2-1.3,3.5-3.8,5.4-3.8c1.6,0,4.4,0.9,5.1,1.6c0.9,0.3,1.6,0.6,2.5,0.6c0.9,0,1.7-0.7,2.4-1.3c-0.1-0.5-0.2-1-0.4-1.4
\t\tc-2.5-1.6-5.3-3.2-8-4.3C67,8,65.7,9.3,64.8,9.3c-1,0-0.3-1.9-0.3-3.2c-0.9,0-1.6,0-2.5-0.3c-0.6,2.2-1,5.1-2.5,5.7
\t\tc-0.4,0.2-0.8,0.3-1.3,0.3V9.2c0-0.3,1.3-2.5,1-2.8c0,0-2.8,0.6-3.5,1c-0.3,0.3-2.2,1.3-2.5,1.3c-0.4-0.1-0.8-0.3-1.3-0.3
\t\tc-0.9-0.6-1.6-0.6-2.5-1.3c-1.3,3.8-1.6,4.7-1.6,4.1c0,0-4.4-2.9-6-4.8c-4.1,0.6-4.1,1.3-7.6,2.5c-1.3,1.3-3.2,2.8-4.4,4.8
\t\tc-0.6,1.3-1.3,1.9-1.9,3.2l3.2,1.3c0.8-1,1.6-2.1,2.2-3.2C35.4,13.7,39.2,11.5,40.4,10.2L40.4,10.2z M22.4,54.2v1.6
\t\tc0,0.6,0.3,4.1,0.3,5.1c0.3,1,0.3,1.9,0.6,2.8c0.3,0.6,0.6,1.3,0.6,1.9c0.4-0.2,0.7-0.6,1-1c0.9-1,1.3-1.9,1.9-3.2
\t\tc-0.3-2.2-1-4.1-1-4.7c0-2.5,0.3-3.2,0.6-4.8C25.2,52.6,23.7,53.6,22.4,54.2L22.4,54.2z M31.6,36.8c0-1.9,0.6-1.9,0.3-2.5
\t\ts-2.8,0-3.5,0c-1.6,0.3-4.4,1.3-4.4,1.9c-0.3,0.9-0.3,3.2-0.3,3.5c0.3,1,0.3,1.9,0.6,2.8c0.9-1,1.3-1.3,1.9-1.6
\t\tc0.3-0.3,3.8-2.8,4.1-3.2C30.9,37.1,31.2,37.4,31.6,36.8L31.6,36.8z M29,77c-0.3,0.3-0.5,0.5-0.9,0.7h-1.2c-0.5-1.6-1.2-3.1-2-4.5
\t\tc0,0,4.7-1.9,6-1.9c0.3,0.6,0.6,1.6,1.3,2.2C31.6,74.2,29.7,76.1,29,77">
  </path>
 </g>
</svg>`
  }
}

window.customElements.define('nav-top', NavTop);
