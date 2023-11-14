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
      `
    ];
  }
  // LitElement rendering template of your element
  render() {
    return html`
      <h2>${this.name}</h2>
      ${
        this.listings.map(
          (item) => html`
            <tv-channel
              id="${item.id}"
              title="${item.title}"
              presenter="${item.metadata.author}"
              description="${item.description}"
              video="https://www.youtube.com/watch?v=eC7xzavzEKY"
              @click="${this.itemClick}"
            >
            </tv-channel>
          `
        )
      }
       <div>
      ${this.activeItem.name}
      ${this.activeItem.description}
        <!-- video -->
        <iframe
    width="700"
    height="200"
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
    frameborder="0"
    allowfullscreen
  ></iframe></iframe>

        <!-- discord / chat - optional -->
      </div>
      <!-- dialog -->
      <sl-dialog label="Dialog" class="dialog">
        ${this.activeItem.title}activetitle
        ${this.activeItem.description}
        <sl-button slot="footer" variant="primary" @click="${this.watchDialog}">Watch</sl-button>
      </sl-dialog>

  
    `;
  }

  changeVideo() {
    // Update the iframe source URL when an item is clicked
    const iframe = this.shadowRoot.querySelector('iframe');
    iframe.src = this.activeItem.video;}

  closeDialog(e) {
    const dialog = this.shadowRoot.querySelector('.dialog');
    dialog.hide();
  }

  watchDialog(e){
    const dialog = this.shadowRoot.querySelector('.dialog ');
    dialog.hide();
  }

commandContextChanged(e){
  this.commandContext = e.detail.value;
}


itemClick(e) {
  console.log(e.target);
  this.activeItem = {
    title: e.target.title,
    id: e.target.id,
    description: e.target.description,
    video: e.target.video, // Set the source in the activeItem
  };
  this.changeVideo(); // Call the changeVideo method
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
