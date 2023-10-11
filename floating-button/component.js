class FloatingButton extends HTMLElement {
  // 一个特殊的静态方法，定义了需要观察的属性数组，这个静态方法不需要显式的去调用
//   static get observedAttributes() {
//     return ["title", "tip-code"];
//   }
  constructor() {
    super();
  }

  // 生命周期函数 dom 首次挂载
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.getElementById("floating-template");
    const instance = template.content.cloneNode(true);
    // 写入传入的参数
    instance.querySelector('img').setAttribute('src', this.getAttribute('tip-code'));
    instance.querySelector('#floating-card h2').innerText = this.getAttribute('title');
    shadowRoot.appendChild(instance);

    // 悬浮 button 中的交互逻辑
    const floatingButton = shadowRoot.getElementById("floating-button");
    const floatingCard = shadowRoot.getElementById("floating-card");
    const floatingInfo = shadowRoot.getElementById("floating-icon-info");
    const floatingClose = shadowRoot.getElementById("floating-icon-close");

    floatingButton.addEventListener("click", toggleCard);
    function toggleCard() {
      floatingCard.classList.toggle("opened");
      setTimeout(() => {
        if (floatingCard.classList.contains("opened")) {
          floatingInfo.classList.add("hidden");
          floatingClose.classList.remove("hidden");
        } else {
          floatingClose.classList.add("hidden");
          floatingInfo.classList.remove("hidden");
        }
      });
    }
  }
}
// 注册自定义元素
customElements.define("floating-button", FloatingButton);
