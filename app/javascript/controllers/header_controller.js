import { Controller } from "@hotwired/stimulus"
import { leave, toggle } from "el-transition"

export default class extends Controller {
  static targets = ['mainButton', 'profileButton', 'profileMenu']

  connect() {
    this.profileButtonTarget.addEventListener('click', this.toggleDropdownProfile)
    // this.mainButtonTarget.addEventListener('click', this.toggleDropdownMainMenu)
  }

  toggleDropdownProfile() {
    toggle(document.getElementById('profile-dropdown-items'));
  }

  // toggleDropdownMainMenu() {
  //   toggle(document.getElementById('mobile-menu'));
  // }

  hide(event) {
    const buttonClicked = this.profileButtonTarget.contains(event.target)

    if(!buttonClicked) {
      leave(this.profileMenuTarget);
    }
  }
}