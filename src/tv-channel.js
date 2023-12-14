// import stuff
import { LitElement, html, css } from 'lit';

export class TvChannel extends LitElement {
  // defaults
  constructor() {
    super();
    this.timecode = '';
    this.title = '';
    this.presenter = '';
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return 'tv-channel';
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      title: { type: String },
      description: {type: String},
      presenter: { type: String },
      video: {type: String},
      timecode: {type: String},
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return css`
      :host {
        display: inline-flex;
        cursor: pointer;
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
      


.container {
  display: flex;
  line-height: 4px;
  min-width: 232px;
  margin-right: 4px;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px solid #2c2c2c;
  border-radius: 8px;
}

.tags {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

#tag {
  background-color: #363636;
  color: #fff;
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  font-size: 0.75rem;
  height: 2em;
  justify-content: center;
  line-height: 1.5;
  padding-left: 4px;
  padding-right: 4px;
  white-space: nowrap;
}

.title {
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 0.8888em;
  color: #363636;
  -webkit-line-clamp: 1;
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  position: relative;
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description {
  font-size: 12px;
}

::slotted(p) {
  line-height: 32px;
}
      .wrapper {
        padding: 16px;
        background-color: #eeeeee;
      }
    `;
  }
  // LitElement rendering template of your element
  render() {
    return html`
      <div class="wrapper">
      <h6>${this.timecode}</h6>
        <h3>${this.title}</h3>
        <h4>${this.presenter}</h4>

        <slot></slot>
      </div>  
      `;
  }
}
// tell the browser about our tag and class it should run when it sees it
customElements.define(TvChannel.tag, TvChannel);
