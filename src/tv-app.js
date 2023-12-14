// import stuff
import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
//import "@lrnwebcomponents/video-player/video-player.js";
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
      .listing-container {
        justify-self: center;
        max-width: 1344px;
        justify-items: left;
        display: inline-flex;
        flex-direction: row;
        flex-grow: 1;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: auto;
        text-rendering: optimizeLegibility;
        width: 100%;
        position: relative;
        animation-delay: 1s;
        animation-duration: 1s;
        line-height: 1.5;
        font-size: 1em;
      }
      .title-container{
        position: relative;
        align-self: center;
        margin: 10px;
      }
     
      h5 {
        font-weight: 400;
      }
      .discord {
        display: inline-block;
        padding-left: 20px;
      }
      .middle-page{
        display: inline-flex;
      }
      .wrapper{
        display: inline-flex;
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
      .descriptionWrapper{
        margin: .5rem;
        padding: .5rem;
        padding-left: 16px;
        padding-right: 16px;
        border-radius: 6px;
        border-color: #4a4a4a;
        box-shadow: 0px 0px 0px 1px #dbdbdb;
        background-color: #ffffff;
      }
      .
      `,
    ];
  }
  // LitElement rendering template of your element
  render() {
    return html`
      <div class="listing-container"> 
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
              video="${item.metadata.source}"
              startTime="${item.metadata.startTime}"
            >
            </tv-channel>
          `
        )
      }
     

       </div>
      ${this.temporaryItem.name}
        <!-- video -->
        
          <div class="wrapper">
         
       <!-- video -->
        <!--iframe id="video-player" style="margin: 30px;"
          width="750"
          height="400"
          src="https://www.youtube.com/embed/9MT-BNuUCpM" 
          frameborder="0"
          allowfullscreen
        ></iframe-->
         <!-- video 
          <video-player id="video-player" source="https://www.youtube.com/embed/9MT-BNuUCpM" accent-color="orange" dark track="https://haxtheweb.org/files/HAXshort.vtt"
        style="width= 750px; height= 400px;">
        </video-player>
        -->
      <figure id="player-figure" class="image is-16by9">
      <iframe width="600" height="400" src="https://www.youtube.com/embed/VBmMU_iwe6U?si=0mxCB2K1KRy12ajt&amp;start=7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> </figure>
       

      
 <!-- discord / chat - optional -->
 <div class="discord">
          <widgetbot 
          server="954008116800938044" 
          channel="1106691466274803723" 
          width="100%" 
          height="100%" 
          style="display: inline-block; 
          overflow: hidden; 
          background-color: rgb(54, 57, 62); 
          border-radius: 7px; 
          vertical-align: top; 
          width: 150%; 
          height: 100%; ">
          <iframe title="WidgetBot Discord chat embed" 
          allow="clipboard-write; fullscreen" 
          src="https://e.widgetbot.io/channels/954008116800938044/1106691466274803723?api=a45a80a7-e7cf-4a79-8414-49ca31324752" 
          style="border: none; width: 100%; height: 100%;">
        </iframe>
      </widgetbot>
            <script src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed"></script>
      </div>
    </div>
   
      <!-- dialog -->
      <sl-dialog label="${String(this.temporaryItem.description)}" class="dialog">
      ${this.temporaryItem.description}
        <sl-button slot="footer" variant="primary" @click="${this.watchButtonClick}">Watch</sl-button>
      </sl-dialog>
    `;
  }

  watchButtonClick() {
    const dialog = this.shadowRoot.querySelector('.dialog');
    dialog.hide();
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').play();
  }

  changeVideo() {
    const videoPlayer = this.shadowRoot.querySelector('video-player');
    videoPlayer.source = this.createSource();
    }

    extractVideoId(link) {
      try {
        const url = new URL(link);
        const searchParams = new URLSearchParams(url.search);
        return searchParams.get("v");
      } catch (error) {
        console.error("Invalid URL:", link);
        return null;
      }
    }

    createSource() {
      return "https://www.youtube.com/embed/" + this.extractVideoId(this.temporaryItem.video);
    }
  
  closeDialog(e) {
    const dialog = this.shadowRoot.querySelector('.dialog');
    dialog.hide();
  }
  itemClick(e) {
    console.log(e.target);
    this.temporaryItem = {
      description: e.target.description,
      title: e.target.title,
      id: e.target.id,
      video: e.target.video, 
      startTime: e.target.startTime,
      timecode: e.target.timecode
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