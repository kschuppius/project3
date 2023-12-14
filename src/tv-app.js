// import stuff
import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import "./tv-channel.js";

export class TvApp extends LitElement {
  // defaults
  constructor() {
    super();
    this.name = '';
    this.source = new URL('../assets/channels.json', import.meta.url).href;
    this.listings = [];
    this.temporaryItem = {
      id: null,
      title: null,
      presenter: null,
      time: null,
      description: null,
      video: null
    }
    this.activeItem = {
      title: null,
      id: null,
      description: null,
    };
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return 'tv-app';
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      name: { type: String },
      source: { type: String },
      listings: { type: Array },
      temporaryItem: {type: Object },
      activeItem: { type: Object }
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return [
      css`
      :host {
        display: block;
        margin: 16px;
        padding: 16px;
      }
      header {
        color: #000;
        padding: 16px;
        text-align: center;
      }
      .h1 {
        font-size: 32px;
        margin-bottom: 16px;
      }


      .listing-container {
        justify-self: center;
        max-width: 1344px;
        justify-items: left;
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: auto;
        padding-left: .5rem;
        padding-right: .5rem;
        text-rendering: optimizeLegibility;
        width: 100%;
        margin: 0 auto;
        position: relative;
        animation-delay: 1s;
        animation-duration: 1s;
        line-height: 1.5;
        font-size: 1em;
      }
      .timecode-container {
        position: absolute;
        top: 0;
        left: 0;
        margin: 10px;
        padding: 5px;
        color: white;
        background-color: #384194;
        border-radius: 5px;
        z-index: 1; /* Ensure the timecode box is above other elements */
      }
      p {
        font-size: 12px;
      }

      video-player {
        width: 750px;
        height: auto;
        max-width: 1000px; /* Adjust the max-width as needed */
        border: 1px solid #cccccc; /*for a YouTube-like look :) */
        border-radius: 8px; /*border-radius for rounded corners */
      }


      h5 {
        font-weight: 400;
      }
      .discord {
        display: inline-flex;
      }
      .middle-page{
        display: inline-flex;

      }
      .
      `,
    ];
  }
  // LitElement rendering template of your element
  render() {
    return html`
      <div>
      <h1 class="listing-container"> </h1>
      
      ${
        this.listings.map(
          (item) => html`
            <tv-channel 
              title="${item.title}"
              presenter="${item.metadata.author}"
              description="${item.description}"
                video="${item.metadata.source}"
                time="${item.metadata.time}"
              @click="${this.itemClick}"
            >
            </tv-channel>
          `
        )
      }
      <video-player id="video-player" source="https://youtu.be/l8pnmrR4zPI?si=FSXrTThztWF6oTC4" accent-color="blue" dark track="https://haxtheweb.org/files/HAXshort.vtt"
        >
</video-player>



      </div>

      <div class="middle-page">
    
        <!-- video -->
      <figure id="player-figure" class="image is-16by9">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/VBmMU_iwe6U?si=0mxCB2K1KRy12ajt&amp;start=7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> </figure>
 <!-- discord / chat - optional -->
        <div class="discord">
              <widgetbot server="954008116800938044" channel="1106691466274803723" width="100%" height="100%" style="display: inline-block; overflow: hidden; background-color: rgb(54, 57, 62); border-radius: 7px; vertical-align: top; width: 100%; height: 100%;"><iframe title="WidgetBot Discord chat embed" allow="clipboard-write; fullscreen" src="https://e.widgetbot.io/channels/954008116800938044/1106691466274803723?api=a45a80a7-e7cf-4a79-8414-49ca31324752" style="border: none; width: 100%; height: 100%;"></iframe></widgetbot>
              <script src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed"></script>
            </div>
      </div>
      
      <!-- dialog -->
      <sl-dialog label="${String(this.temporaryItem.description)}" class="dialog">
      ${this.activeItem.description}
        <sl-button slot="footer" variant="primary" @click="${this.watchButtonClick}">WATCH</sl-button>
      </sl-dialog>
    `;
  }
  watchButtonClick() {
    this.changeVideo();
    const dialog = this.shadowRoot.querySelector('.dialog');
    dialog.hide();
  }

changeVideo() {
    const videoPlayer = this.shadowRoot.querySelector('video-player');
    videoPlayer.source = this.createSource();
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').play()
  }
  
  closeDialog(e) {
    const dialog = this.shadowRoot.querySelector('.dialog');
    dialog.hide();
  }
  itemClick(e) {
    this.temporaryItem = {
      id: e.target.id,
      title: e.target.title,
      presenter: e.target.presenter,
      time: e.target.time,
      description: e.target.description,
      video: e.target.video
    }
    const dialog = this.shadowRoot.querySelector('.dialog');
    dialog.show();
  }

  // LitElement life cycle for when any property changes
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "source" && this[propName]) {
        this.updateSourceData(this[propName]);
      }
    });
  }

  async updateSourceData(source) {
    await fetch(source).then((resp) => resp.ok ? resp.json() : []).then((responseData) => {
      if (responseData.status === 200 && responseData.data.items && responseData.data.items.length > 0) {
        this.listings = [...responseData.data.items];
      }
    });
  }
}
// tell the browser about our tag and class it should run when it sees it
customElements.define(TvApp.tag, TvApp);